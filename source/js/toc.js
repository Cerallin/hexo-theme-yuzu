window.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (entry.intersectionRatio > 0) {
        document.
          querySelector(`.post-toc-item a[href="#${encodeURIComponent(id)}"]`).parentNode.
          setAttribute('data-active', '');
      } else {
        document.
          querySelector(`.post-toc-item a[href="#${encodeURIComponent(id)}"]`).parentNode.
          removeAttribute('data-active');
      }
    });
  });

  // Track all sections that have an `id` applied
  document.querySelectorAll('article h3[id], article h4[id]').forEach((section) => {
    observer.observe(section);
  });
});
