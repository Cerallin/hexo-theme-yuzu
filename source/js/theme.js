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

  Theme.search = {
    meta: [],
    watcher: {},
    register: function () {
      const resultCount = document.getElementById('search-count-num')
      const resultBox = document.getElementById('search-result')
      this.watcher = {
        _resultList: [],
        get list() {
          return this._resultList;
        },
        set list(newValue) {
          this._resultList = newValue;
          // update result count
          resultCount.innerText = this.length;
          // update result box
          resultBox.innerHTML = this._resultList.map(function (item) {
            const { title, categories, tags, url } = item;
            return [
              `<a class="search-result-item" href="${url}">`,
              `  <div class="search-result-title">${title}</div>`,
              '  <div class="search-result-tags">',
              (tags || []).map(tag => `<span>${tag}</span>`).join(''),
              '  </div>',
              '</a>',
            ].map(s => s.trim()).join('');
          }).join('');
        },
        get length() {
          return this._resultList.length;
        },
      };

      const modal = document.getElementById('search-modal');
      this.registerSearchButton(modal);
      this.registerSearchBox(modal);
    },
    registerSearchButton(modal) {
      document
        .getElementById("search")
        .addEventListener('click', function () {
          // show modal
          modal.setAttribute('data-show', "true");
          // filter page
          [].forEach.call(document.getElementsByClassName('page'),
            element => {
              element.setAttribute('data-filter', 'true');
            });
        })
    },
    registerSearchBox(modal) {
      // close button
      [].forEach.call(document.getElementsByClassName('close-button'),
        function (button) {
          button.addEventListener('click', () => {
            // hide modal
            modal.setAttribute('data-show', "false");
            // no filter
            [].forEach.call(document.getElementsByClassName('page'),
              element => {
                element.setAttribute('data-filter', 'false');
              });
          })
        });
      // search listeners
      const searchFunc = debounce(() => this.filterResults(), 200);
      // listen input
      const inputElement = document.getElementById('search-input')
      // inputElement.addEventListener('keyup',
      //   ({ key }) => (key === "Enter") && searchFunc())
      inputElement
        .addEventListener('input', searchFunc);
      // search button
      document.getElementById('search-button')
        .addEventListener('click', searchFunc)
    },
    fetchMeta() {
      if (!this.meta.length) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', window.url_root + 'meta.json', false);
        xhr.send();
        if (xhr.status !== 200) {
          // TODO handle error
        }
        this.meta = JSON.parse(xhr.responseText);
      }
      return this.meta;
    },
    filterResults() {
      // split keywords by spaces
      const keywords = document.getElementById('search-input').value;
      if (!keywords) {
        this.watcher.list = [];
        return;
      }
      const regex = new RegExp(keywords.split(/\s+/).join('|'), 'i')
      // items matched
      const items = this.fetchMeta().filter(function (item) {
        return (
          (item.title || '').match(regex) ||
          (item.categories || []).find(str => str.match(regex)) ||
          (item.tags || []).find(str => str.match(regex)) ||
          (item.url || '').match(regex)
        );
      })
      this.watcher.list = items;
    },
  };

  this.Theme = Theme;
}.call(this));
