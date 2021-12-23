window.onload = function () {
  Theme.backToTop.register();
  Theme.showHeadBar.register();
  Theme.clipboard.register();

  [].forEach.call(document.getElementsByClassName('loading-wrapper'),
    element => {
      element.style.display = 'none';
    });

  [].forEach.call(document.getElementsByClassName('page'),
    element => {
      element.style.filter = 'none';
    });
};
