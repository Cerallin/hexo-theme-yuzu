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
      document.getElementsByClassName('highlight').forEach(
        function (element) {
          const hasCaption = element.childNodes[0].tagName === 'FIGCAPTION';
          if (hasCaption) {
            const button = document.createElement('a');
            button.innerText = 'copy';
            button.setAttribute('data-clipboard-text',
              element.querySelector(':scope .code > pre').innerText);
            button.classList.add('clipboard-btn');
            const caption = element.childNodes[0];
            const nodeList = caption.childNodes;
            const lastNode = nodeList[nodeList.length - 1];
            caption.insertBefore(button, lastNode);
          } else {
            const icon = document.createElement('i');
            const button = document.createElement('div');

            icon.classList.add('icon');

            button.appendChild(icon);
            button.classList.add('clipboard-btn');
            button.setAttribute('data-clipboard-text',
              element.querySelector(':scope .code > pre').innerText);

            element.appendChild(button);
          }

        }
      )
    }
  };
}.call(this));
