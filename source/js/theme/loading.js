(function () {
  "use strict";

  Theme.loading = {
    register: function () {
      document.getElementsByClassName('loading-wrapper')
        .forEach(element => element.removeAttribute('data-loading'));
      document.getElementsByClassName('page')
        .forEach(element => element.removeAttribute('data-filter'));
    }
  };
}.call(this));
