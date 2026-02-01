(function () {
  "use strict";

  Theme.refsSidebar = {
    register() {
      const refs = document.getElementById("refs");
      if (!refs) return;

      let sidebar = null;
      let content = null;

      const ensureSidebar = () => {
        if (sidebar) return;
        sidebar = document.createElement("div");
        sidebar.className = "refs-sidebar";
        sidebar.setAttribute("aria-label", "参考文献");
        sidebar.innerHTML = `
          <div class="refs-sidebar-header">
            <h2 class="refs-sidebar-title">参考文献</h2>
            <button type="button" class="refs-sidebar-close" aria-label="关闭">×</button>
          </div>
          <div class="refs-sidebar-content"></div>
        `;
        content = sidebar.querySelector(".refs-sidebar-content");
        const refsClone = refs.cloneNode(true);
        refsClone.removeAttribute("id");
        const origEntries = refs.querySelectorAll(".csl-entry");
        const cloneEntries = refsClone.querySelectorAll(".csl-entry");
        origEntries.forEach((orig, i) => {
          if (cloneEntries[i]) {
            cloneEntries[i].setAttribute("data-ref-id", orig.id);
            cloneEntries[i].removeAttribute("id");
          }
        });
        content.appendChild(refsClone);
        document.body.appendChild(sidebar);
        sidebar.querySelector(".refs-sidebar-close").addEventListener("click", closeSidebar);
        sidebar.addEventListener("click", (e) => {
          if (e.target === sidebar) closeSidebar();
        });
        window.addEventListener("resize", () => {
          if (sidebar.hasAttribute("data-open")) {
            sidebar.style.maxWidth = computeSidebarMaxWidth();
          }
        });
      };

      // max(30px, 1.5em)
      const GAP = Math.max(30, 1.5 * parseFloat(getComputedStyle(document.documentElement).fontSize));

      const closeOnClickOutside = (e) => {
        if (!sidebar?.hasAttribute("data-open")) return;
        if (sidebar.contains(e.target)) return;
        if (e.target.closest('a[href^="#ref-"], a[role="doc-biblioref"][href^="#"]')) return;
        closeSidebar();
        document.removeEventListener("click", closeOnClickOutside);
      };

      const bindClickOutside = () => {
        setTimeout(() => document.addEventListener("click", closeOnClickOutside), 0);
      };

      const computeSidebarMaxWidth = () => {
        const viewportWidth = document.documentElement.clientWidth;
        const contentEl = document.querySelector("article.post") || document.querySelector(".post") || document.querySelector(".main");
        const cap = viewportWidth * 0.45;
        if (!contentEl) return `${cap}px`;
        const contentRight = contentEl.getBoundingClientRect().right;
        const spaceOnRight = viewportWidth - contentRight - GAP;
        const computed = spaceOnRight >= 350 ? spaceOnRight : 350;
        return `${Math.min(computed, cap)}px`;
      };

      const openSidebar = (highlightId) => {
        ensureSidebar();
        sidebar.style.maxWidth = computeSidebarMaxWidth();
        requestAnimationFrame(() => {
          sidebar.setAttribute("data-open", "");
        });
        const entries = content.querySelectorAll(".csl-entry[data-refs-highlight]");
        entries.forEach((el) => el.removeAttribute("data-refs-highlight"));
        const target = highlightId ? content.querySelector(`[data-ref-id="${highlightId}"]`) : null;
        if (target) {
          target.setAttribute("data-refs-highlight", "");
          target.scrollIntoView({ block: "start", behavior: "auto" });
        }
        bindClickOutside();
      };

      const closeSidebar = () => {
        if (!sidebar) return;
        sidebar.removeAttribute("data-open");
        document.removeEventListener("click", closeOnClickOutside);
      };

      document
        .querySelectorAll('a[href^="#ref-"], a[role="doc-biblioref"][href^="#"]')
        .forEach((a) => {
          a.addEventListener("click", (e) => {
            const href = a.getAttribute("href");
            if (!href || href === "#" || !href.startsWith("#ref-")) return;
            e.preventDefault();
            openSidebar(href.slice(1));
          });
        });
    },
  };
}.call(this));
