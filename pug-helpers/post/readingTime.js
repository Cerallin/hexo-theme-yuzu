exports.default = function readingTime(words) {
  const { reading_speed } = this.theme.word_count;

  time = (words.cn / reading_speed.cn) +
    (words.en / reading_speed.en);
  return time < 1 ? 1 : parseInt(time, 10);
}
