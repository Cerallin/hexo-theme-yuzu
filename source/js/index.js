$(document).ready(function () {
  Theme.backToTop.register();
  Theme.showHeadBar.register();

  $(".loading-wrapper").each((i, ele) => {
    ele.style.display = 'none';
  })

  $(".page").each((i, ele) => {
    $(ele).css("filter", 'none')
  })
});