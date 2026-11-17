// Small shared helpers used by sections and effects.

export const $ = (s, c = document) => c.querySelector(s);
export const $$ = (s, c = document) => [...c.querySelectorAll(s)];
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

// Colors of the click burst particles
export const BURST_COLORS = ['#4ade80', '#22c55e', '#bbf7d0', '#ffffff'];

/** Escape text for safe insertion into HTML. */
export const esc = (str = '') =>
  String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Escape, then turn *word* into an accent-colored highlight. */
export const rich = (str = '') => esc(str).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');

export const flagSvg = () =>
  '<svg class="flag" viewBox="0 0 30 15" role="img" aria-label="Philippine flag"><rect width="30" height="7.5" fill="#0038a8"/><rect y="7.5" width="30" height="7.5" fill="#ce1126"/><polygon points="0,0 13,7.5 0,15" fill="#fff"/><circle cx="4.3" cy="7.5" r="1.7" fill="#fcd116"/></svg>';
