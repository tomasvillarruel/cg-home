(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Nav: shrink al hacer scroll ---- */
  var nav = document.getElementById('site-nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('shrink', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Menú mobile ---- */
  var burger = document.getElementById('nav-burger');
  var navLinks = document.getElementById('nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        burger.focus();
      }
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    var closeBtn = document.getElementById('nav-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        burger.focus();
      });
    }
  }

  /* ---- Reveal al entrar en viewport (con stagger entre hermanos) ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var siblings = Array.prototype.slice.call(
          entry.target.parentElement.querySelectorAll(':scope > .reveal')
        );
        var i = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = Math.max(0, i) * 85 + 'ms';
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Smooth scroll para anclas internas ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var navH = nav ? nav.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---- Carrusel del hero ---- */
  var hero = document.querySelector('.hero');
  if (hero) {
    var slides = hero.querySelectorAll('.hero__slide');
    var panels = hero.querySelectorAll('.hero__panel');
    var dots   = hero.querySelectorAll('.hero__dot');
    var countEl = hero.querySelector('.hero__count b');
    var arrows  = hero.querySelectorAll('.hero__arrow');
    var total   = slides.length;
    var index   = 0;
    var timer   = null;
    var INTERVAL = 6000;

    function pad(n) { return (n + 1 < 10 ? '0' : '') + (n + 1); }

    function show(next) {
      index = (next + total) % total;
      slides.forEach(function (s, i) { s.classList.toggle('active', i === index); });
      panels.forEach(function (p, i) { p.classList.toggle('active', i === index); });
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === index);
        d.setAttribute('aria-selected', String(i === index));
      });
      if (countEl) countEl.textContent = pad(index);
    }

    function go(next) { show(next); restart(); }

    function restart() {
      if (prefersReduced) return;
      clearInterval(timer);
      dots.forEach(function (d) {
        if (!d.classList.contains('active')) return;
        d.style.animation = 'none';
        void d.offsetWidth;
        d.style.animation = '';
      });
      timer = setInterval(function () { show(index + 1); }, INTERVAL);
    }

    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { go(i); });
    });
    arrows.forEach(function (a) {
      a.addEventListener('click', function () {
        go(index + parseInt(a.dataset.dir, 10));
      });
    });

    hero.addEventListener('mouseenter', function () { clearInterval(timer); });
    hero.addEventListener('mouseleave', restart);

    var tx = 0;
    hero.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', function (e) {
      var dx = tx - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 48) { go(index + (dx > 0 ? 1 : -1)); }
    });

    hero.setAttribute('tabindex', '0');
    hero.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft')  go(index - 1);
    });

    show(0);
    restart();
  }

  /* ---- Rotación de banners sponsors ---- */
  var sponsorSlides = document.querySelectorAll('.sponsors__slide');
  var sponsorDots   = document.querySelectorAll('.sponsors__dot');
  if (sponsorSlides.length > 1) {
    var spIdx = 0;
    var spTimer = null;

    function showSponsor(n) {
      sponsorSlides[spIdx].classList.remove('active');
      if (sponsorDots[spIdx]) { sponsorDots[spIdx].classList.remove('active'); sponsorDots[spIdx].setAttribute('aria-selected', 'false'); }
      spIdx = (n + sponsorSlides.length) % sponsorSlides.length;
      sponsorSlides[spIdx].classList.add('active');
      if (sponsorDots[spIdx]) { sponsorDots[spIdx].classList.add('active'); sponsorDots[spIdx].setAttribute('aria-selected', 'true'); }
    }

    function restartSponsor() {
      clearInterval(spTimer);
      spTimer = setInterval(function () { showSponsor(spIdx + 1); }, 6000);
    }

    sponsorDots.forEach(function (d, i) {
      d.addEventListener('click', function () { showSponsor(i); restartSponsor(); });
    });

    restartSponsor();
  }

  /* ---- Newsletter: feedback de envío ---- */
  var form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var inp = form.querySelector('input[type="email"]');
      if (!inp || !inp.value.trim()) return;
      var orig = btn.textContent;
      btn.textContent = '¡Listo!';
      btn.disabled = true;
      inp.value = '';
      setTimeout(function () { btn.textContent = orig; btn.disabled = false; }, 3500);
    });
  }

  /* ---- Scroll-reveal 3D (Shopify Editions) para cards de notas ---- */
  var cards3d = document.querySelectorAll('.card-3d');
  if (cards3d.length) {
    if (!prefersReduced && 'IntersectionObserver' in window) {
      var io3d = new IntersectionObserver(function (entries) {
        var batch = [];
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          batch.push(entry.target);
          io3d.unobserve(entry.target);
        });
        /* Stagger de 80ms entre cards que entran en el mismo tick */
        batch.forEach(function (el, i) {
          setTimeout(function () { el.classList.add('is-visible'); }, i * 80);
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -15% 0px' });

      cards3d.forEach(function (el) { io3d.observe(el); });
    } else {
      /* Sin animación: mostrar todas de inmediato */
      cards3d.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

})();
