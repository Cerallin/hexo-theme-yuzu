window.onload = function () {
  Theme.backToTop.register();
  Theme.showHeadBar.register();
  Theme.clipboard.register();
  Theme.navbar.register();

  [].forEach.call(document.getElementsByClassName('loading-wrapper'),
    element => {
      element.setAttribute('data-loading', 'false');
    });

  [].forEach.call(document.getElementsByClassName('page'),
    element => {
      element.setAttribute('data-filter', 'false');
    });
};
