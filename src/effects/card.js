import { $, finePointer, reduced } from '../utils.js';

/** Types each role, waits, deletes it, then types the next. */
export function startRoles(roles) {
  const el = $('#role');
  if (!el || reduced || roles.length < 2) return;
  let i = 0;
  let n = roles[0].length;
  let deleting = true;

  const tick = () => {
    const word = roles[i];
    if (deleting) {
      n--;
      el.textContent = word.slice(0, n);
      if (n === 0) {
        deleting = false;
        i = (i + 1) % roles.length;
      }
      setTimeout(tick, 40);
    } else {
      n++;
      el.textContent = roles[i].slice(0, n);
      if (n === roles[i].length) {
        deleting = true;
        setTimeout(tick, 2600);
      } else setTimeout(tick, 75 + Math.random() * 60);
    }
  };
  setTimeout(tick, 2600);
}

/** CRT photo: every few seconds a short glitch (RGB split + sliced rows). */
export function initCrt() {
  const crt = $('#crt');
  if (!crt || reduced) return;
  const glitch = () => {
    crt.classList.add('is-glitch');
    setTimeout(() => crt.classList.remove('is-glitch'), 260 + Math.random() * 200);
    setTimeout(glitch, 3500 + Math.random() * 5000);
  };
  setTimeout(glitch, 2500);
  // Hovering the photo triggers one right away
  crt.addEventListener('mouseenter', () => {
    crt.classList.add('is-glitch');
    setTimeout(() => crt.classList.remove('is-glitch'), 320);
  });
}

/** The profile card leans a little toward the mouse (on top of its resting tilt). */
export function initCardTilt() {
  const card = $('#pcard');
  if (!card || !finePointer || reduced) return;
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
    card.style.setProperty('--rx', `${(0.5 - (e.clientY - r.top) / r.height) * 6}deg`);
  });
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--rx', '0deg');
  });
}
