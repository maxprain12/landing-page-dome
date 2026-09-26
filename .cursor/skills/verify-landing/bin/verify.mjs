#!/usr/bin/env node
/**
 * Landing preview on 127.0.0.1:4325.
 * Does not touch port 4321 (dev) or 4322 (the repo's Playwright config).
 */
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, openSync, readFileSync, rmSync, writeFileSync, appendFileSync } from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const evidenceRoot = path.join(repoRoot, '.verify-evidence');
const runPath = path.join(evidenceRoot, 'run.json');
const logPath = path.join(evidenceRoot, 'scratch', 'preview.log');
const port = 4325;
const baseUrl = `http://127.0.0.1:${port}`;

function die(message, code = 1) {
  console.error(message);
  process.exit(code);
}

function parseArgs(argv) {
  const cmd = argv[2];
  const opts = {};
  for (let i = 3; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) die(`Unexpected argument: ${arg}`);
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) opts[key] = 'true';
    else {
      opts[key] = next;
      i += 1;
    }
  }
  return { cmd, opts };
}

function parseName(raw) {
  if (!raw) return undefined;
  const match = /^\/(.+)\/([a-z]*)$/.exec(raw);
  if (match) return new RegExp(match[1], match[2]);
  return raw;
}

function readRun() {
  if (!existsSync(runPath)) die('No verification preview. Run launch first.');
  return JSON.parse(readFileSync(runPath, 'utf8'));
}

function pidAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function listenerPids() {
  const result = spawnSync('lsof', ['-nP', `-iTCP:${port}`, '-sTCP:LISTEN', '-t'], { encoding: 'utf8' });
  if (result.status !== 0) return [];
  return result.stdout.split('\n').map((line) => Number(line.trim())).filter((pid) => pid > 0);
}

function pgid(pid) {
  const result = spawnSync('ps', ['-o', 'pgid=', '-p', String(pid)], { encoding: 'utf8' });
  if (result.status !== 0) return null;
  const value = Number(result.stdout.trim());
  return Number.isFinite(value) ? value : null;
}

function portFree() {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.listen(port, '127.0.0.1', () => server.close(() => resolve(true)));
  });
}

function killGroup(pid) {
  try {
    process.kill(-pid, 'SIGTERM');
  } catch {
    try {
      process.kill(pid, 'SIGTERM');
    } catch {
      /* already gone */
    }
  }
}

async function waitForHome(timeoutMs) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(`${baseUrl}/`);
      const html = await response.text();
      if (response.ok && html.includes('lang="es"') && html.includes('<h1')) return html;
    } catch {
      /* preview still booting */
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return null;
}

function ensureBuild() {
  if (existsSync(path.join(repoRoot, 'dist', 'index.html'))) return;
  console.log('dist/index.html missing, running pnpm run build');
  const build = spawnSync('pnpm', ['run', 'build'], { cwd: repoRoot, stdio: 'inherit' });
  if (build.status !== 0) die('pnpm run build failed');
  if (!existsSync(path.join(repoRoot, 'dist', 'index.html'))) die('Build finished without dist/index.html');
}

async function launch() {
  if (!(await portFree())) {
    die(`Port ${port} is already in use. Refusing to start another preview.`);
  }
  if (existsSync(runPath)) {
    const existing = JSON.parse(readFileSync(runPath, 'utf8'));
    if (pidAlive(existing.pid)) die(`Preview already running (pid ${existing.pid}). Run cleanup first.`);
  }
  ensureBuild();
  mkdirSync(path.dirname(logPath), { recursive: true });
  writeFileSync(logPath, '');
  const logFd = openSync(logPath, 'a');
  const child = spawn('pnpm', ['exec', 'astro', 'preview', '--host', '127.0.0.1', '--port', String(port)], {
    cwd: repoRoot,
    detached: true,
    stdio: ['ignore', logFd, logFd],
  });
  child.unref();
  const run = { pid: child.pid, port, startedAt: new Date().toISOString() };
  writeFileSync(runPath, JSON.stringify(run, null, 2));
  const html = await waitForHome(120_000);
  if (!html) {
    killGroup(run.pid);
    rmSync(runPath, { force: true });
    const tail = readFileSync(logPath, 'utf8').slice(-2000);
    die(`Preview did not serve ${baseUrl}/ .\n${tail}`);
  }
  console.log(`verify-landing ready pid=${run.pid} url=${baseUrl}`);
}

function assertOwned(run) {
  const listeners = listenerPids();
  if (listeners.length === 0) die(`Nothing is listening on ${port}.`);
  const owns = listeners.some((pid) => pid === run.pid || pgid(pid) === run.pid);
  if (!owns) die(`Port ${port} is not owned by pid ${run.pid} (listeners ${listeners.join(',')}). Refusing to drive it.`);
  return listeners;
}

