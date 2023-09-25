
exports.default = function itemURL(item) {
  const config = this.config, url_for = this.url_for;
  if (item.widget === "Archives") return url_for('/' + config.archive_dir);
  else if (item.widget === "Tags") return url_for('/' + config.tag_dir);
  else return url_for(`/${config.category_dir}/${item.name}/`);
}
