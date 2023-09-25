const fs = require("fs");
const path = require("path");

function walk(dir, callback) {
  fs.readdir(dir, function (err, files) {
    if (err)
      throw err;

    files.forEach(function (file) {
      const filepath = path.join(dir, file);

      fs.stat(filepath, function (err, stats) {
        if (stats.isDirectory()) {
          walk(filepath, callback);
        } else if (stats.isFile()) {
          callback(filepath);
        }
      });
    });
  });
}

walk(hexo.theme_dir + 'pug-helpers', function (filepath) {
  // Extract function name from filepath and convert it
  // from camel case to snake case.
  const funcName = filepath
    .replace(/.*\//, '')
    .replace(/\.js$/, '')
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toLowerCase();
  hexo.extend.helper.register(funcName, require(filepath).default);
});
