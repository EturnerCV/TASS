/* =============================================
   HUBSPOT CONSOLIDATION GUIDE — Shared JS
   TOC generation, scroll-spy, navigation
   ============================================= */

(function() {
  // === AUTO-GENERATE TABLE OF CONTENTS ===
  var article = document.querySelector('.article-main');
  var tocContainer = document.getElementById('toc-container');
  if (!article || !tocContainer) return;

  var skipTexts = ['KEY TAKEAWAYS', 'RELATED PAGES', 'NEXT STEPS'];
  var headings = article.querySelectorAll('h2, h3');
  var tocLinks = [];

  headings.forEach(function(heading) {
    var text = heading.textContent.trim();
    if (skipTexts.indexOf(text) !== -1) return;
    if (heading.closest('.surface-cta')) return;
    if (heading.closest('.step-nav')) return;

    var id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    heading.id = id;

    var link = document.createElement('a');
    link.href = '#' + id;
    link.className = 'toc-link' + (heading.tagName === 'H3' ? ' toc-link-h3' : '');
    link.textContent = text.length > 45 ? text.substring(0, 42) + '...' : text;

    link.addEventListener('click', function(e) {
      e.preventDefault();
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    tocContainer.appendChild(link);
    tocLinks.push({ link: link, heading: heading });
  });

  if (tocLinks.length === 0) {
    tocContainer.style.display = 'none';
    return;
  }

  // === SCROLL SPY ===
  var currentActive = null;
  var scrollSpy = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        if (currentActive) currentActive.classList.remove('active');
        var match = tocLinks.find(function(t) { return t.heading === entry.target; });
        if (match) {
          match.link.classList.add('active');
          currentActive = match.link;
        }
      }
    });
  }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });

  tocLinks.forEach(function(t) { scrollSpy.observe(t.heading); });
})();
