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
  form.action = form.id === 'tip-form'
    ? 'https://formspree.io/f/xdekpwjo'
    : 'https://formspree.io/f/xvkgwveg';
  form.method = 'POST';

  const subject = document.createElement('input');
  subject.type = 'hidden';
  subject.name = '_subject';
  subject.value = form.id === 'tip-form'
    ? 'Neuer Tipp über TierarztNachfolge.de'
    : 'Neue Anfrage über TierarztNachfolge.de';
  form.prepend(subject);

  if (form.id === 'tip-form') {
    form.addEventListener('submit', () => {
      if (typeof window.fbq !== 'function') return;
      window.fbq('track', 'Lead', {
        value: 10.000,
        currency: '€',
      });
    });
  }
});

const consentKey = 'tn_cookie_consent';
const analyticsId = 'G-E4S53DLB36';
const metaPixelId = '1649008993556489';

const loadGoogleAnalytics = () => {
  if (window.__tnGoogleAnalyticsLoaded) return;
  window.__tnGoogleAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(){window.dataLayer.push(arguments);};
  window.gtag('js', new Date());
  window.gtag('config', analyticsId);
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
  document.head.appendChild(script);
};

const loadMetaPixel = () => {
  if (window.__tnMetaPixelLoaded || !document.body.classList.contains('referral-page')) return;
  window.__tnMetaPixelLoaded = true;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,
  'script','https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init', metaPixelId);
  window.fbq('track', 'PageView');
};

const loadOptionalTracking = () => {
  loadGoogleAnalytics();
  loadMetaPixel();
};

const showCookieSettings = () => {
  const existing = document.querySelector('.cookie-consent');
  if (existing) {
    existing.hidden = false;
    return;
  }

  const banner = document.createElement('aside');
  banner.className = 'cookie-consent';
  banner.setAttribute('aria-labelledby', 'cookie-consent-title');
  banner.innerHTML = `<div><strong id="cookie-consent-title">Ihre Privatsphäre</strong><p>Wir verwenden optionale Cookies für Google Analytics und auf der Tippgeber-Seite das Meta Pixel. Diese helfen uns, die Website zu verbessern. Details finden Sie in der <a href="/datenschutz.html">Datenschutzerklärung</a>.</p></div><div class="cookie-consent-actions"><button type="button" class="cookie-reject">Nur notwendige</button><button type="button" class="button button-dark cookie-accept">Alle akzeptieren</button></div>`;
  document.body.appendChild(banner);

  const saveConsent = (value) => {
    localStorage.setItem(consentKey, value);
    banner.hidden = true;
    if (value === 'accepted') loadOptionalTracking();
  };
  banner.querySelector('.cookie-accept').addEventListener('click', () => saveConsent('accepted'));
  banner.querySelector('.cookie-reject').addEventListener('click', () => saveConsent('rejected'));
};

const savedConsent = localStorage.getItem(consentKey);
if (savedConsent === 'accepted') {
  loadOptionalTracking();
} else if (!savedConsent) {
  showCookieSettings();
}

document.querySelectorAll('[data-cookie-settings]').forEach((button) => {
  button.addEventListener('click', () => {
    localStorage.removeItem(consentKey);
    showCookieSettings();
  });
});
