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

// === REVEAL ON SCROLL ===
(function() {
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

  reveals.forEach(function(el) { revealObserver.observe(el); });
})();

// === BURGER MENU ===
(function() {
  var burger = document.getElementById('burger-btn');
  var menu = document.getElementById('mobile-menu');
  if (!burger || !menu) return;

  burger.addEventListener('click', function() {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  menu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      burger.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Mobile theme toggle
  var mobileTheme = document.getElementById('mobile-theme-toggle');
  if (mobileTheme) {
    mobileTheme.addEventListener('click', function() {
      var btn = document.getElementById('theme-toggle');
      if (btn) btn.click();
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      mobileTheme.textContent = isLight ? '\u2600 SWITCH TO DARK' : '\u263D SWITCH TO LIGHT';
    });
  }
})();

// === THEME TOGGLE (dark/light) ===
(function() {
  // Check saved preference
  var saved = localStorage.getItem('hsc-theme');
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');

  // Find toggle button
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  function updateLabel() {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    btn.textContent = isLight ? '\u2600 LIGHT' : '\u263D DARK';
  }

  updateLabel();

  btn.addEventListener('click', function() {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('hsc-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('hsc-theme', 'light');
    }
    updateLabel();
  });
})();
