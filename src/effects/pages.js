import { $, $$, clamp, easeOutExpo, reduced } from '../utils.js';
import { toast } from './ui.js';

const mobile = matchMedia('(max-width: 1100px)');

/** Count [data-count] numbers up from 0 (once per element). */
function runCounters(root) {
  $$('[data-count]:not(.is-counted)', root).forEach((el) => {
    el.classList.add('is-counted');
    const target = Number(el.dataset.count);
    const dur = reduced ? 1 : 1800;
    const t0 = performance.now();
    const step = (now) => {
      const p = clamp((now - t0) / dur, 0, 1);
      el.textContent = Math.round(easeOutExpo(p) * target).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

/** One page visible at a time inside the panel; the URL hash (#about, #works…) picks it. */
export function initPages(defaultPage = 'about') {
  const pages = $$('.page');
  const ids = pages.map((p) => p.dataset.page);
  const links = $$('[data-page-link]');
  const scroller = $('#panelScroll');

  const show = (id, { user = false } = {}) => {
    if (!ids.includes(id)) id = defaultPage;
    pages.forEach((p) => p.classList.toggle('is-active', p.dataset.page === id));
    links.forEach((l) => {
      const on = l.dataset.pageLink === id;
      l.classList.toggle('is-active', on);
      on ? l.setAttribute('aria-current', 'page') : l.removeAttribute('aria-current');
    });
    scroller.scrollTop = 0;
    const current = $(`#page-${id}`);
    runCounters(current);
    $$('.terminal', current).forEach((t) => t.classList.add('is-in'));

    if (user) {
      if (mobile.matches) $('#panel').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      current.focus({ preventScroll: true });
    }
  };

  // Any in-page link to a page id switches pages instead of jumping
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (!ids.includes(id)) return;
    e.preventDefault();
    if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
    show(id, { user: true });
  });
  window.addEventListener('popstate', () => show(location.hash.slice(1)));

  show(location.hash.slice(1) || defaultPage);
}

/** Works page filter tabs. */
export function initFilters() {
  const btns = $$('[data-filter]');
  const cells = $$('.works > .cell');
  btns.forEach((btn) =>
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      btns.forEach((b) => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-selected', String(b === btn));
      });
      cells.forEach((c) => {
        const show = f === 'All' || c.dataset.cat === f;
        c.classList.toggle('is-hidden', !show);
      });
    })
  );
}

/** Contact form: no server, so it opens the visitor's email app with everything filled in. */
export function initContactForm(email) {
  const form = $('#contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bad = $$('input, textarea', form).filter((f) => !f.checkValidity());
    $$('input, textarea', form).forEach((f) => f.classList.toggle('is-invalid', bad.includes(f)));
    if (bad.length) {
      bad[0].focus();
      toast(bad[0].type === 'email' && bad[0].value ? 'Please check the email address.' : 'Please fill in every field.');
      return;
    }
    const { name, email: from, message } = Object.fromEntries(new FormData(form));
    const subject = `Hello from ${name}`;
    const body = `${message}\n\n— ${name} (${from})`;
    location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast('Opening your email app…');
  });
  form.addEventListener('input', (e) => e.target.classList.remove('is-invalid'));
}
