import { $, $$, reduced } from '../utils.js';
import { starBurst } from './cursor.js';

/* ---------- Toast ---------- */
let toastTimer;
export function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-on'), 2200);
}

/* ---------- Manila clocks + time-of-day greeting ---------- */
export function initClocks() {
  const fmt = (tz, opts = {}) =>
    new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: tz, ...opts });
  const mnlFmt = fmt('Asia/Manila');
  const hourFmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hourCycle: 'h23', timeZone: 'Asia/Manila' });
  const zones = $$('[data-tz]').map((el) => ({ el, f: fmt(el.dataset.tz) }));
  const clocks = $$('[data-clock]');
  const greetings = $$('[data-greeting]');

  const tick = () => {
    const now = new Date();
    const t = mnlFmt.format(now);
    clocks.forEach((el) => (el.textContent = t));
    zones.forEach(({ el, f }) => (el.textContent = f.format(now)));

    const h = Number(hourFmt.format(now));
    const g =
      h >= 5 && h < 12 ? 'Good morning! ☀️'
      : h >= 12 && h < 18 ? 'Good afternoon! 🌤️'
      : 'Good evening! 🌙';
    greetings.forEach((el) => (el.textContent = g));
  };
  tick();
  setInterval(tick, 1000);
}

/* ---------- Theme: light / dark, follows the OS until the user picks one ---------- */
export function initTheme() {
  const btn = $('#themeToggle');
  const meta = $('meta[name="theme-color"]');
  const apply = (t) => {
    document.documentElement.dataset.theme = t;
    meta.setAttribute('content', t === 'dark' ? '#121417' : '#eef1ee');
    btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  };
  // Every page load starts dark (set on <html> in index.html); the toggle is not saved
  apply('dark');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';

    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;

    // Circular reveal from the toggle (View Transitions API), with a plain fallback
    if (!document.startViewTransition || reduced) {
      apply(next);
    } else {
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      document.startViewTransition(() => apply(next)).ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(.16,1,.3,1)', pseudoElement: '::view-transition-new(root)' }
        );
      });
    }
    starBurst(x, y, 10, 60);
  });
}

/* ---------- Copy email ---------- */
export function initCopyEmail() {
  const btn = $('#copyEmail');
  if (!btn) return; // hidden when a CV download is set instead
  btn.addEventListener('click', async () => {
    const email = btn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    toast('Email copied to clipboard ✓');
  });
}

/* ---------- Easter egg ---------- */
export function initEasterEgg(secret = 'philippines') {
  let buffer = '';
  window.addEventListener('keydown', (e) => {
    if (e.key.length !== 1) return;
    buffer = (buffer + e.key.toLowerCase()).slice(-secret.length);
    if (buffer !== secret) return;
    toast('Hello from the Philippines! Thanks for visiting.');
    for (let i = 0; i < 12; i++) {
      setTimeout(() => starBurst(Math.random() * innerWidth, Math.random() * innerHeight * 0.8, 10, 140), i * 120);
    }
  });

  console.log(
    `%c> Hello, fellow engineer! %c\nThanks for peeking at the source. Type "${secret}" on the page for a surprise.`,
    'font: 700 18px sans-serif; color: #0d1f12; background: #4ade80; padding: 6px 12px; border-radius: 6px;',
    'font: 13px monospace; color: #4ade80;'
  );
}
