import { esc } from '../utils.js';
import { blockHead } from './shared.js';

/** Terminal card: a `whoami` printout built from the profile data. */
function terminal(p) {
  const fullName = `${p.name.first} ${p.name.last}`.replace(/\.$/, '');
  const rows = [
    ['name', esc(fullName)],
    ['role', `<span class="t-str">${esc(p.title)}</span>`],
    ['focus', `[${p.focus.map((f) => `<span class="t-str">${esc(f)}</span>`).join(', ')}]`],
    ['experience', esc(p.yearsSummary)],
    ['location', esc(p.location)],
    ['timezone', esc(p.workMode)],
    ['status', p.available ? '<span class="t-ok">● available</span>' : '<span class="t-muted">○ not looking</span>'],
  ];
  const lines = [
    `<span class="t-prompt">$</span> whoami --verbose`,
    ...rows.map(([k, v]) => `<span class="t-key">${k.padEnd(11)}</span>${v}`),
    `<span class="t-prompt">$</span> <span class="t-cursor"></span>`,
  ];
  return /* html */ `
    <div class="terminal">
      <div class="terminal__bar">
        <span class="terminal__dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="terminal__title">~/${esc(p.logo.name)} — zsh</span>
      </div>
      <pre class="terminal__body"><code>${lines.map((l, i) => `<span class="t-line" style="--i:${i}">${l}</span>`).join('')}</code></pre>
    </div>`;
}

export function renderStack(p) {
  return /* html */ `
  <section class="page" id="page-stack" data-page="stack" aria-label="Tech stack" tabindex="-1">
    ${blockHead('Tech Stack')}
    <div class="cell">${terminal(p)}</div>
    <div class="cols cols--cards">
      ${p.stack
        .map(
          (g) => `
        <div class="cell"><article class="box stack__group spot">
          <header><span class="box__icon" aria-hidden="true">${esc(g.icon)}</span><h3>${esc(g.group)}</h3><span class="stack__count">${String(g.items.length).padStart(2, '0')}</span></header>
          <ul>${g.items.map((it) => `<li>${esc(it)}</li>`).join('')}</ul>
        </article></div>`
        )
        .join('')}
    </div>
  </section>`;
}
