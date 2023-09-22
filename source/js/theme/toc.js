(function () {
  "use strict";

  Theme.toc = {
    register() {
      const tocWrapper = document.getElementById('post-toc');
      const sections = document.querySelectorAll('article h3[id], article h4[id], article h5[id]');

      // scroll title to the middle of toc wrapper, and deactivate all the titles
      function scrollToMiddle(node) {
        const firstChild = node.firstElementChild;
        // if the node contains a title and a list of subtitles, take the title instead
        if (firstChild && firstChild.tagName === 'A')
          node = firstChild;
        // scroll the tocWrapper to middle
        const scrollTop = node.offsetTop - (tocWrapper.clientHeight - node.clientHeight) / 2;
        tocWrapper.scrollTop = scrollTop;
        // reset all "data-actives"
        sections.map(function (item) {
          const id = item.getAttribute('id');
          const parentNode = document.querySelector(
            `.post-toc-item a[href="#${encodeURIComponent(id)}"]`)
            .parentNode;
          parentNode.removeAttribute('data-active');
        })
      }

      // Track all sections
      const observer = new IntersectionObserver(debounce(function (entries) {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('id');
          const parentNode = document.querySelector(
            `.post-toc-item a[href="#${encodeURIComponent(id)}"]`)
            .parentNode;

          if (entry.intersectionRatio > 0) {
            scrollToMiddle(parentNode);
            parentNode.setAttribute('data-active', true);
          } else {
            parentNode.removeAttribute('data-active');
          }
        })
      }, 100));
      sections.forEach((section) => observer.observe(section));
    }
  };
}.call(this));
