(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(max-width: 860px), (pointer: coarse)').matches;
  var Purelane = {};

  // Keep track of active timers/observers to prevent memory leaks in the Theme Editor
  var heroIntervals = {};
  var rotatorIntervals = {};
  var revealObservers = [];

  /* ---------- REVEAL ON SCROLL ---------- */
  Purelane.initScrollReveal = function () {
    var revs = document.querySelectorAll('.rv');
    // Disconnect any previous reveal observers to avoid duplicate observers
    if (revealObservers && revealObservers.length) {
      revealObservers.forEach(function (o) { try { o.disconnect(); } catch (e) {} });
      revealObservers = [];
    }
    if ('IntersectionObserver' in window && !reduce) {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            ro.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
      revs.forEach(function (el) { ro.observe(el); });
      revealObservers.push(ro);
    } else {
      revs.forEach(function (el) { el.classList.add('in'); });
    }
  };

  /* ---------- SCENE CROSSFADE (SCROLL DRIVEN) ---------- */
  var currentScene = 0;
  var scenes = [];
  var zones = [];
  var stage = null;

  Purelane.initSceneFading = function () {
    scenes = [].slice.call(document.querySelectorAll('.scene'));
    zones = [].slice.call(document.querySelectorAll('[data-scene]'));
    stage = document.getElementById('scenes');
    Purelane.pickScene();
  };

  Purelane.setScene = function (n) {
    if (n === currentScene) return;
    currentScene = n;
    scenes.forEach(function (s, i) { 
      s.classList.toggle('on', i + 1 === n); 
    });
    if (stage) stage.setAttribute('data-d', String(n));
  };

  Purelane.pickScene = function () {
    if (!zones.length) return;
    var focus = window.scrollY + window.innerHeight * 0.5;
    var n = 1;
    for (var i = 0; i < zones.length; i++) {
      var z = zones[i];
      var top = 0;
      var el = z;
      while (el) { 
        top += el.offsetTop; 
        el = el.offsetParent; 
      }
      if (top <= focus) {
        n = parseInt(z.getAttribute('data-scene'), 10) || n;
      }
    }
    Purelane.setScene(n);
  };

  /* ---------- PROGRESS RAIL SYNC ---------- */
  var railLinks = [];
  var targets = [];

  Purelane.initProgressRail = function () {
    railLinks = [].slice.call(document.querySelectorAll('.rail a'));
    targets = railLinks.map(function (a) { 
      return document.querySelector(a.getAttribute('href')); 
    });
    Purelane.syncRail();
  };

  Purelane.syncRail = function () {
    if (!targets.length) return;
    var mid = window.scrollY + window.innerHeight * 0.42;
    var idx = 0;
    targets.forEach(function (t, i) { 
      if (t && t.offsetTop <= mid) idx = i; 
    });
    railLinks.forEach(function (a, i) { 
      a.classList.toggle('on', i === idx); 
    });
  };

  /* ---------- PARALLAX & HEADER ---------- */
  var hdr = null;
  var prod = null;
  var raf = null;
  var mx = 0;
  var my = 0;
  var mouseMoveHandler = null;

  Purelane.initParallax = function () {
    hdr = document.getElementById('hdr');
    prod = document.getElementById('heroProd');
    if (reduce) {
      if (hdr) hdr.classList.remove('up');
      if (prod) {
        prod.style.transform = '';
        prod.style.opacity = '';
      }
      return;
    }
    Purelane.runParallaxFrame();
  };

  Purelane.runParallaxFrame = function () {
    raf = null;
    if (reduce) return;
    var y = window.scrollY || window.pageYOffset;
    
    // Toggle header style when scrolled
    if (hdr) hdr.classList.toggle('up', y > 90);
    
    if (!reduce) {
      // Water layer drifting
      var wl = document.querySelectorAll('#water .wl');
      for (var i = 0; i < wl.length; i++) {
        var d = [0.05, 0.09, 0.03, 0.02][i] || 0.05;
        wl[i].style.setProperty('--px', (mx * d * 130).toFixed(1) + 'px');
        wl[i].style.setProperty('--py', (-y * d + my * d * 90).toFixed(1) + 'px');
      }
      
      // Hero product parallax
      if (prod) {
        var f = Math.min(y / 700, 1);
        prod.style.transform = 'translate3d(' + (mx * -16).toFixed(2) + 'px,' + (-f * 54 + my * -10).toFixed(2) + 'px,0) scale(' + (1 - f * 0.06).toFixed(3) + ')';
        prod.style.opacity = (1 - f * 0.55).toFixed(3);
      }
    }
    
    Purelane.syncRail();
    Purelane.pickScene();
  };

  Purelane.onScroll = function () {
    if (reduce) return;
    if (!raf) raf = requestAnimationFrame(Purelane.runParallaxFrame);
  };

  /* ---------- HERO CAROUSEL ---------- */
  Purelane.initHeroCarousel = function (container) {
    if (reduce) return;
    var c = container || document;
    var hstage = c.querySelector('#hstage');
    var sectionId = container ? container.getAttribute('id') : 'global';
    
    // Clean up previous interval if it exists
    if (heroIntervals[sectionId]) {
      clearInterval(heroIntervals[sectionId]);
      delete heroIntervals[sectionId];
    }

    if (hstage) {
      var hs = [].slice.call(hstage.querySelectorAll('.hslide'));
      var hd = [].slice.call(c.querySelectorAll('#hdots button'));
      if (!hs.length) return;
      
      var hi = 0;
      var htimer = null;

      function hgo(n) {
        hi = (n + hs.length) % hs.length;
        hs.forEach(function (s, i) { 
          s.classList.toggle('on', i === hi); 
        });
        hd.forEach(function (d, i) { 
          d.classList.toggle('on', i === hi); 
        });
      }

      function hplay() {
        if (!htimer && !reduce) {
          htimer = setInterval(function () { 
            hgo(hi + 1); 
          }, 3800);
          heroIntervals[sectionId] = htimer;
        }
      }

      function hstop() {
        if (htimer) {
          clearInterval(htimer);
          htimer = null;
          delete heroIntervals[sectionId];
        }
      }

      // Dot click events
      hd.forEach(function (d, i) {
        // Remove existing listener if re-initializing
        var newDot = d.cloneNode(true);
        d.parentNode.replaceChild(newDot, d);
        hd[i] = newDot;
        newDot.addEventListener('click', function () {
          hstop();
          hgo(i);
          hplay();
        });
      });

      hstage.addEventListener('mouseenter', hstop);
      hstage.addEventListener('mouseleave', hplay);

      if ('IntersectionObserver' in window) {
        var carouselObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            entry.isIntersecting ? hplay() : hstop();
          });
        }, { threshold: 0.2 });
        carouselObserver.observe(hstage);
      } else {
        hplay();
      }
    }
  };

  /* ---------- PRODUCT ROTATOR ---------- */
  Purelane.initProductRotator = function (container) {
    if (reduce) return;
    var c = container || document;
    var rot = c.querySelector('#rot');
    var sectionId = container ? container.getAttribute('id') : 'global';

    if (rot) {
      var rimgs = [].slice.call(rot.querySelectorAll('.frame .pimg'));
      var rdots = [].slice.call(rot.querySelectorAll('.dots i'));
      var rcapB = rot.querySelector('.cap b');
      var rcapS = rot.querySelector('.cap span');
      if (!rimgs.length) return;

      // Clean up previous interval
      if (rotatorIntervals[sectionId]) {
        clearInterval(rotatorIntervals[sectionId]);
        delete rotatorIntervals[sectionId];
      }

      var ri = 0;
      var rtimer = null;

      function rstep() {
        rimgs[ri].classList.remove('on');
        if (rdots[ri]) rdots[ri].classList.remove('on');
        ri = (ri + 1) % rimgs.length;
        rimgs[ri].classList.add('on');
        if (rdots[ri]) rdots[ri].classList.add('on');
        if (rcapB) rcapB.innerHTML = rimgs[ri].getAttribute('data-name') || '';
        if (rcapS) rcapS.textContent = rimgs[ri].getAttribute('data-note') || '';
      }

      if (!reduce) {
        var rotatorObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !rtimer) {
              rtimer = setInterval(rstep, 2900);
              rotatorIntervals[sectionId] = rtimer;
            } else if (!entry.isIntersecting && rtimer) {
              clearInterval(rtimer);
              rtimer = null;
              delete rotatorIntervals[sectionId];
            }
          });
        }, { threshold: 0.25 });
        rotatorObserver.observe(rot);
      }
    }
  };

  /* ---------- AMBIENT HERO DRIFT ---------- */
  Purelane.initHeroDrift = function () {
    var prod = document.getElementById('heroProd');
    if (!reduce && prod && typeof prod.animate === 'function') {
      prod.animate(
        [
          { filter: 'drop-shadow(0 14px 22px rgba(0,74,66,.15))' },
          { filter: 'drop-shadow(0 20px 30px rgba(0,74,66,.22))' },
          { filter: 'drop-shadow(0 14px 22px rgba(0,74,66,.15))' }
        ],
        { duration: 7000, iterations: Infinity, easing: 'ease-in-out' }
      );
    }
  };

  /* ---------- GLOBAL INITIALIZATION ---------- */
  Purelane.initAll = function () {
    Purelane.initScrollReveal();
    Purelane.initSceneFading();
    Purelane.initProgressRail();
    Purelane.initParallax();
    Purelane.initHeroCarousel();
    Purelane.initProductRotator();
    Purelane.initHeroDrift();

    // Mobile Burger Menu Toggle
    var burger = document.querySelector('.burger');
    var headerEl = document.getElementById('hdr');
    if (burger && headerEl) {
      var newBurger = burger.cloneNode(true);
      burger.parentNode.replaceChild(newBurger, burger);
      
      newBurger.addEventListener('click', function () {
        headerEl.classList.toggle('nav-open');
      });
      
      var navLinks = headerEl.querySelectorAll('.nav a');
      navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          headerEl.classList.remove('nav-open');
        });
      });
    }

    // Listeners
    window.removeEventListener('scroll', Purelane.onScroll);
    window.addEventListener('scroll', Purelane.onScroll, { passive: true });
    
    window.removeEventListener('resize', Purelane.onScroll);
    window.addEventListener('resize', Purelane.onScroll);

    if (!reduce && window.matchMedia('(min-width: 1024px)').matches) {
      if (!mouseMoveHandler) {
        mouseMoveHandler = function (e) {
          mx = (e.clientX / window.innerWidth - 0.5) * 2;
          my = (e.clientY / window.innerHeight - 0.5) * 2;
          Purelane.onScroll();
        };
      } else {
        window.removeEventListener('mousemove', mouseMoveHandler);
      }
      window.addEventListener('mousemove', mouseMoveHandler, { passive: true });
    }
  };

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', Purelane.initAll);
  } else {
    Purelane.initAll();
  }

  /* ---------- SHOPIFY CUSTOMIZER EVENT HANDLERS ---------- */
  document.addEventListener('shopify:section:load', function (event) {
    var container = event.target;
    var sectionId = event.detail.sectionId;

    // Re-initialize Hero Slider if this section was loaded
    if (container.classList.contains('section-purelane-hero') || container.querySelector('.hero')) {
      Purelane.initHeroCarousel(container);
      Purelane.initHeroDrift();
    }

    // Re-initialize Product Rotator if this section was loaded
    if (container.querySelector('#rot')) {
      Purelane.initProductRotator(container);
    }

    // Always re-run global observers & highlights on customizer load
    Purelane.initScrollReveal();
    Purelane.initProgressRail();
    Purelane.initSceneFading();
    Purelane.initParallax();
  });

  document.addEventListener('shopify:section:unload', function (event) {
    var sectionId = event.detail.sectionId;
    
    // Clean up timers to prevent memory leaks in Theme Customizer
    if (heroIntervals[sectionId]) {
      clearInterval(heroIntervals[sectionId]);
      delete heroIntervals[sectionId];
    }
    if (rotatorIntervals[sectionId]) {
      clearInterval(rotatorIntervals[sectionId]);
      delete rotatorIntervals[sectionId];
    }
    // Remove global mousemove handler if present to avoid duplicate listeners
    try { window.removeEventListener('mousemove', mouseMoveHandler); } catch (e) {}
    // Disconnect reveal observers
    if (revealObservers && revealObservers.length) {
      revealObservers.forEach(function (o) { try { o.disconnect(); } catch (e) {} });
      revealObservers = [];
    }
  });

  // Export to window in case sections need to trigger actions manually
  window.Purelane = Purelane;
})();
