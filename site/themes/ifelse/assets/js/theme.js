// Theme toggle: an explicit choice is stored and wins over the system preference.
// Without JS the site still follows prefers-color-scheme and the toggle stays hidden.

const KEY = "theme";
const root = document.documentElement;
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

function stored() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function current() {
  return root.dataset.theme || (systemDark.matches ? "dark" : "light");
}

function sync() {
  for (const button of document.querySelectorAll("[data-theme-toggle]")) {
    button.hidden = false;
    button.setAttribute("aria-pressed", String(current() === "dark"));
  }
}

const saved = stored();
if (saved === "light" || saved === "dark") {
  root.dataset.theme = saved;
}

document.addEventListener("DOMContentLoaded", sync);
systemDark.addEventListener("change", sync);

document.addEventListener("click", (event) => {
  if (!event.target.closest("[data-theme-toggle]")) {
    return;
  }
  const next = current() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    // Storage blocked: the choice lasts for this page only.
  }
  sync();
});
