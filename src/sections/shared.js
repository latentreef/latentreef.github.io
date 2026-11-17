import { esc } from '../utils.js';

/** Page title with a green first letter and a soft glow dot behind it, e.g. "About Me". */
export const pageTitle = (text, tag = 'h2') => {
  const t = String(text);
  return `<${tag} class="ptitle"><span class="ptitle__first">${esc(t[0])}</span>${esc(t.slice(1))}</${tag}>`;
};

/** Header bar of a block inside a page; `extra` goes on the right (e.g. filter tabs). */
export const blockHead = (text, extra = '', tag = 'h2') => `
  <header class="block__head">${pageTitle(text, tag)}${extra}</header>`;

/** Small green label chip, e.g. "Location:". */
export const chip = (text) => `<span class="chip">${esc(text)}</span>`;
