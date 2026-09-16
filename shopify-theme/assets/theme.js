document.documentElement.classList.remove('no-js');

/* ------------------------------------------------------------------ */
/* Sticky header shadow/blur on scroll                                 */
/* ------------------------------------------------------------------ */
(function headerScroll() {
  var header = document.querySelector('[data-site-header]');
  if (!header) return;
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ------------------------------------------------------------------ */
/* Mobile menu toggle                                                  */
/* ------------------------------------------------------------------ */
(function mobileMenu() {
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-mobile-menu]');
  if (!toggle || !menu) return;

  function close() {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  }

  toggle.addEventListener('click', function () {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('is-open', !isOpen);
  });

  menu.querySelectorAll('a, [data-menu-close]').forEach(function (el) {
    el.addEventListener('click', close);
  });
})();

/* ------------------------------------------------------------------ */
/* Scroll reveal (fade-up on intersection)                             */
/* ------------------------------------------------------------------ */
(function scrollReveal() {
  var items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
  );

  items.forEach(function (el) { observer.observe(el); });
})();

/* ------------------------------------------------------------------ */
/* Product gallery — thumbnail swap                                    */
/* ------------------------------------------------------------------ */
(function productGallery() {
  document.querySelectorAll('[data-product-gallery]').forEach(function (gallery) {
    var main = gallery.querySelector('[data-gallery-main]');
    var thumbs = gallery.querySelectorAll('[data-gallery-thumb]');
    if (!main || !thumbs.length) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var html = thumb.getAttribute('data-gallery-source');
        if (html === null) return;
        main.innerHTML = html;
        thumbs.forEach(function (t) { t.classList.remove('is-active'); });
        thumb.classList.add('is-active');
      });
    });
  });
})();

/* ------------------------------------------------------------------ */
/* Quantity selectors                                                  */
/* ------------------------------------------------------------------ */
(function quantitySelectors() {
  document.querySelectorAll('[data-quantity-selector]').forEach(function (wrap) {
    var input = wrap.querySelector('input[type="number"]');
    if (!input) return;
    wrap.querySelectorAll('[data-quantity-step]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var step = parseInt(btn.getAttribute('data-quantity-step'), 10);
        var min = parseInt(input.getAttribute('min') || '1', 10);
        var value = parseInt(input.value || '1', 10) + step;
        input.value = Math.max(min, value);
        input.dispatchEvent(new Event('change'));
      });
    });
  });
})();

/* ------------------------------------------------------------------ */
/* Contact form — progressive success state                            */
/* ------------------------------------------------------------------ */
(function contactForm() {
  var form = document.getElementById('ContactForm');
  if (!form) return;

  var submitBtn = form.querySelector('[type="submit"]');
  form.addEventListener('submit', function () {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = submitBtn.getAttribute('data-sending-label') || submitBtn.textContent;
    }
  });
})();
