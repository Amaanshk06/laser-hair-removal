/**
 * UBERCARE BLING - LASER HAIR REDUCTION LANDING PAGE
 * Interactive script: Header scroll, Mobile Drawer, FAQ Accordion & Scroll Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileClose = document.querySelector('.mobile-drawer-close');
  
  // 1. Header scroll effect
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Drawer Navigation
  const openDrawer = () => {
    mobileDrawer?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer?.classList.remove('open');
    document.body.style.overflow = '';
  };

  mobileToggle?.addEventListener('click', openDrawer);
  mobileClose?.addEventListener('click', closeDrawer);
  
  // Close drawer when clicking background overlay
  mobileDrawer?.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) {
      closeDrawer();
    }
  });

  // Close drawer on link click and handle smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetHash = anchor.getAttribute('href');
      if (!targetHash || targetHash === '#') return;

      e.preventDefault();
      closeDrawer();

      if (targetHash === '#top') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        if (history.pushState) {
          history.pushState(null, null, ' ');
        }
        return;
      }

      const targetEl = document.querySelector(targetHash);
      if (targetEl) {
        const headerEl = document.querySelector('.site-header');
        const headerHeight = headerEl ? headerEl.offsetHeight : 70;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 10);

        window.scrollTo({
          top: Math.max(0, targetPos),
          behavior: 'smooth'
        });

        if (history.pushState) {
          history.pushState(null, null, targetHash);
        }
      }
    });
  });

  // 3. Keyboard Navigation (ESC to close)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileDrawer?.classList.contains('open')) {
        closeDrawer();
      }
    }
  });

  // 4. FAQ Accordion Handling
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const headerBtn = item.querySelector('.accordion-header');
    const panel = item.querySelector('.accordion-panel');

    headerBtn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other accordion items for clean luxury look
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherHeader = otherItem.querySelector('.accordion-header');
          const otherPanel = otherItem.querySelector('.accordion-panel');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('active');
        headerBtn.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('active');
        headerBtn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Open first FAQ item by default
  if (accordionItems.length > 0) {
    const firstItem = accordionItems[0];
    const firstHeader = firstItem.querySelector('.accordion-header');
    const firstPanel = firstItem.querySelector('.accordion-panel');
    firstItem.classList.add('active');
    firstHeader?.setAttribute('aria-expanded', 'true');
    if (firstPanel) {
      firstPanel.style.maxHeight = firstPanel.scrollHeight + 'px';
    }
  }

  // 5. Refined Scroll Animations via IntersectionObserver
  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .scale-reveal, .fade-in').forEach(el => {
      observer.observe(el);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    document.querySelectorAll('.fade-up, .scale-reveal, .fade-in').forEach(el => {
      el.classList.add('visible');
    });
  }
});
