(function () {
  "use strict";

  var Theme = {};

  Theme.backToTop = {
    register: function () {
      var $backToTop = $('#back-top');

      $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
          $backToTop.fadeIn(1000);
        } else {
          $backToTop.fadeOut(1000);
        }
      });

      $backToTop.click(function () {
        $('body,html').animate({
          scrollTop: 0
        });
      });
    }
  };

  Theme.showHeadBar = {
    register: function () {
      const navToggle = document.getElementById('barWrap-toggle');
      navToggle.addEventListener('click', () => {
        let aboutContent = document.getElementById('barShow')
        if (!aboutContent.classList.contains('barShow')) {
          aboutContent.classList.add('barShow');
          aboutContent.classList.remove('barShow-hide');
        } else {
          aboutContent.classList.add('barShow-hide');
          aboutContent.classList.remove('barShow');
        }
      })
    }
  }

  this.Theme = Theme;
}.call(this));