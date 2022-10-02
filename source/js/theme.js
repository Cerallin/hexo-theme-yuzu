(function () {
  "use strict";

  // Debounce based on timer
  function debounce(fun, delay = 500) {
    return function (...args) {
      let that = this,
        _args = args;
      clearTimeout(fun.id)
      fun.id = setTimeout(function () {
        fun.call(that, ..._args)
      }, delay)
    }
  }

  var Theme = new Object;

  Theme.backToTop = {
    register: function () {
      document.getElementById('back-top')
        .addEventListener('click', () => {
          window.scroll({
            top: 0,
            behavior: "smooth"
          });
        });
    }
  };

  Theme.showHeadBar = {
    register: function () {
      document.getElementById('bar-wrap-toggle')
        .addEventListener('click', () => {
          let bar = document.getElementById('menu-bar');
          bar.setAttribute('data-show', !(bar.getAttribute('data-show') == "true"));
        })
    }
  };

  Theme.clipboard = {
    register: function () {
      // Clipboard instance
      let clipboard = new ClipboardJS('.clipboard-btn');
      // On success
      clipboard.on('success', debounce(function (e) {
        (function (ele) {
          // show checked icon
          ele.setAttribute('data-clicked', true);

          // restore icon, delayed for 1s
          setTimeout(() =>
            ele.setAttribute('data-clicked', false), 1000)
        })(e.trigger);

        e.clearSelection();
      }, 200));

      // On error
      clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
      });

      // Insert clipboard icons to code blocks
      [].forEach.call(
        document.getElementsByClassName('highlight'),
        element => {
          let i = document.createElement('i'),
            btn = document.createElement('div');

          i.classList.add('icon');

          btn.appendChild(i);
          btn.classList.add('clipboard-btn');
          btn.setAttribute('data-clipboard-text',
            element.querySelector(':scope .code > pre').innerText);

          element.firstChild.appendChild(btn);
        }
      )
    }
  };

  Theme.navbar = {
    register: function () {
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

      let scrollHeight = getScrollTop();
      let navbar = document.getElementsByClassName('head')[0];
      let menubar = document.getElementById('menu-bar');

      document.addEventListener('scroll', debounce(function () {
        let newScrollTop = getScrollTop();
        if (menubar.getAttribute('data-show') != "true") {
          navbar.setAttribute('data-show', scrollHeight + 50 > newScrollTop);
          scrollHeight = newScrollTop;
        }
      }, 100));
    }
  };

  this.Theme = Theme;
}.call(this));
