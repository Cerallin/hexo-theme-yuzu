(function () {
  "use strict";

  Theme.smoothCorners = {
    register: function () {
      if (CSS && 'paintWorklet' in CSS)
        CSS.paintWorklet.addModule(
          window.config.url_root + 'js/smooth-corners.js');
    }
  };
}.call(this));
