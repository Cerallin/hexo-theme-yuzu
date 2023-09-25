exports.default = function itemWidget(item) {
  const widgetName = item.widget.toLowerCase();

  return this.partial('_widget/' + widgetName, {
    category: item.name,
    cat_link: item.link,
    showNum: item.show_num || 3,
  });
}
