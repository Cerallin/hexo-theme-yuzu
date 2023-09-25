exports.default = function itemIcon(item) {
  if (item.widget === "Archives") return "icon-archive";
  else if (item.widget === "Tags") return "icon-tags";
  else return "icon-chevron-right";
}
