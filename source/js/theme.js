(function () {
  "use strict";

  var Theme = {};

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

      // Clipboard instance
      let clipboard = new ClipboardJS('.clipboard-btn');
      // On success
      clipboard.on('success', debounce(function (e) {
        (function (ele) {
          // show checked icon
          ele.firstChild.classList.remove('icon-clipboard');
          ele.firstChild.classList.add('icon-clipboard-check');

          // restore icon, delayed for 1s
          setTimeout(() => {
            ele.firstChild.classList.remove('icon-clipboard-check');
            ele.firstChild.classList.add('icon-clipboard');
          }, 1000)
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

          i.classList.add('icon', 'icon-clipboard');

          btn.appendChild(i);
          btn.classList.add('clipboard-btn');
          btn.setAttribute('data-clipboard-text',
            element.querySelector(':scope .code > pre').innerText);

          element.firstChild.appendChild(btn);
        }
      )
    }
  };

  this.Theme = Theme;
}.call(this));
