// Theme is controlled by one class and CSS custom properties.
const themeButton = document.querySelector('.theme-toggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('portfolio-theme');
const initialDark = savedTheme === 'dark' || (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
function setTheme(isDark) {
  root.classList.toggle('dark-theme', isDark);
  themeButton.textContent = isDark ? 'Light mode' : 'Dark mode';
  themeButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  themeButton.setAttribute('aria-pressed', String(isDark));
}
setTheme(initialDark);
themeButton.addEventListener('click', () => {
  const isDark = !root.classList.contains('dark-theme');
  setTheme(isDark);
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
});
