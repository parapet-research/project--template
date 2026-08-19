/* =============================================================================
   Research project page — behaviour
   -----------------------------------------------------------------------------
   No dependencies, no build step. Everything here degrades gracefully: with
   JavaScript disabled the page is still fully readable.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ------------------------------------------------------------- theme -- */
  var toggle = document.getElementById('theme-toggle');

  function effectiveTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', next === 'dark' ? '#131314' : '#ffffff');
    });
  }

  /* ------------------------------------------- topbar state + progress -- */
  var topbar = document.getElementById('topbar');
  var progress = document.getElementById('progress');
  var ticking = false;

  /* The bar stays out of the way on load so the page opens on the title and
     teaser, then slides in once you start scrolling. */
  var REVEAL_AT = 120;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;

    if (topbar) {
      topbar.classList.toggle('is-scrolled', y > 8);
      topbar.classList.toggle('is-hidden', y < REVEAL_AT);
    }

    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  /* ------------------------------------------------------ mobile menu -- */
  var menuBtn = document.getElementById('menu-toggle');
  var nav = document.querySelector('.topbar__nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --------------------------------------------------------- scrollspy -- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav-target]'));
  var targets = navLinks
    .map(function (a) { return document.getElementById(a.dataset.navTarget); })
    .filter(Boolean);

  if (targets.length && 'IntersectionObserver' in window) {
    var visible = new Map();

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });

      var bestId = null;
      var bestRatio = 0;
      visible.forEach(function (ratio, id) {
        if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
      });

      navLinks.forEach(function (a) {
        a.classList.toggle('is-active', bestId !== null && a.dataset.navTarget === bestId);
      });
    }, {
      rootMargin: '-70px 0px -55% 0px',
      threshold: [0, 0.25, 0.5, 1]
    });

    targets.forEach(function (t) { spy.observe(t); });
  }

  /* ------------------------------------- wrap tables so they can scroll -- */
  document.querySelectorAll('.prose table').forEach(function (table) {
    if (table.parentElement && table.parentElement.classList.contains('table-wrap')) return;
    var wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    wrap.setAttribute('tabindex', '0');
    wrap.setAttribute('role', 'region');
    var caption = table.getAttribute('data-title');
    if (caption) wrap.setAttribute('aria-label', caption);
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });

  /* ---------------------------------------------------------- lightbox -- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lastFocus = null;

  function openLightbox(img) {
    if (!lightbox || !lightboxImg) return;
    lastFocus = document.activeElement;
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.hidden = false;
    requestAnimationFrame(function () { lightbox.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
    var closeBtn = lightbox.querySelector('.lightbox__close');
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    window.setTimeout(function () {
      lightbox.hidden = true;
      lightboxImg.removeAttribute('src');
    }, 180);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.querySelectorAll('img[data-zoomable]').forEach(function (img) {
    img.addEventListener('click', function () { openLightbox(img); });
  });

  if (lightbox) {
    lightbox.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
  }

  /* ------------------------------------------------------- copy button -- */
  document.querySelectorAll('[data-copy-target]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var el = document.getElementById(btn.dataset.copyTarget);
      if (!el) return;
      var text = el.innerText;

      var done = function () {
        var label = btn.querySelector('span');
        var original = label ? label.textContent : '';
        btn.classList.add('is-done');
        if (label) label.textContent = 'Copied';
        window.setTimeout(function () {
          btn.classList.remove('is-done');
          if (label) label.textContent = original;
        }, 1800);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });
})();
