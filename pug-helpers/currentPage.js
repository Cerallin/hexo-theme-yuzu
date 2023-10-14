exports.default = function currentPage() {
  if (this.is_home()) return "home";
  else if (this.is_post()) return "post";
  else if (this.is_category()) return "category";
  else if (this.is_archive()) return "archive";
  else if (this.is_tag()) return "tag";
  return null;
}
