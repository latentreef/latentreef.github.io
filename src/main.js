/**
 * Entry point: renders the page from src/data/profile.js, then starts every effect.
 * Layout: side menu + tilted profile card + a panel that shows one page at a time.
 */

// Fonts are bundled from npm, so they also work offline
import '@fontsource/rajdhani/500.css';
import '@fontsource/rajdhani/600.css';
import '@fontsource/rajdhani/700.css';
import '@fontsource-variable/geist-mono';

import './styles/index.css';

import { profile } from './data/profile.js';
import { $, esc } from './utils.js';

import { renderSidenav } from './sections/sidenav.js';
import { renderCard } from './sections/card.js';
import { renderAbout, renderResume, renderWorks, renderContact } from './sections/pages.js';
import { renderStack } from './sections/stack.js';

import { runLoader } from './effects/loader.js';
import { initCursor, initClickBurst } from './effects/cursor.js';
import { initSpotlight } from './effects/hover.js';
import { initNetwork, initBgVideo } from './effects/background.js';
import { startRoles, initCrt, initCardTilt } from './effects/card.js';
import { initPages, initFilters, initContactForm } from './effects/pages.js';
import { initClocks, initTheme, initCopyEmail, initEasterEgg } from './effects/ui.js';

/* ---------- 1. Render ---------- */
document.title = profile.seo.title;
$('meta[name="description"]').setAttribute('content', profile.seo.description);

const v = profile.bgVideo;
const video = v?.src
  ? `<video class="bg__video" id="bgVideo" muted loop playsinline preload="auto" tabindex="-1" ${v.poster ? `poster="${esc(v.poster)}"` : ''}
      style="--video-o-light:${Number(v.opacity?.light ?? 0.12)};--video-o-dark:${Number(v.opacity?.dark ?? 0.22)}">
      <source src="${esc(v.src)}" type="video/${/\.webm$/i.test(v.src) ? 'webm' : 'mp4'}" />
    </video>`
  : '';
const fullName = `${profile.name.first} ${profile.name.last}`.replace(/\.$/, '');

$('#app').innerHTML = /* html */ `
  <div class="bg" aria-hidden="true">${video}<div class="bg__shade"></div><canvas class="bg__canvas" id="network"></canvas></div>
  <div class="layout">
    <div class="profile">
      ${renderSidenav(profile)}
      ${renderCard(profile)}
    </div>
    <main class="panel" id="panel">
      <div class="panel__scroll" id="panelScroll">
        ${renderAbout(profile)}
        ${renderResume(profile)}
        ${renderWorks(profile)}
        ${renderStack(profile)}
        ${renderContact(profile)}
      </div>
    </main>
  </div>
  <footer class="footer">© ${new Date().getFullYear()} ${esc(fullName)} · <span>${esc(profile.title)}</span></footer>`;

/* ---------- 2. Effects ---------- */
initPages('about');
initFilters();
initContactForm(profile.email);
initCursor();
initClickBurst();
initSpotlight();
initBgVideo();
initNetwork();
initCrt();
initCardTilt();
initClocks();
initTheme();
initCopyEmail();
initEasterEgg(profile.secretWord);

/* ---------- 3. Intro ---------- */
runLoader(() => startRoles(profile.roles));
