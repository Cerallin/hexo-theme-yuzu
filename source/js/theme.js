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
      document.getElementById('barWrap-toggle')
        .addEventListener('click', () => {
          let bar = document.getElementById('barShow')

          if (!bar.classList.contains('barShow')) {
            bar.classList.add('barShow');
            bar.classList.remove('barShow-hide');
          }
          else {
            bar.classList.add('barShow-hide');
            bar.classList.remove('barShow');
          }
        })
    }
  }

  this.Theme = Theme;
}.call(this));
