/**
 * UBERCARE BLING - LASER HAIR REDUCTION LANDING PAGE
 * Interactive script: Modal, FAQ Accordion, Mobile Menu, Form Handling & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileClose = document.querySelector('.mobile-drawer-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  const modalOverlay = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalCloseBtn');
  const modalForm = document.getElementById('appointmentForm');
  const modalSuccess = document.getElementById('modalSuccessState');
  const treatmentAreaSelect = document.getElementById('treatmentArea');
  const resetFormBtn = document.getElementById('resetBookingBtn');
  
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

  // Close drawer on link click
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. Appointment Modal Handling
  const openModal = (areaName = '') => {
    if (modalOverlay) {
      modalOverlay.classList.add('open');
      modalOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      // If an area was passed, pre-select it
      if (areaName && treatmentAreaSelect) {
        for (let i = 0; i < treatmentAreaSelect.options.length; i++) {
          if (treatmentAreaSelect.options[i].value.toLowerCase() === areaName.toLowerCase()) {
            treatmentAreaSelect.selectedIndex = i;
            break;
          }
        }
      }

      // Focus first input
      setTimeout(() => {
        const firstInput = modalOverlay.querySelector('input:not([type="hidden"])');
        firstInput?.focus();
      }, 100);
    }
  };

  const closeModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      modalOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  // Open modal buttons
  document.querySelectorAll('[data-modal-open="booking"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      const area = btn.getAttribute('data-area') || '';
      openModal(area);
    });
  });

  modalClose?.addEventListener('click', closeModal);

  // Close modal when clicking outside dialog
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // 4. Keyboard Navigation (ESC to close)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalOverlay?.classList.contains('open')) {
        closeModal();
      }
      if (mobileDrawer?.classList.contains('open')) {
        closeDrawer();
      }
    }
  });

  // 5. Booking Form Submission
  modalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const area = treatmentAreaSelect?.value;
    const date = document.getElementById('prefDate')?.value;
    const time = document.getElementById('prefTime')?.value;

    if (!fullName || !phone) {
      alert('Please fill in your name and phone number so we can reach you.');
      return;
    }

    // Prepare WhatsApp fallback link with user's requested details
    const waText = encodeURIComponent(
      `Hello Ubercare Bling, I would like to book a Laser Hair Reduction consultation.\n\n` +
      `Name: ${fullName}\n` +
      `Phone: ${phone}\n` +
      `Preferred Area: ${area || 'Consultation'}\n` +
      `Preferred Date: ${date || 'Earliest available'}\n` +
      `Time: ${time || 'Anytime'}`
    );
    const waBtn = document.getElementById('whatsappConfirmBtn');
    if (waBtn) {
      waBtn.href = `https://wa.me/919168668383?text=${waText}`;
    }

    // Switch to success view
    modalForm.style.display = 'none';
    if (modalSuccess) {
      modalSuccess.style.display = 'block';
    }
  });

  // Reset booking form to book another or edit
  resetFormBtn?.addEventListener('click', () => {
    if (modalForm && modalSuccess) {
      modalForm.reset();
      modalForm.style.display = 'block';
      modalSuccess.style.display = 'none';
    }
  });

  // 6. FAQ Accordion Handling
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

  // 7. Refined Scroll Animations via IntersectionObserver
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
