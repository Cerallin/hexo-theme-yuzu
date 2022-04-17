const tocWrap = document.getElementById('post-toc');

function toggleToc(button, expend, collapse) {
  let expaned = tocWrap.getAttribute('data-expand') == "true";
  tocWrap.setAttribute('data-expand', !expaned);

  if (expaned) {
    button.innerText = collapse;
  } else {
    window.scroll({
      top: tocWrap.offsetTop - 65,
      behavior: "smooth"
    });
    button.innerText = expend;
  }
}