async function doctor() {
  const run = readRun();
  if (run.port !== port) die(`run.json port is ${run.port}, expected ${port}.`);
  assertOwned(run);
  const response = await fetch(`${baseUrl}/`);
  const html = await response.text();
  const h1Count = html.match(/<h1\b/g)?.length ?? 0;
  if (!response.ok || !html.includes('lang="es"') || h1Count !== 1) {
    die(`Home is not the Spanish landing (status ${response.status}, h1 ${h1Count}).`);
  }
  console.log(`ok pid=${run.pid} url=${baseUrl} lang=es h1=1`);
}

async function withPage(urlPath, fn) {
  readRun();
  await doctor();
  const { chromium } = await import('@playwright/test');
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch {
    browser = await chromium.launch({ headless: true });
  }
  try {
    const page = await browser.newPage();
    const url = new URL(urlPath || '/', baseUrl);
    if (url.origin !== new URL(baseUrl).origin) die(`Refusing to open ${url.href}`);
    await page.goto(url.href, { waitUntil: 'domcontentloaded' });
    await fn(page, url.href);
  } finally {
    await browser.close();
  }
}

function locatorFor(page, opts) {
  if (opts.selector) return page.locator(opts.selector);
  if (!opts.role) die('Pass --selector or --role');
  return page.getByRole(opts.role, { name: parseName(opts.name) });
}

async function see(opts) {
  await withPage(opts.path || '/', async (page, href) => {
    const locator = locatorFor(page, opts);
    const count = await locator.count();
    if (opts.count && count !== Number(opts.count)) die(`${href} count ${count} != ${opts.count}`);
    if (opts['min-count'] && count < Number(opts['min-count'])) die(`${href} count ${count} < ${opts['min-count']}`);
    if (!opts.count && !opts['min-count'] && count < 1) die(`${href} matched nothing`);
    await locator.first().waitFor({ state: 'visible', timeout: 15_000 });
    const label = await locator.first().evaluate((element) => {
      const named = element.getAttribute('aria-label');
      const text = (element.textContent || '').replace(/\s+/g, ' ').trim();
      return named || text || element.tagName;
    });
    const line = `visible ${href} label=${label.slice(0, 180)} count=${count}`;
    console.log(line);
    if (opts.out) {
      const out = path.resolve(repoRoot, opts.out);
      mkdirSync(path.dirname(out), { recursive: true });
      appendFileSync(out, `${line}\n`);
    }
  });
}

async function attr(opts) {
  if (!opts.selector || !opts.attr) die('attr requires --selector and --attr');
  await withPage(opts.path || '/', async (page, href) => {
    const value = await page.locator(opts.selector).first().getAttribute(opts.attr);
    if (value == null) die(`${href} ${opts.selector} has no ${opts.attr}`);
    if (opts.equals && value !== opts.equals) die(`${opts.attr}=${value} != ${opts.equals}`);
    if (opts.contains && !value.includes(opts.contains)) die(`${opts.attr}=${value} does not contain ${opts.contains}`);
    if (opts.matches && !new RegExp(opts.matches).test(value)) die(`${opts.attr}=${value} does not match ${opts.matches}`);
    const line = `attr ${href} ${opts.selector} ${opts.attr}=${value}`;
    console.log(line);
    if (opts.out) {
      const out = path.resolve(repoRoot, opts.out);
      mkdirSync(path.dirname(out), { recursive: true });
      appendFileSync(out, `${line}\n`);
    }
  });
}

async function shot(opts) {
  if (!opts.out) die('shot requires --out');
  await withPage(opts.path || '/', async (page) => {
    const out = path.resolve(repoRoot, opts.out);
    mkdirSync(path.dirname(out), { recursive: true });
    await page.screenshot({ path: out, fullPage: false });
    console.log(`screenshot ${out}`);
  });
}

async function cleanup() {
  if (!existsSync(runPath)) {
    console.log('no run.json');
    return;
  }
  const run = JSON.parse(readFileSync(runPath, 'utf8'));
  const listeners = listenerPids();
  const owns = listeners.some((pid) => pid === run.pid || pgid(pid) === run.pid);
  if (listeners.length > 0 && !owns) {
    die(`Port ${port} is not owned by pid ${run.pid}. Refusing to kill it.`);
  }
  if (pidAlive(run.pid)) killGroup(run.pid);
  const started = Date.now();
  while (listenerPids().length > 0 && Date.now() - started < 8000) {
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  rmSync(runPath, { force: true });
  rmSync(path.join(evidenceRoot, 'scratch'), { recursive: true, force: true });
  console.log('cleanup done');
}

const { cmd, opts } = parseArgs(process.argv);
mkdirSync(evidenceRoot, { recursive: true });

if (cmd === 'launch') await launch();
else if (cmd === 'doctor') await doctor();
else if (cmd === 'see') await see(opts);
else if (cmd === 'attr') await attr(opts);
else if (cmd === 'shot') await shot(opts);
else if (cmd === 'cleanup') await cleanup();
else die('Usage: verify.mjs launch|doctor|see|attr|shot|cleanup');
