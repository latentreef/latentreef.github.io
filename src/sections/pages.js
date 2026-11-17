import { esc, rich, flagSvg } from '../utils.js';
import { icons } from '../icons.js';
import { blockHead, chip } from './shared.js';

const page = (id, label, body) => `
  <section class="page" id="page-${id}" data-page="${id}" aria-label="${esc(label)}" tabindex="-1">${body}</section>`;

/* ---------- About ---------- */
export function renderAbout(p) {
  const info = [
    ['Location', `${esc(p.location)} ${flagSvg()}`],
    ...p.now.map((n) => [n.label, esc(n.value)]),
  ];
  return page('about', 'About', /* html */ `
    ${blockHead('About Me')}
    <div class="cols">
      <div class="cell">
        <p class="lead">${esc(p.about.statement)}</p>
      </div>
      <div class="cell cell--flush">
        <ul class="info">
          ${info.map(([k, v]) => `<li>${chip(`${k}:`)}<span>${v}</span></li>`).join('')}
          <li class="info__skills">${chip('Skills:')}<span class="skills">${p.skills.map((s) => `<i>${esc(s)}</i>`).join('')}</span></li>
        </ul>
      </div>
    </div>

    <div class="stats">
      ${p.about.stats
        .map((s) => `<div class="stat"><b><span data-count="${s.value}">0</span>${esc(s.suffix || '')}</b><span>${esc(s.label)}</span></div>`)
        .join('')}
    </div>

    ${blockHead('What I Do')}
    <div class="cols cols--cards">
      ${p.services
        .map(
          (s) => `
        <div class="cell"><article class="box spot">
          <span class="box__icon" aria-hidden="true">${esc(s.icon)}</span>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.text)}</p>
        </article></div>`
        )
        .join('')}
    </div>

    ${blockHead('How I Work')}
    <div class="cols cols--cards">
      ${p.values
        .map(
          (v) => `
        <div class="cell"><article class="box box--row spot">
          <span class="box__icon" aria-hidden="true">${esc(v.icon)}</span>
          <div><h3>${esc(v.word)} <small>${esc(v.meaning)}</small></h3><p>${esc(v.text)}</p></div>
        </article></div>`
        )
        .join('')}
    </div>`);
}

