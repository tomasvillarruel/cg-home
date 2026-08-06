(function () {
  'use strict';

  /* ---- Barra de progreso de lectura ---- */
  var progressBar = document.getElementById('readProgressBar');
  var articleBody = document.getElementById('article-body');

  if (progressBar && articleBody) {
    var updateProgress = function () {
      var rect    = articleBody.getBoundingClientRect();
      var total   = rect.height - window.innerHeight;
      var scrolled = Math.max(0, -rect.top);
      var pct     = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
      progressBar.style.width = pct.toFixed(1) + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ---- Botón Volver Arriba ---- */
  var backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', function () {
      backBtn.classList.toggle('is-visible', window.scrollY > 480);
    }, { passive: true });
    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Helper: copiar al portapapeles ---- */
  function setupCopyBtn(btnId, labelId) {
    var btn   = document.getElementById(btnId);
    var label = labelId ? document.getElementById(labelId) : null;
    if (!btn) return;
    btn.addEventListener('click', function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(window.location.href).then(function () {
        var orig = label ? label.textContent : null;
        if (label) label.textContent = '¡Copiado!';
        btn.setAttribute('aria-label', '¡Copiado!');
        setTimeout(function () {
          if (label && orig) label.textContent = orig;
          btn.setAttribute('aria-label', 'Copiar enlace');
        }, 2400);
      });
    });
  }

  setupCopyBtn('copyHeaderBtn', null);

  /* ---- Lazy loading de imágenes del cuerpo ---- */
  if ('IntersectionObserver' in window) {
    var lazyImgs = document.querySelectorAll(
      '.post-body img[loading="lazy"], .post-figure img[loading="lazy"], ' +
      '.sidebar-list__img img, .sidebar-ranking__img img'
    );
    var imgObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var img = entry.target;
        if (img.dataset.src) img.src = img.dataset.src;
        imgObs.unobserve(img);
      });
    }, { rootMargin: '300px 0px' });
    lazyImgs.forEach(function (img) { imgObs.observe(img); });
  }

  /* ---- Newsletter sidebar ---- */
  var sidebarForm = document.getElementById('sidebar-newsletter-form');
  if (sidebarForm) {
    sidebarForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = sidebarForm.querySelector('button[type="submit"]');
      var inp = sidebarForm.querySelector('input[type="email"]');
      if (!inp || !inp.value.trim()) return;
      var orig = btn.textContent;
      btn.textContent = '¡Listo!';
      btn.disabled = true;
      inp.value = '';
      setTimeout(function () { btn.textContent = orig; btn.disabled = false; }, 3500);
    });
  }

})();
