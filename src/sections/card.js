import { esc } from '../utils.js';
import { icons } from '../icons.js';

/** Tilted profile card: photo with a CRT/TV effect, name, typed role, socials, two actions. */
export function renderCard(p) {
  const fullName = `${p.name.first} ${p.name.last}`.replace(/\.$/, '');
  const pos = esc(p.photoPosition || '50% 25%');
  const photo = p.photo
    ? `<img src="${esc(p.photo)}" alt="${esc(fullName)}" class="crt__img" style="object-position:${pos}" />
       <span class="crt__ghost crt__ghost--r" style="background-image:url('${esc(p.photo)}');background-position:${pos}" aria-hidden="true"></span>
       <span class="crt__ghost crt__ghost--c" style="background-image:url('${esc(p.photo)}');background-position:${pos}" aria-hidden="true"></span>`
    : `<span class="crt__initials">${esc(p.initials)}</span>`;

  const left = p.cv
    ? `<a href="${esc(p.cv)}" class="pcard__action" download="${esc(fullName.replace(/\s+/g, '-'))}-Resume.pdf">Download Resume ${icons.download}</a>`
    : `<button class="pcard__action" id="copyEmail" data-email="${esc(p.email)}" data-cursor="Copy">Copy email ${icons.copy}</button>`;

  return /* html */ `
  <aside class="pcard" id="pcard">
    <div class="pcard__photo crt" id="crt">
      ${photo}
      <span class="crt__lines" aria-hidden="true"></span>
      <span class="crt__scan" aria-hidden="true"></span>
      <span class="crt__vignette" aria-hidden="true"></span>
    </div>

    <div class="pcard__info">
      <h1 class="pcard__name">${esc(fullName)}</h1>
      <p class="pcard__role"><span id="role">${esc(p.roles[0])}</span><span class="pcard__caret" aria-hidden="true">_</span></p>
      <ul class="pcard__socials">
        ${p.socials.map((s) => `<li><a href="${esc(s.href)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}">${icons[s.icon] || esc(s.label)}</a></li>`).join('')}
        ${p.whatsapp ? `<li><a href="https://wa.me/${esc(p.whatsapp.wa)}" target="_blank" rel="noopener" aria-label="WhatsApp ${esc(p.whatsapp.number)}">${icons.whatsapp}</a></li>` : ''}
        <li><a href="mailto:${esc(p.email)}" aria-label="Email">${icons.email}</a></li>
      </ul>
    </div>

    <div class="pcard__actions">
      ${left}
      <a href="#contact" class="pcard__action">Contact me ${icons.send}</a>
    </div>
  </aside>`;
}
