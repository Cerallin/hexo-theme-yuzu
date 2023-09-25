/**
 * Group posts by year
 *
 * @param posts Post array
 * @return A 'years' property-containing object
 * with all other keys stored in the 'years' array
 */
exports.default = function groupPosts(posts) {
  return posts.reduce((group, post) => {
    const year = post.date.year();

    group[year] = group[year] ?? [];
    group[year].push(post);

    if (group.years.includes(year)) {
      // do nothing
    } else group.years.push(year);

    return group;
  }, { years: [] });
}
