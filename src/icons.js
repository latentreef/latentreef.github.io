// Inline SVG icons (stroke icons use currentColor). Brand marks are simplified single-path glyphs.
const stroke = (d, extra = '') =>
  `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${d}</svg>`;
const solid = (d) => `<svg class="ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${d}</svg>`;

export const icons = {
  about: stroke('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>'),
  resume: stroke('<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>'),
  works: stroke('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>'),
  stack: stroke('<path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/>'),
  contact: stroke('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  sun: stroke('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>', ' data-icon="sun"'),
  moon: stroke('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>', ' data-icon="moon"'),
  download: stroke('<path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/>'),
  send: stroke('<path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/>'),
  copy: stroke('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>'),
  arrow: stroke('<path d="M7 17 17 7M8 7h9v9"/>'),
  briefcase: solid('<path d="M9 3h6a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v4H2V8a2 2 0 0 1 2-2h3V5a2 2 0 0 1 2-2zm0 3h6V5H9v1zM2 14h8v1a2 2 0 0 0 4 0v-1h8v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5z"/>'),
  school: solid('<path d="M12 2 1 7l11 5 9-4.1V15h2V7L12 2zM5 12.2V16c0 1.7 3.1 4 7 4s7-2.3 7-4v-3.8l-7 3.2-7-3.2z"/>'),
  email: stroke('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  whatsapp: solid('<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2z"/>'),
  linkedin: solid('<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4V9.5z"/>'),
  github: solid('<path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/>'),
};
