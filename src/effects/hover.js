import { finePointer } from '../utils.js';

/** .spot elements get --mx/--my (mouse position) for the glow + border spotlight. */
export function initSpotlight() {
  if (!finePointer) return;
  document.querySelectorAll('.spot').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}
