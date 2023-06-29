window.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (entry.intersectionRatio > 0) {
          document.
            querySelector(`.post-toc-item a[href="#${encodeURIComponent(id)}"]`).
            setAttribute('data-active', true);
      } else {
        document.
          querySelector(`.post-toc-item a[href="#${encodeURIComponent(id)}"]`).
          removeAttribute('data-active');
      }
    });
  });

  // Track all sections that have an `id` applied
  document.querySelectorAll('article h3[id], article h4[id]').forEach((section) => {
    observer.observe(section);
  });
});

const tocWrap = document.getElementById('post-toc');

function toggleToc(button, expend, collapse) {
  let expaned = tocWrap.getAttribute('data-expand') == "true";
  tocWrap.setAttribute('data-expand', !expaned);

  if (expaned) {
    button.innerText = collapse;
  } else {
    button.innerText = expend;
  }
}
