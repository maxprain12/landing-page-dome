import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { randomUUID, createHash } from 'node:crypto';

// Start a dedicated renderer first: DOME_VITE_PORT=14573 pnpm run dev (in Dome).
const desktop = path.resolve(process.argv[2] ?? '../dome');
const renderer = new URL(process.env.DOME_MEDIA_RENDERER_URL ?? 'http://localhost:14573');
if (!['localhost', '127.0.0.1'].includes(renderer.hostname) || renderer.port === '5173') throw new Error('Use a dedicated local renderer port.');
if (!(await fetch(renderer)).ok) throw new Error('Start the dedicated Dome renderer before capturing.');
const require = createRequire(path.join(desktop, 'package.json'));
const { _electron: electron } = require('@playwright/test');
const output = path.resolve('public/product-captures');
fs.mkdirSync(output, { recursive: true });
const run = randomUUID();
const profiles = [];
const captures = [];
async function settle(win) {
  await win.waitForFunction(() => ![...document.querySelectorAll('div')].some(element => {
    const blur = /blur\(([\d.]+)px\)/.exec(getComputedStyle(element).filter);
    return blur && Number(blur[1]) > 0.1;
  }));
}
async function capture(win, locator, name) {
  await settle(win);
  await locator.screenshot({ path: path.join(output, `${name}.png`), animations: 'disabled' });
  captures.push(name);
}
for (const scenario of ['cms', 'settings']) {
  const profile = `web-media-${scenario}-${run}`;
  profiles.push(profile);
  const app = await electron.launch({ cwd: desktop, args: ['.'], env: { ...process.env,
    NODE_ENV: 'development', DOME_PROFILE: profile, DOME_VITE_PORT: renderer.port,
    DOME_IPC_BRIDGE_PORT: '0', DOME_DISABLE_ANALYTICS: '1', SKIP_DEVTOOLS: '1' } });
  try {
    const win = await app.firstWindow();
    // WindowManager currently defaults to 5173; explicitly select our renderer.
    await win.goto(renderer.href);
    await win.waitForFunction(() => !!window.electron?.db?.settings);
    await win.evaluate(async () => {
      await window.electron.db.settings.set('onboarding_completed', 'true');
      localStorage.setItem('dome:language', 'es');
    });
    await win.reload();
    await app.evaluate(({ BrowserWindow }, origin) => BrowserWindow.getAllWindows().find(w => w.webContents.getURL().startsWith(origin))?.setSize(1600, 1050), renderer.origin);
    if (scenario === 'cms') {
      await win.evaluate(async () => {
        const now = Date.now(), projectId = 'web-cms-demo';
        const results = [];
        results.push(await window.electron.invoke('db:projects:create', { id: projectId, name: 'Dome · Web editorial', description: 'Bóveda de demostración', created_at: now, updated_at: now }));
        results.push(await window.electron.plugins.installBundled('dome-cms'));
        results.push(await window.electron.plugins.configure('dome-cms', { projectId, permissions: ['notes.read', 'notes.write', 'content.publish'], sites: [{ id: 'dome-web', name: 'Dome Web', projectId, github: { repo: 'maxprain12/landing-page-dome', branch: 'feat/complement-detail-media', siteUrl: 'https://dome.dowi.es', contentPaths: { 'manual/es': 'src/content/manual/es', 'manual/en': 'src/content/manual/en', 'blog/es': 'src/content/blog/es', 'blog/en': 'src/content/blog/en' }, sitePathPattern: '/{collection}/{slug}' } }] }));
        for (const entry of [
          { title: 'Primeros pasos con Dome', slug: 'getting-started', language: 'es', body: '## Tu biblioteca, en marcha\n\nImporta tus fuentes, organiza el proyecto y abre Many con el contexto del documento.\n\n### Un flujo de trabajo\n\n1. Crea un proyecto.\n2. Añade documentos y notas.\n3. Revisa el resultado antes de publicar.' },
          { title: 'Getting started with Dome', slug: 'getting-started', language: 'en', body: '## Your library, ready to work\n\nImport your sources, organize the project and open Many with document context.' },
          { title: 'Publicar con Dome CMS', slug: 'cms', language: 'es', body: '## Del borrador a tu web\n\nEscribe en Markdown, revisa los idiomas y prepara la publicación en GitHub.\n\nEl contenido permanece en tu bóveda hasta que apruebas publicar.' },
        ]) results.push(await window.electron.plugins.request('dome-cms', 'notes.create', { title: entry.title, body: entry.body, siteId: 'dome-web', fields: { collection: 'manual', language: entry.language, date: '2026-10-01', description: 'Contenido editorial de demostración para la web de Dome', slug: entry.slug, tags: ['Dome', 'Guías'] } }));
        if (results.some(result => result?.success === false)) throw new Error('CMS demonstration setup failed');
        const { useTabStore } = await import('/app/lib/store/useTabStore.ts');
        useTabStore.getState().openPluginTab('dome-cms', 'Dome CMS');
      });
      await win.getByText('Primeros pasos con Dome', { exact: true }).first().waitFor();
      const panel = win.getByRole('heading', { name: 'Content', exact: true }).locator('xpath=ancestor::div[contains(@class,"bg-background")][1]');
      await capture(win, panel, 'cms-library-component');
      await win.getByText('Primeros pasos con Dome', { exact: true }).first().click();
      await win.getByText('Tu biblioteca, en marcha', { exact: false }).first().waitFor();
      await capture(win, panel, 'cms-editor-component');
      await win.getByText('Propiedades de publicación', { exact: true }).click();
      await win.getByText('Collection *', { exact: true }).waitFor();
      await capture(win, panel, 'cms-fields-component');
    } else {
      for (const [section, heading, file] of [
        ['browser_extension', 'Extensión del navegador', 'extension-settings-component'],
        ['remote_many', 'Acceso remoto a Many', 'companion-settings-component'],
      ]) {
        await win.evaluate(async section => {
          const { useTabStore } = await import('/app/lib/store/useTabStore.ts');
          const { useSettingsUiStore } = await import('/app/lib/store/useSettingsUiStore.ts');
          useTabStore.getState().openSettingsTab();
          useSettingsUiStore.getState().setActiveSection(section);
        }, section);
        const title = win.getByRole('heading', { name: heading, exact: true });
        await title.waitFor();
        await capture(win, title.locator('xpath=ancestor::section[1]'), file);
      }
    }
  } finally { await app.close(); }
}
fs.writeFileSync(path.join(output, 'capture-provenance.json'), JSON.stringify({
  capturedAt: new Date().toISOString(), desktopCommit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: desktop, encoding: 'utf8' }).trim(),
  renderer: renderer.href, profiles, remoteWrites: false,
  captures: captures.map(name => ({ file: `${name}.png`, sha256: createHash('sha256').update(fs.readFileSync(path.join(output, `${name}.png`))).digest('hex') })),
}, null, 2) + '\n');
console.log(`Captured ${captures.length} real Dome components in isolated profiles.`);
