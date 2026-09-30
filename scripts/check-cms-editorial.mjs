/** Opt-in integration check: real branch reads, isolated SQLite/vault writes, no publication. */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const desktop = path.resolve(process.argv[2] || path.join(root, '../dome'));
const branch = process.argv[3];
if (!branch || branch === 'main' || branch === 'master') throw new Error('Provide a non-production test branch');
const require = createRequire(import.meta.url);
const { createPluginService } = require(path.join(desktop, 'electron/plugins/plugin-service.cjs'));
const github = require(path.join(desktop, 'electron/github/github-api.cjs'));
const vault = require(path.join(desktop, 'electron/storage/vault-store.cjs'));
const plugin = JSON.parse(fs.readFileSync(path.join(desktop, 'assets/plugins/dome-cms/manifest.json'), 'utf8'));
Object.assign(plugin, { enabled: true, manifestDigest: 'editorial-check' });
const repo = 'maxprain12/landing-page-dome';
const api = (endpoint) => JSON.parse(execFileSync('gh', ['api', `repos/${repo}/${endpoint}`], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }));
const before = api(`git/ref/heads/${branch}`).object.sha;
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'dome-cms-editorial-'));
const db = new DatabaseSync(':memory:');
db.exec(`CREATE TABLE resources (
  id TEXT PRIMARY KEY, project_id TEXT, type TEXT, title TEXT, content TEXT,
  file_path TEXT, folder_id TEXT, metadata TEXT, created_at INTEGER, updated_at INTEGER, vault_path TEXT
)`);
const config = { github: { repo, branch, siteUrl: 'https://dome.dowi.es', sitePathPattern: '/{language}/{collection}/{slug}', contentPaths: {
  'manual/es': 'src/content/manual/es', 'manual/en': 'src/content/manual/en',
  'blog/es': 'src/content/blog/es', 'blog/en': 'src/content/blog/en',
} } };
const publications = [];
const queries = {
  getPluginGrant: { get: () => ({ plugin_id: plugin.id, manifest_digest: plugin.manifestDigest, project_id: 'test-vault', permissions_json: JSON.stringify(plugin.permissions), config_json: JSON.stringify(config) }) },
  getResourceById: db.prepare('SELECT * FROM resources WHERE id = ?'),
  listPluginNotes: { all: (id) => db.prepare("SELECT * FROM resources WHERE project_id = ? AND type = 'note'").all(id) },
  createResource: db.prepare('INSERT INTO resources (id,project_id,type,title,content,file_path,folder_id,metadata,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)'),
  deleteResource: db.prepare('DELETE FROM resources WHERE id = ?'),
  updatePluginNoteIfCurrent: db.prepare('UPDATE resources SET title = ?, content = ?, metadata = ?, updated_at = ? WHERE id = ? AND project_id = ? AND updated_at = ?'),
  createPluginPublication: { run: (...args) => { publications.push(args); } },
};
const database = { getQueries: () => queries, getDB: () => ({ prepare: (sql) => db.prepare(sql), transaction: (fn) => () => {
  db.exec('BEGIN');
  try { const result = fn(); db.exec('COMMIT'); return result; }
  catch (error) { db.exec('ROLLBACK'); throw error; }
} }) };
// GitHub transport reads the actual test branch. Every remote write fails closed.
github.getReference = async () => api(`git/ref/heads/${branch}`);
github.getCommit = async (_owner, _repo, sha) => api(`git/commits/${sha}`);
github.getRepositoryTree = async (_owner, _repo, sha) => {
  const tree = api(`git/trees/${sha}?recursive=1`);
  // This check targets editorial Markdown; image ingestion has separate Desktop tests.
  return { ...tree, tree: tree.tree.filter((entry) => entry.path.startsWith('src/content/')) };
};
github.getRepositoryFile = async (_owner, _repo, file) => Buffer.from(api(`contents/${file}?ref=${encodeURIComponent(branch)}`).content, 'base64').toString('utf8');
for (const method of ['createBlob', 'createTree', 'createCommit', 'updateReference', 'deleteRepositoryFile']) github[method] = async () => { throw new Error('Remote writes forbidden in editorial check'); };
vault.ensureFolderChain = () => null;
vault.writeNoteMarkdown = ({ id, markdown }) => { fs.writeFileSync(path.join(temp, `${id}.md`), markdown); return { success: true }; };
const service = createPluginService({ database, fileStorage: {}, windowManager: { broadcast() {} }, pluginLoader: { listPlugins: () => [plugin] } });
try {
  const synced = await service.request(plugin.id, 'notes.sync', {});
  assert.equal(synced.imported, 28);
  assert.equal(synced.skipped, 0);
  const cms = synced.notes.find((note) => note.fields?.slug === 'cms' && note.fields?.language === 'es');
  assert.ok(cms, 'Spanish CMS guide imported');
  const edited = await service.request(plugin.id, 'notes.update', { id: cms.id, expectedUpdatedAt: cms.updatedAt, body: `${cms.body}\n\nPrueba editorial sin publicación.\n` });
  assert.match(edited.body, /Prueba editorial/);
  const prepared = await service.request(plugin.id, 'publication.prepare', { resourceId: cms.id });
  assert.equal(prepared.status, 'prepared');
  assert.equal(prepared.branch, branch);
  assert.equal(prepared.path, 'src/content/manual/es/cms.md');
  assert.equal(publications.length, 1);
  assert.equal(api(`git/ref/heads/${branch}`).object.sha, before, 'Remote branch unchanged');
  console.log(`CMS editorial check passed: ${synced.imported} manuals synchronized; edit saved; publication prepared on ${branch}; no remote writes.`);
} finally {
  db.close();
  fs.rmSync(temp, { recursive: true, force: true });
}
