import { $, clamp, easeOutExpo, reduced } from '../utils.js';

/** Counts 0→100 (waiting for window load), then calls onDone. */
export function runLoader(onDone) {
  const countEl = $('#loaderCount');
  const duration = reduced ? 250 : 1700;
  const start = performance.now();
  let pageReady = document.readyState === 'complete';
  window.addEventListener('load', () => (pageReady = true));
  setTimeout(() => (pageReady = true), 4000); // safety net

  const tick = (now) => {
    let p = clamp((now - start) / duration, 0, 1);
    if (!pageReady) p = Math.min(p, 0.92);
    countEl.textContent = Math.round(easeOutExpo(p) * 100);
    if (p < 1) requestAnimationFrame(tick);
    else setTimeout(finish, reduced ? 0 : 250);
  };

  const finish = () => {
    document.body.classList.remove('is-loading');
    document.body.classList.add('loaded');
    onDone?.();
  };

  requestAnimationFrame(tick);
}
