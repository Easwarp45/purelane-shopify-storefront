(function(){
  'use strict';
  // Back to top button
  var btn = document.getElementById('BackToTop');
  if (!btn) return;

  function updateBtn() {
    if (window.scrollY > window.innerHeight) btn.classList.add('on'); else btn.classList.remove('on');
  }

  btn.addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    btn.blur();
  });

  window.addEventListener('scroll', updateBtn, { passive: true });
  document.addEventListener('DOMContentLoaded', updateBtn);
})();
