(function () {
  "use strict";

  function ResultWatcher() {
    const resultCount = document.getElementById('search-count-num');
    const resultBox = document.getElementById('search-result');

    return {
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
          const { title, tags, url } = item;
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
  }

  Theme.search = new function () {
    let meta = [];
    let watcher = {};

    this.register = function () {
      const modal = document.getElementById('search-modal');
      registerSearchButton(modal);
      registerSearchBox(modal);
      watcher = new ResultWatcher();
    };

    function closeSearchModal(modal) {
      return function () {
        // hide modal
        modal.removeAttribute('data-show');
        // no filter
        document.getElementsByClassName('page')
          .forEach(element => element.removeAttribute('data-filter'));
        // enable body scroll
        if (window.innerWidth <= 768)
          document.body.style.overflow = "auto";
      }
    };

    function openSearchModal(modal) {
      const inputElement = document.getElementById('search-input');
      return function () {
        // show modal
        modal.setAttribute('data-show', true);
        // filter page
        document.getElementsByClassName('page').forEach(
          element => element.setAttribute('data-filter', true));
        // set focus
        inputElement.focus();
        // disable body scroll
        if (window.innerWidth <= 768)
          document.body.style.overflow = "hidden";
      }
    };

    function registerSearchButton(modal) {
      document.getElementsByClassName("search-button")
        .forEach(button =>
          button.addEventListener('click', openSearchModal(modal)));
    };

    function registerSearchBox(modal) {
      const closeModal = closeSearchModal(modal);
      // close button
      document.getElementsByClassName('close-button')
        .forEach(button => button.addEventListener('click', closeModal));
      // search listeners
      const searchFunc = debounce(() => filterResults(), 200);
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
    };
    async function fetchMeta() {
      if (!meta.length) {
        const config = window.config;
        const response = await fetch(config.url_root + config.meta_path);
        if (response.status === 404)
          throw Error('Search meta file not found. Please install hexo-search-generator first.');
        else if (response.status !== 200)
          throw Error(`Failed fetching search meta, got status ${response.status}`);

        const contentType = response.headers.get('content-type');
        if (contentType.includes('application/json'))
          meta = await response.json();
        else
          throw TypeError(`Unsupported content type: ${contentType}, use json instead.`);
      }
      return meta;
    };
    function filterResults() {
      // split keywords by spaces
      const keywords = document.getElementById('search-input').value.trim();
      if (!keywords) {
        watcher.list = [];
        return;
      }
      const regex = new RegExp(keywords.split(/\s+/).join('|'), 'ig')
      fetchMeta()
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

          watcher.list = items;
        })
        .catch(err => {
          console.error(err);
        })
    }
  };
}.call(this));
