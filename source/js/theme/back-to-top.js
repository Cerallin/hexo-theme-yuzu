(function () {
  "use strict";

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
}.call(this));
