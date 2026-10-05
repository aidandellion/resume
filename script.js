(function () {
  var PAGE_W = 816;
  var stage = document.getElementById('stage');
  var stack = document.getElementById('stack');
  var scale = 1, mode = 'fit';

  function fitScale() {
    var avail = document.documentElement.clientWidth - 24;
    return Math.max(0.3, Math.min(1.5, avail / PAGE_W));
  }

  function apply() {
    if (mode === 'fit') scale = fitScale();
    stack.style.transform = 'scale(' + scale + ')';
    stage.style.width = PAGE_W * scale + 'px';
    stage.style.height = stack.offsetHeight * scale + 'px';
  }

  function zoom(delta) {
    mode = 'manual';
    scale = Math.min(3, Math.max(0.3, scale + delta));
    apply();
  }

  document.getElementById('fit').onclick = function () { mode = 'fit'; apply(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  document.getElementById('zoomIn').onclick = function () { zoom(0.25); };
  document.getElementById('zoomOut').onclick = function () { zoom(-0.25); };
  window.addEventListener('resize', function () { if (mode === 'fit') apply(); });

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(apply);
  apply();
})();
