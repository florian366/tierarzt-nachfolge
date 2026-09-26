if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

if (window.location.hash) {
  history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
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

document.querySelectorAll('#request-form, #tip-form').forEach((form) => {
  form.action = 'https://formspree.io/f/xvkgwveg';
  form.method = 'POST';

  const subject = document.createElement('input');
  subject.type = 'hidden';
  subject.name = '_subject';
  subject.value = form.id === 'tip-form'
    ? 'Neuer Tipp über TierarztNachfolge.de'
    : 'Neue Anfrage über TierarztNachfolge.de';
  form.prepend(subject);
});
