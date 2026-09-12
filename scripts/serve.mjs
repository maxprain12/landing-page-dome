#!/usr/bin/env node
/**
 * Static host for Coolify. Same as `serve dist`, plus POST 200 on Instagram
 * Meta callbacks so App Review deauthorize / data-deletion pings succeed
 * while the marketing UI is being redesigned.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const HOST = '0.0.0.0';
const PORT = Number.parseInt(process.env.PORT || '3000', 10);

const POST_OK = new Set([
  '/oauth/instagram/deauthorize',
  '/oauth/instagram/data-deletion',
]);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json; charset=utf-8',
};

function normalizePathname(raw) {
  const url = new URL(raw || '/', 'http://127.0.0.1');
  const trimmed = url.pathname.replace(/\/+$/, '') || '/';
  return trimmed;
}

function resolveFile(pathname) {
  const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
  const candidate = path.resolve(ROOT, relative);
  if (!candidate.startsWith(ROOT + path.sep) && candidate !== ROOT) return null;
  try {
    const stat = fs.statSync(candidate);
    if (stat.isDirectory()) {
      const index = path.join(candidate, 'index.html');
      return fs.existsSync(index) ? index : null;
    }
    return candidate;
  } catch {
    const asDir = path.resolve(ROOT, relative, 'index.html');
    if (asDir.startsWith(ROOT + path.sep) && fs.existsSync(asDir)) return asDir;
    return null;
  }
}

const server = http.createServer((req, res) => {
  const pathname = normalizePathname(req.url);
  if (req.method === 'POST' && POST_OK.has(pathname)) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('ok');
    return;
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD, POST' });
    res.end();
    return;
  }
  const file = resolveFile(pathname);
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }
  const body = fs.readFileSync(file);
  const type = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'public, max-age=300' });
  res.end(req.method === 'HEAD' ? undefined : body);
});

server.listen(PORT, HOST, () => {
  process.stdout.write(`landing-page-dome listening on ${HOST}:${PORT}\n`);
});
