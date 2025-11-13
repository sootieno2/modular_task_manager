export function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
