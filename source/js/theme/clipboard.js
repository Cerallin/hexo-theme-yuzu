(function () {
  "use strict";

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

          element.appendChild(btn);
        }
      )
    }
  };
}.call(this));
