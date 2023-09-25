/**
 * Count words.
 *
 * @param content HTML string to count.
 *
 * @returns .cn words count of CJK words.
 * @returns .en words count of latin words.
 */
exports.default = function wordCounter(content) {
  const strippedContent = this.strip_html(content);
  return {
    cn: (strippedContent.match(/[\u4E00-\u9FA5]/g) || []).length,
    en: (
      strippedContent.replace(/[\u4E00-\u9FA5]/g, '')
        .match(new RegExp([
          '[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+',
          '[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+',
          '[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+',
          '\w+'
        ].join('|'), 'g')) || []
    ).length,
  };
};
