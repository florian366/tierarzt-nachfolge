if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const scrollToTop = () => {
  window.scrollTo(0, 0);
  requestAnimationFrame(() => window.scrollTo(0, 0));
};

scrollToTop();
window.addEventListener('load', scrollToTop);
window.addEventListener('pageshow', scrollToTop);

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#request-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = document.querySelector('.form-status');
  status.textContent = 'Vielen Dank. Wir melden uns persönlich bei Ihnen.';
  event.target.reset();
});
