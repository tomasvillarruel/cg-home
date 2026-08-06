(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Títulos de las cards de notas: máximo 110 caracteres (con espacios) ----
     No aplica al título del hero (.hero__title, .post-hero__title, .cat-hero__title).
     WP: implementar con un helper equivalente en el loop, ej.:

       function cg_trim_title($title, $max = 110) {
         if (mb_strlen($title) > $max) {
           return rtrim(mb_substr($title, 0, $max)) . '...';
         }
         return $title;
       }

       <?php echo esc_html(cg_trim_title(get_the_title())); ?>
  ---- */
  (function () {
    var MAX_TITLE_CHARS = 110;
    var titles = document.querySelectorAll(
      '.ed-main__title, .ed-row__title, .ed-card__title, ' +
      '.rec-row__title, .rec-product__title, ' +
      '.sidebar-list__title, .sidebar-ranking__title'
    );
    titles.forEach(function (el) {
      var text = el.textContent.trim();
      if (text.length > MAX_TITLE_CHARS) {
        el.setAttribute('title', text);
        el.textContent = text.slice(0, MAX_TITLE_CHARS).replace(/\s+$/, '') + '...';
      }
    });
  })();

  /* ---- Marquesina: distancia de scroll medida por JS ----
     El -50% por CSS depende de que las dos copias de .marquee-set midan
     exactamente lo mismo; cualquier redondeo de subpíxel entre ambas
     (típico con paddings en vw/clamp) provoca un salto visible al hacer
     el loop. Medimos el ancho real de la primera copia con getBoundingClientRect
     (subpíxel) y lo usamos como distancia fija de la animación. ---- */
  (function () {
    var bar = document.querySelector('.marquee-bar');
    var track = document.querySelector('.marquee-track');
    var firstSet = track && track.querySelector('.marquee-set:not([aria-hidden])');
    if (!bar || !track || !firstSet) return;

    /* Con solo 2 copias, en pantallas anchas el track (2x el ancho de una
       copia) puede ser más angosto que la barra: al desplazarse exactamente
       un ancho de copia, el contenido se termina antes de volver a tapar
       la pantalla y se ve un corte en blanco. Clonamos copias ocultas extra
       hasta que el track cubra de sobra el ancho visible. */
    function ensureCoverage() {
      var guard = 0;
      var setWidth = firstSet.getBoundingClientRect().width;
      if (setWidth <= 0) return;
      while (track.scrollWidth < bar.getBoundingClientRect().width * 2 + setWidth && guard < 20) {
        var clone = firstSet.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelectorAll('a').forEach(function (a) {
          var span = document.createElement('span');
          span.textContent = a.textContent;
          a.replaceWith(span);
        });
        track.appendChild(clone);
        guard++;
      }
    }

    function measure() {
      ensureCoverage();
      var w = firstSet.getBoundingClientRect().width;
      if (w > 0) track.style.setProperty('--marquee-distance', '-' + w + 'px');
      return w;
    }

    /* No arrancar la animación hasta que la tipografía real esté cargada:
       si arranca antes y la fuente hace swap (FOUT) mientras ya está en
       movimiento, el ancho cambia a mitad de vuelta y se ve como un salto/corte. */
    function start() {
      measure();
      track.classList.add('is-ready');
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(start);
    } else {
      start();
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 150);
    });

    /* El texto se mueve todo el tiempo: si el click depende de acertarle
       a una palabra en movimiento, casi siempre falla. Pausamos SOLO
       mientras el mouse está sobre una palabra puntual (no toda la barra),
       así se puede clickear con precisión sin que el resto del recorrido
       se sienta "trabado". */
    firstSet.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('mouseenter', function () { track.classList.add('is-paused'); });
      a.addEventListener('mouseleave', function () { track.classList.remove('is-paused'); });
      a.addEventListener('focus', function () { track.classList.add('is-paused'); });
      a.addEventListener('blur', function () { track.classList.remove('is-paused'); });
    });
  })();

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
    var nextItems = hero.querySelectorAll('.hero__next-item');
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
      nextItems.forEach(function (n, i) { n.classList.toggle('active', i === index); });
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
    nextItems.forEach(function (n, i) {
      n.addEventListener('click', function () { go(i); });
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

  /* ---- Carrusel del directorio (restaurantes más buscados) ---- */
  var dirTrack = document.getElementById('dir-track');
  if (dirTrack) {
    var dirArrows = document.querySelectorAll('.dir__arrow');

    function dirStep() {
      var card = dirTrack.querySelector('.dir__card');
      var gap = parseFloat(getComputedStyle(dirTrack).columnGap) || 0;
      return card ? card.getBoundingClientRect().width + gap : 300;
    }

    function dirUpdateArrows() {
      var max = dirTrack.scrollWidth - dirTrack.clientWidth - 2;
      dirArrows.forEach(function (a) {
        var dir = parseInt(a.dataset.dir, 10);
        a.disabled = dir < 0 ? dirTrack.scrollLeft <= 0 : dirTrack.scrollLeft >= max;
      });
    }

    dirArrows.forEach(function (a) {
      a.addEventListener('click', function () {
        dirTrack.scrollBy({ left: dirStep() * parseInt(a.dataset.dir, 10), behavior: 'smooth' });
      });
    });

    dirTrack.addEventListener('scroll', dirUpdateArrows, { passive: true });
    window.addEventListener('resize', dirUpdateArrows);
    dirUpdateArrows();
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
