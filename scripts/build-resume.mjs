/**
 * Builds public/resume.pdf from src/data/profile.js, so the resume always matches the site.
 * Run: npm run resume   (needs Microsoft Edge or Google Chrome installed; uses its headless "print to PDF")
 */
import { writeFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { profile as p } from '../src/data/profile.js';

const root = resolve(import.meta.dirname, '..');
const out = join(root, 'public', 'resume.pdf');

const esc = (s = '') => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
// The site intro is casual ("Hey there 👋 I'm Aljon, an AI engineer…"); a resume starts at "AI engineer…"
const plain = (s = '') => {
  const t = String(s).replace(/\*/g, '').replace(/^.*?I[’']m [^,]+, an? /u, '');
  return t.charAt(0).toUpperCase() + t.slice(1);
};
const fullName = `${p.name.first} ${p.name.last}`.replace(/\.$/, '');

const entry = (e) => `
  <div class="entry">
    <div class="entry__top"><b>${esc(e.title)}</b><span>${esc(e.years)}</span></div>
    <div class="entry__org">${esc(e.org)}</div>
    <p>${esc(e.text)}</p>
    ${e.highlights?.length ? `<ul>${e.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}
    ${e.tech?.length ? `<div class="tech">${esc(e.tech.join(' · '))}</div>` : ''}
  </div>`;

const html = /* html */ `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>${esc(fullName)} — Resume</title>
<style>
  @page { size: A4; margin: 14mm 15mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font: 10pt/1.45 "Segoe UI", Arial, sans-serif; color: #1b1f1d; }
  h1 { font-size: 24pt; letter-spacing: -0.01em; }
  .role { font-size: 12pt; color: #2e9e44; font-weight: 600; margin-top: 2px; }
  .contact { margin-top: 6px; font-size: 9pt; color: #4b5550; }
  .contact span + span::before { content: "  ·  "; color: #9aa39e; }
  h2 { break-after: avoid; margin: 16px 0 7px; padding-bottom: 3px; border-bottom: 1.5px solid #2e9e44;
       font-size: 10.5pt; letter-spacing: 0.12em; text-transform: uppercase; color: #2e9e44; }
  .summary { color: #2c322f; }
  .stats { display: flex; gap: 22px; margin-top: 8px; }
  .stats b { font-size: 13pt; color: #2e9e44; }
  .stats span { font-size: 8.5pt; color: #4b5550; }
  .entry { margin-bottom: 9px; break-inside: avoid; }
  .entry__top { display: flex; justify-content: space-between; gap: 12px; }
  .entry__top span { font-size: 9pt; color: #4b5550; white-space: nowrap; }
  .entry__org { font-size: 9.5pt; color: #4b5550; font-style: italic; }
  .entry p { margin-top: 2px; }
  .entry ul { margin: 3px 0 0 15px; }
  .entry li { margin-top: 1px; }
  .entry .tech { margin-top: 3px; font-size: 8.5pt; color: #2e9e44; }
  .grid { break-inside: avoid; display: grid; grid-template-columns: 1fr 1fr; gap: 6px 22px; }
  .grid b { display: block; font-size: 9.5pt; }
  .grid span { font-size: 9pt; color: #2c322f; }
  .project { margin-bottom: 7px; break-inside: avoid; }
  .project .url { font-weight: 400; font-size: 9pt; color: #2e9e44; margin-left: 4px; }
  .project .metrics { font-size: 9pt; color: #2e9e44; font-weight: 600; }
</style></head>
<body>
  <h1>${esc(fullName)}</h1>
  <div class="role">${esc(p.title)} · ${esc(p.focus.join(' · '))}</div>
  <div class="contact">
    <span>${esc(p.location)}</span><span>${esc(p.email)}</span>${p.whatsapp ? `<span>WhatsApp ${esc(p.whatsapp.number)}</span>` : ''}
    ${p.socials.map((s) => `<span>${esc(s.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))}</span>`).join('')}
  </div>

  <h2>Summary</h2>
  <p class="summary">${esc(plain(p.about.statement))}</p>
  <div class="stats">${p.about.stats.map((s) => `<div><b>${s.value}${esc(s.suffix || '')}</b> <span>${esc(s.label)}</span></div>`).join('')}</div>

  <h2>Experience</h2>
  ${p.experience.map(entry).join('')}

  <h2>Skills</h2>
  <div class="grid">${p.stack.map((g) => `<div><b>${esc(g.group)}</b><span>${esc(g.items.join(', '))}</span></div>`).join('')}</div>

  <h2>Education</h2>
  ${p.education.map(entry).join('')}
  <h2>Selected Work</h2>
  ${p.projects
    .map(
      (pr) => `<div class="project"><div class="entry__top"><b>${esc(pr.title)}${pr.links?.[0] ? ` <span class="url">${esc(pr.links[0].href.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</span>` : ''}</b><span>${esc(pr.kind)}</span></div>
      ${pr.role ? `<div class="entry__org">${esc(pr.role)}</div>` : ''}
      <p>${esc(pr.description)}</p>
      <div class="metrics">${pr.metrics.map((m) => `${esc(m.value)} ${esc(m.label)}`).join('  ·  ')}</div></div>`
    )
    .join('')}
</body></html>`;

const browsers = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const browser = browsers.find((b) => existsSync(b));
if (!browser) {
  console.error('No Edge or Chrome found. Install one, or add its path to the list in scripts/build-resume.mjs.');
  process.exit(1);
}

const dir = mkdtempSync(join(tmpdir(), 'resume-'));
const htmlPath = join(dir, 'resume.html');
writeFileSync(htmlPath, html);
execFileSync(browser, [
  '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
  `--user-data-dir=${join(dir, 'profile')}`,
  `--print-to-pdf=${out}`,
  pathToFileURL(htmlPath).href,
], { stdio: 'ignore' });
rmSync(dir, { recursive: true, force: true });
console.log(`Wrote ${out}`);
