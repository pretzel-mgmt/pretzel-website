/**
 * Pretzel Website - Main JavaScript
 * Shared functionality for all pages.
 * Vanilla JS, no dependencies.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Sticky Navigation
  //    Adds "nav-scrolled" class to <nav> when the page is scrolled > 50px.
  //    This allows CSS to transition the nav background from transparent
  //    to a solid color (#0a0a0f).
  // =========================================================================

  const nav = document.querySelector('nav');

  function handleStickyNav() {
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }

  window.addEventListener('scroll', handleStickyNav, { passive: true });
  // Run once on load in case the page is already scrolled (e.g. reload)
  handleStickyNav();

  // =========================================================================
  // 2. Mobile Hamburger Menu Toggle
  //    Clicking the hamburger button toggles "nav-open" on <nav>, which
  //    controls the visibility of the mobile menu overlay / slide-in.
  // =========================================================================

  const hamburger = document.querySelector('.hamburger');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('nav-open');
    });
  }

  // =========================================================================
  // 3. Smooth Scrolling for Anchor Links
  //    Any <a> whose href starts with "#" will scroll smoothly to the
  //    target element instead of jumping instantly.
  // =========================================================================

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      // Skip empty hashes or "#" alone
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =========================================================================
  // 4. Scroll-triggered Fade-in Animations
  //    Uses IntersectionObserver to watch elements with the class "fade-in".
  //    When they enter the viewport, the "visible" class is added so CSS
  //    transitions can animate them in.
  // =========================================================================

  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && fadeElements.length > 0) {
    var fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once the element has become visible
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // Trigger when 15% of the element is visible
      }
    );

    fadeElements.forEach(function (el) {
      fadeObserver.observe(el);
    });
  }

  // =========================================================================
  // 5. Accordion FAQ
  //    Clicking a .faq-question toggles the "faq-open" class on its parent
  //    .faq-item, allowing CSS to show/hide the answer.
  // =========================================================================

  document.querySelectorAll('.faq-question').forEach(function (question) {
    question.addEventListener('click', function () {
      var item = this.closest('.faq-item');
      if (item) {
        item.classList.toggle('faq-open');
      }
    });
  });

  // =========================================================================
  // 6. Pricing Tab Toggle
  //    If a .pricing-toggle element exists, clicking its child buttons
  //    switches between the Standard and Launch pricing tables.
  // =========================================================================

  var pricingToggle = document.querySelector('.pricing-toggle');

  if (pricingToggle) {
    var toggleButtons = pricingToggle.querySelectorAll('button, [data-plan]');
    var standardTable = document.querySelector('.pricing-standard, [data-pricing="standard"]');
    var launchTable = document.querySelector('.pricing-launch, [data-pricing="launch"]');

    toggleButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Determine which plan was selected
        var plan = this.getAttribute('data-plan') || this.textContent.trim().toLowerCase();

        // Update active state on buttons
        toggleButtons.forEach(function (b) {
          b.classList.remove('active');
        });
        this.classList.add('active');

        // Show the selected table, hide the other
        if (plan === 'launch' || plan === 'ローンチ') {
          if (standardTable) standardTable.style.display = 'none';
          if (launchTable) launchTable.style.display = '';
        } else {
          if (standardTable) standardTable.style.display = '';
          if (launchTable) launchTable.style.display = 'none';
        }
      });
    });
  }

  // =========================================================================
  // 7. Close Mobile Menu on Nav Link Click
  //    When a user taps a navigation link inside the mobile menu, close
  //    the menu automatically so they can see the content.
  // =========================================================================

  if (nav) {
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav-open');
      });
    });
  }

  // =========================================================================
  // 8. Active Nav Link Highlight
  //    Determines the current page filename from the URL and adds an
  //    "active" class to the matching navigation link.
  // =========================================================================

  (function highlightActiveLink() {
    // Extract the filename from the current URL path
    var path = window.location.pathname;
    var filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    // Find all nav links and check for a match
    document.querySelectorAll('nav a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;

      // Normalize: extract just the filename portion of the href
      var linkFile = href.substring(href.lastIndexOf('/') + 1);

      // Match against current filename (handle trailing slash → index.html)
      if (linkFile === filename) {
        link.classList.add('active');
      } else if (filename === '' && (linkFile === 'index.html' || linkFile === '')) {
        link.classList.add('active');
      }
    });
  })();

})();
