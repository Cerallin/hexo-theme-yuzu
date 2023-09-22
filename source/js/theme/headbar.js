(function () {
  "use strict";

  const button = document.getElementById('bar-wrap-toggle');
  const bar = document.getElementById('menu-bar');

  Theme.headBar = {
    register: function () {
      button.addEventListener('click', function () {
        if (bar.getAttribute('data-show'))
          bar.removeAttribute('data-show')
        else
          bar.setAttribute('data-show', true);
      })
    }
  };
}.call(this));