/* ---------- Resume ---------- */
const timeline = (items) =>
  `<ol class="tl">${items
    .map(
      (it, i) => `
    <li class="tl__item${i === 0 ? ' is-current' : ''}">
      <article class="box spot">
        <span class="tag">${esc(it.years)}</span>
        <h3>${esc(it.title)}</h3>
        <span class="tl__org">${esc(it.org)}</span>
        <p>${esc(it.text)}</p>
        ${it.highlights?.length ? `<ul class="tl__points">${it.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}
        ${it.tech?.length ? `<ul class="tl__tech">${it.tech.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
      </article>
    </li>`
    )
    .join('')}</ol>`;

export function renderResume(p) {
  const facts = [
    ['Experience', p.yearsSummary],
    ['Current', p.now[0]?.value],
    ['Focus', p.focus.join(' · ')],
    ['Works', p.workMode],
  ].filter(([, v]) => v);

  return page('resume', 'Resume', /* html */ `
    ${blockHead('Resume')}
    <div class="facts">
      ${facts.map(([k, v]) => `<div class="fact">${chip(k)}<span>${esc(v)}</span></div>`).join('')}
    </div>
    <div class="cols">
      <div class="cell">
        <h3 class="subhead">${icons.briefcase} Experience</h3>
        ${timeline(p.experience)}
      </div>
      <div class="cell">
        <h3 class="subhead">${icons.school} Education</h3>
        ${timeline(p.education)}
        ${p.achievements?.length ? `
        <h3 class="subhead subhead--gap">${icons.stack} Key Achievements</h3>
        <ul class="wins">
          ${p.achievements.map((a) => `<li><b>${esc(a.value)}</b><span>${esc(a.label)}</span></li>`).join('')}
        </ul>` : ''}
        <a href="${esc(p.cv || '#contact')}" class="link-btn resume__dl"${p.cv ? ' download' : ''}>${p.cv ? `Download full resume ${icons.download}` : `Get in touch ${icons.send}`}</a>
      </div>
    </div>`);
}

/* ---------- Works ---------- */
const shot = (pr, p) => {
  const [first, ...rest] = pr.title.split(' ');
  return /* html */ `
    <div class="shot" aria-hidden="true">
      <div class="shot__side">
        <span class="shot__avatar">${esc(p.initials)}</span>
        <ul>${[70, 55, 62, 48, 58].map((w, k) => `<li style="--w:${w}%"${k === 0 ? ' class="on"' : ''}><i></i></li>`).join('')}</ul>
      </div>
      <div class="shot__main">
        <span class="shot__glyph">${esc(pr.glyph)}</span>
        <p class="shot__title">${esc(first)} <em>${esc(rest.join(' '))}</em></p>
        <p class="shot__kind">${esc(pr.kind)}<span class="pcard__caret">_</span></p>
      </div>
    </div>`;
};

export function renderWorks(p) {
  const cats = ['All', ...new Set(p.projects.map((pr) => pr.category))];
  const filters = `<div class="filters" role="tablist" aria-label="Filter projects">${cats
    .map((c, i) => `<button role="tab" class="filters__btn${i === 0 ? ' is-active' : ''}" aria-selected="${i === 0}" data-filter="${esc(c)}">${esc(c)}</button>`)
    .join('')}</div>`;

  return page('works', 'Works', /* html */ `
    ${blockHead('Works', filters)}
    <div class="cols cols--cards works">
      ${p.projects
        .map((pr) => {
          const main = pr.links[0];
          return `
        <div class="cell" data-cat="${esc(pr.category)}"><article class="work box" style="--c1:${esc(pr.colors[0])};--c2:${esc(pr.colors[1])}">
          ${pr.image
            ? `<div class="work__img">${shot(pr, p)}<img src="${esc(pr.image)}" alt="${esc(pr.title)} website screenshot" width="960" height="600" decoding="async" onerror="this.remove()" /></div>`
            : shot(pr, p)}
          <div class="work__body">
            <div class="work__head">
              <div><span class="work__cat">${esc(pr.year)}</span><h3>${esc(pr.title)}</h3><span class="work__kind">${esc(pr.kind)}</span></div>
              ${main ? `<a href="${esc(main.href)}" class="round-btn" target="_blank" rel="noopener" aria-label="Open ${esc(pr.title)}">${icons.arrow}</a>` : ''}
            </div>
            ${pr.role ? `<p class="work__role">${esc(pr.role)}</p>` : ''}
            <p>${esc(pr.description)}</p>
            <dl class="metrics">${pr.metrics.map((m) => `<div><dt>${esc(m.label)}</dt><dd>${esc(m.value)}</dd></div>`).join('')}</dl>
            <ul class="tags">${pr.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          </div>
        </article></div>`;
        })
        .join('')}
    </div>`);
}

/* ---------- Contact ---------- */
export function renderContact(p) {
  const info = [
    ['Location', esc(p.location)],
    ['Email', `<a href="mailto:${esc(p.email)}">${esc(p.email)}</a>`],
    ...(p.whatsapp ? [['WhatsApp', `<a href="https://wa.me/${esc(p.whatsapp.wa)}" target="_blank" rel="noopener">${esc(p.whatsapp.number)}</a>`]] : []),
    ['Local time', `<span data-clock>--:--</span> PHT`],
  ];
  return page('contact', 'Contact', /* html */ `
    <div class="zones" aria-label="World clocks">
      ${p.timezones
        .map((z, i) => `<div class="zone${i === 0 ? ' is-home' : ''}"><span>${esc(z.label)}</span><b data-tz="${esc(z.tz)}">--:--</b></div>`)
        .join('')}
    </div>
    <ul class="info info--grid">
      ${info.map(([k, v]) => `<li>${chip(`${k}:`)}<span>${v}</span></li>`).join('')}
    </ul>
    <p class="contact__note"><span data-greeting>Hello!</span> ${rich('I usually reply within *24 hours*.')}</p>

    ${blockHead('Contact Form')}
    <form class="form" id="contactForm" novalidate>
      <div class="form__row">
        <label><span class="sr-only">Full name</span><input name="name" type="text" placeholder="Full Name" autocomplete="name" required /></label>
        <label><span class="sr-only">Email address</span><input name="email" type="email" placeholder="Email Address" autocomplete="email" required /></label>
      </div>
      <label><span class="sr-only">Message</span><textarea name="message" rows="5" placeholder="Your Message" required></textarea></label>
      <div class="form__foot">
        <button type="submit" class="link-btn">Send message ${icons.send}</button>
        <span class="form__hint">Opens your email app with the message filled in.</span>
      </div>
    </form>`);
}
