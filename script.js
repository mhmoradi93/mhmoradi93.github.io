const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const stored = localStorage.getItem('portfolio-theme');

if (stored) {
  root.dataset.theme = stored;
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  root.dataset.theme = 'dark';
}

toggle?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('portfolio-theme', next);
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
