import { esc } from '../utils.js';
import { icons } from '../icons.js';

export const PAGES = [
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'works', label: 'Works' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

/** Vertical pill menu on desktop, bottom bar on mobile. */
export function renderSidenav(p) {
  return /* html */ `
  <nav class="sidenav" aria-label="Pages">
    <a href="#about" class="sidenav__logo" aria-label="${esc(p.name.first)} — back to About">${esc(p.initials)}</a>
    <ul class="sidenav__list">
      ${PAGES.map(
        (pg) => `<li><a href="#${pg.id}" class="sidenav__link" data-page-link="${pg.id}">${icons[pg.id]}<span>${pg.label}</span></a></li>`
      ).join('')}
    </ul>
    <button class="sidenav__theme" id="themeToggle" aria-label="Switch theme">${icons.sun}${icons.moon}</button>
  </nav>`;
}
