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
    register() {
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
              `<a class="search-result-item" href="${url}" target="_blank">`,
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
    closeSearchModal(modal) {
      return function () {
        // hide modal
        modal.setAttribute('data-show', "false");
        // no filter
        [].forEach.call(document.getElementsByClassName('page'),
          element => {
            element.setAttribute('data-filter', 'false');
          });
        // enable body scroll
        if (window.innerWidth <= 768)
          document.body.style.overflow = "auto";
      }
    },
    openSearchModal(modal) {
      const inputElement = document.getElementById('search-input');
      return function () {
        // show modal
        modal.setAttribute('data-show', "true");
        // filter page
        [].forEach.call(document.getElementsByClassName('page'),
          element => {
            element.setAttribute('data-filter', 'true');
          });
        // set focus
        inputElement.focus();
        // disable body scroll
        if (window.innerWidth <= 768)
          document.body.style.overflow = "hidden";
      }
    },
    registerSearchButton(modal) {
      [].forEach.call(document.getElementsByClassName("search-button"),
        button =>
          button.addEventListener('click', this.openSearchModal(modal)));
    },
    registerSearchBox(modal) {
      const closeModal = this.closeSearchModal(modal);
      // close button
      [].forEach.call(document.getElementsByClassName('close-button'),
        button => button.addEventListener('click', closeModal));
      // search listeners
      const searchFunc = debounce(() => this.filterResults(), 200);
      // listen input
      const inputElement = document.getElementById('search-input');
      inputElement.addEventListener('keyup',
        ({ key }) => {
          if (key === "Enter") searchFunc();
          else if (key === "Escape") closeModal();
        })
      inputElement
        .addEventListener('input', searchFunc);
      // search button
      document.getElementById('search-button')
        .addEventListener('click', searchFunc)
    },
    async fetchMeta() {
      if (!this.meta.length) {
        const config = window.config;
        const response = await fetch(config.url_root + config.meta_path);
        if (response.status === 404)
          throw Error('Search meta file not found. Please install hexo-search-generator first.');
        else if (response.status !== 200)
          throw Error(`Failed fetching search meta, got status ${response.status}`);

        const contentType = response.headers.get('content-type');
        if (contentType.includes('application/json'))
          this.meta = await response.json();
        else
          throw TypeError(`Unsupported content type: ${contentType}, use json instead.`);
      }
      return this.meta;
    },
    filterResults() {
      // split keywords by spaces
      const keywords = document.getElementById('search-input').value.trim();
      if (!keywords) {
        this.watcher.list = [];
        return;
      }
      const regex = new RegExp(keywords.split(/\s+/).join('|'), 'ig')
      this.fetchMeta()
        .then(data => {
          // deep clone
          const meta = structuredClone(data);
          // items matched
          const items = meta.map(function (item) {
            var matchResult;
            item.matchCount = 0;

            function insertHighlight(str) {
              return str.replace(regex,
                match => `<span class="highlight">${match}</span>`);
            }

            if (matchResult = (item.title || '').match(regex)) {
              item.matchCount += matchResult.length;
              item.title = insertHighlight(item.title);
            }

            if ((item.categories || []).find(str => str.match(regex))) {
              item.matchCount += item.categories
                .reduce((sum, item) => sum + (item.match(regex) || []).length, 0);
              item.categories = item.categories.map(insertHighlight);
            }

            if ((item.tags || []).find(str => str.match(regex))) {
              item.matchCount += item.tags
                .reduce((sum, item) => sum + (item.match(regex) || []).length, 0);
              item.tags = item.tags.map(insertHighlight);
            }

            return item;
          })
            .filter(item => item.matchCount > 0)
            .sort((a, b) => (b.matchCount - a.matchCount));

          this.watcher.list = items;
        })
        .catch(err => {
          console.error(err);
        })
    },
  };

  this.Theme = Theme;
}.call(this));
