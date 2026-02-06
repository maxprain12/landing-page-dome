#!/usr/bin/env node
/**
 * Renders docs/linkedin/*.html to PNG (LinkedIn/descarga) y WebP (web).
 * Escribe en docs/linkedin y en public/linkedin-posts para reducir bundle y mejorar TTFB.
 *
 * Usage:
 *   node scripts/render-linkedin-post.mjs
 *     → Renders post-many-building-dome.html (1200x1200)
 *   node scripts/render-linkedin-post.mjs post-collage-academic-researchers
 *     → Renders that single post (collage posts use 1200x1500)
 *   node scripts/render-linkedin-post.mjs collage
 *     → Renders all 4 collage use-case posts (1200x1500 each)
 */
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const linkedinDir = path.join(root, 'docs', 'linkedin');
const publicLinkedinDir = path.join(root, 'public', 'linkedin-posts');

const COLLAGE_POSTS = [
  'post-collage-academic-researchers',
  'post-collage-university-students',
  'post-collage-knowledge-professionals',
  'post-collage-writers-journalists',
];

const DEFAULT_POST = 'post-many-building-dome';
const DEFAULT_VIEWPORT = { width: 1200, height: 1200 };
const COLLAGE_VIEWPORT = { width: 1200, height: 1500 };

function isCollagePost(name) {
  return COLLAGE_POSTS.includes(name);
}

async function renderOne(page, baseName) {
  const htmlPath = path.join(linkedinDir, `${baseName}.html`);
  const viewport = isCollagePost(baseName) ? COLLAGE_VIEWPORT : DEFAULT_VIEWPORT;

  fs.mkdirSync(publicLinkedinDir, { recursive: true });

  const fileUrl = 'file://' + htmlPath.replace(/\\/g, '/');
  await page.setViewport({ ...viewport, deviceScaleFactor: 2 });
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 15000 });
  if (isCollagePost(baseName)) {
    await page.waitForSelector('.zone-img', { timeout: 5000 }).catch(() => {});
    await page.evaluate(() => Promise.all(
      Array.from(document.querySelectorAll('.zone-img'))
        .filter(img => !img.complete)
        .map(img => new Promise(r => { img.onload = r; img.onerror = r; setTimeout(r, 3000); }))
    ));
    await new Promise(r => setTimeout(r, 800));
  }

  const pngDocsPath = path.join(linkedinDir, `${baseName}.png`);
  const pngPublicPath = path.join(publicLinkedinDir, `${baseName}.png`);
  const webpPublicPath = path.join(publicLinkedinDir, `${baseName}.webp`);

  await page.screenshot({ path: pngDocsPath, type: 'png' });
  fs.copyFileSync(pngDocsPath, pngPublicPath);

  await page.screenshot({ path: webpPublicPath, type: 'webp', quality: 85 });

  return { png: pngPublicPath, webp: webpPublicPath };
}

const arg = process.argv[2];
let toRender;

if (!arg || arg === DEFAULT_POST) {
  toRender = [{ baseName: DEFAULT_POST }];
} else if (arg === 'collage' || arg === 'all-collage') {
  toRender = COLLAGE_POSTS.map((baseName) => ({ baseName }));
} else {
  const baseName = arg.replace(/\.html$/, '');
  toRender = [{ baseName }];
}

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

for (const { baseName } of toRender) {
  try {
    const { png, webp } = await renderOne(page, baseName);
    console.log('Saved PNG (LinkedIn):', png);
    console.log('Saved WebP (web):', webp);
  } catch (err) {
    console.error('Failed to render', baseName, err.message);
  }
}

await browser.close();
