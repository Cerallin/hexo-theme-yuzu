const tocWrap = document.getElementById('post-toc');

function toggleToc(button, expend, collapse) {
  if (tocWrap.classList.contains('post-toc-show')) {
    tocWrap.classList.remove('post-toc-show');
    tocWrap.classList.add('post-toc-hide');
    button.innerText = collapse;
  } else {
    tocWrap.classList.remove('post-toc-hide');
    tocWrap.classList.add('post-toc-show');
    window.scroll({
      top: tocWrap.offsetTop - 65, // plus header height
      behavior: "smooth"
    });
    button.innerText = expend;
  }
}
