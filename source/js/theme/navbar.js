(function () {
  "use strict";

  const navbar = document.getElementsByClassName('head')[0];
  const menubar = document.getElementById('menu-bar');

  function getScrollTop() {
    var scroll_top = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      scroll_top = document.documentElement.scrollTop;
    }
    else if (document.body) {
      scroll_top = document.body.scrollTop;
    }
    return scroll_top;
  }

  Theme.navbar = {
    register() {
      let scrollHeight = getScrollTop();

      document.addEventListener('scroll', debounce(function () {
        let newScrollTop = getScrollTop();
        if (!menubar.getAttribute('data-show')) {
          if (scrollHeight + 50 > newScrollTop)
            navbar.setAttribute('data-show', 'true');
          scrollHeight = newScrollTop;
        }
      }, 100));
    },
    registerButton() {
      const toggleButton = document.getElementById('bar-wrap-toggle');
      toggleButton.addEventListener('click', function () {
        if (bar.getAttribute('data-show'))
          bar.removeAttribute('data-show')
        else
          bar.setAttribute('data-show', true);
      })
    }
  };
}.call(this));
