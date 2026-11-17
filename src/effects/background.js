import { $, clamp, lerp, reduced } from '../utils.js';

/* ---------- Neural-network canvas behind the page: drifting nodes linked to their neighbors ---------- */
const PALETTES = {
  dark: { nodes: [[74, 222, 128], [220, 255, 230], [34, 197, 94]], edge: [110, 231, 150], blend: 'lighter', glow: 0.1, core: 0.9, link: 0.16 },
  light: { nodes: [[22, 128, 61], [21, 94, 50], [47, 158, 68]], edge: [22, 128, 61], blend: 'source-over', glow: 0.06, core: 0.45, link: 0.12 },
};

export function initNetwork() {
  const canvas = $('#network');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const mouse = { x: -9999, y: -9999 };
  let w = 0, h = 0, nodes = [], raf;

  const make = () => {
    const bx = (Math.random() - 0.5) * 0.22;
    const by = (Math.random() - 0.5) * 0.22;
    return {
      x: Math.random() * w, y: Math.random() * h,
      vx: bx, vy: by, bx, by,
      r: Math.random() * 1.5 + 0.6,
      ph: Math.random() * Math.PI * 2,
      sp: Math.random() * 0.03 + 0.008,
      c: Math.floor(Math.random() * 3),
    };
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    nodes = Array.from({ length: Math.round(clamp((w * h) / 22000, 25, 90)) }, make);
  };

  const draw = () => {
    const pal = PALETTES[document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'];
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = pal.blend;

    for (const n of nodes) {
      n.ph += n.sp;
      const a = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(n.ph));
      const dx = n.x - mouse.x;
      const dy = n.y - mouse.y;
      const d = Math.hypot(dx, dy) || 1;
      if (d < 150) {
        const force = (150 - d) / 150;
        n.vx += (dx / d) * force * 0.4;
        n.vy += (dy / d) * force * 0.4;
      }
      n.vx = lerp(n.vx, n.bx, 0.03) + (Math.random() - 0.5) * 0.03;
      n.vy = lerp(n.vy, n.by, 0.03) + (Math.random() - 0.5) * 0.03;
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
      if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;

      const [r, g, b] = pal.nodes[n.c];
      ctx.fillStyle = `rgba(${r},${g},${b},${a * pal.glow})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(${r},${g},${b},${a * pal.core})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    const LINK = 130;
    const [er, eg, eb] = pal.edge;
    ctx.lineWidth = 0.6;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        if (dx > LINK || dx < -LINK) continue;
        const dy = a.y - b.y;
        if (dy > LINK || dy < -LINK) continue;
        const d = Math.hypot(dx, dy);
        if (d >= LINK) continue;
        ctx.strokeStyle = `rgba(${er},${eg},${eb},${(1 - d / LINK) * pal.link})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  };

  const loop = () => {
    draw();
    raf = requestAnimationFrame(loop);
  };

  resize();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.documentElement.addEventListener('mouseleave', () => (mouse.x = mouse.y = -9999));

  if (reduced) return draw();
  loop();
  // Pause while the tab is hidden
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(raf);
    if (!document.hidden) loop();
  });
}

/* ---------- Background video: faint, paused while the tab is hidden ---------- */
export function initBgVideo() {
  const video = $('#bgVideo');
  if (!video) return;

  const show = () => video.classList.add('is-playing');
  const fail = () => video.remove();
  video.addEventListener('error', fail, true); // errors on <source> don't bubble
  video.querySelector('source')?.addEventListener('error', fail);

  // Reduced motion: keep the still poster frame, never play
  if (reduced) return show();

  const sync = () => {
    if (!document.hidden) video.play().then(show).catch(() => show());
    else video.pause();
  };
  sync();
  document.addEventListener('visibilitychange', sync);
}
