const icons = {
  phone: '<rect x="6" y="2.5" width="12" height="19" rx="2"/><path d="M10 5h4M10 19h4"/>',
  plan: '<rect x="4" y="2.5" width="16" height="19" rx="2"/><path d="M8 7h8M8 11h8M8 15h8"/>',
  gift: '<rect x="3" y="9" width="18" height="12" rx="1"/><path d="M2 6h20v3H2zM12 6v15M12 6C8 6 7 2.5 9 2.5c2.5 0 3 3.5 3 3.5Zm0 0c4 0 5-3.5 3-3.5C12.5 2.5 12 6 12 6Z"/>',
  store: '<path d="M3 9h18l-1.5-6h-15L3 9Zm1 0v11h16V9M8 20v-6h8v6M3 9c0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0"/>',
  chat: '<path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 3v-3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M7 11h.01M12 11h.01M17 11h.01"/>',
};
export function icon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`;
}
