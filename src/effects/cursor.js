import { $, lerp, finePointer, reduced, BURST_COLORS } from '../utils.js';

const INTERACTIVE = 'a, button, [data-cursor]';

/** Dot + lagging ring cursor. Elements with data-cursor="Text" show a label. */
export function initCursor() {
  if (!finePointer) return;
  document.documentElement.classList.add('has-cursor');

  const cursor = $('.cursor');
  const dot = $('.cursor__dot');
  const ring = $('.cursor__ring');
  const label = $('.cursor__label');
  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  const pos = { ...mouse };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
    cursor.classList.remove('is-hidden');
  });

  (function loop() {
    pos.x = lerp(pos.x, mouse.x, 0.18);
    pos.y = lerp(pos.y, mouse.y, 0.18);
    ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    requestAnimationFrame(loop);
  })();

  document.addEventListener('mouseover', (e) => {
    const t = e.target.closest(INTERACTIVE);
    if (!t) return;
    const text = t.getAttribute('data-cursor');
    if (text) {
      label.textContent = text;
      cursor.classList.add('has-label');
    } else {
      cursor.classList.add('is-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    const t = e.target.closest(INTERACTIVE);
    if (!t) return;
    const to = e.relatedTarget?.closest?.(INTERACTIVE);
    if (to === t) return;
    cursor.classList.remove('has-label', 'is-hover');
  });
  document.addEventListener('mousedown', () => cursor.classList.add('is-down'));
  document.addEventListener('mouseup', () => cursor.classList.remove('is-down'));
  document.documentElement.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));
}

/** Bursts green stars out from (x, y). */
export function starBurst(x, y, count = 8, spread = 90) {
  if (reduced) return;
  for (let i = 0; i < count; i++) {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 20 20');
    s.classList.add('burst-star');
    s.innerHTML = '<use href="#star-symbol"/>';
    s.style.color = BURST_COLORS[i % BURST_COLORS.length];
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;
    document.body.appendChild(s);

    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const dist = spread * (0.5 + Math.random() * 0.7);
    const size = 0.6 + Math.random() * 0.9;
    s.animate(
      [
        { transform: 'translate(0,0) scale(0) rotate(0deg)', opacity: 1 },
        {
          transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(${size}) rotate(${180 + Math.random() * 180}deg)`,
          opacity: 0,
        },
      ],
      { duration: 800 + Math.random() * 500, easing: 'cubic-bezier(.16,1,.3,1)' }
    ).onfinish = () => s.remove();
  }
}

export function initClickBurst() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('input, textarea')) return;
    starBurst(e.clientX, e.clientY, 7, 70);
  });
}
