/**
 * Portfolio Interactivo - Selena Ruiz Diaz
 * Programadora Frontend & Software - E.E.S.T N°5
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==================== 1. REVEAL OBSERVER ====================
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // ==================== 2. AMBIENT PARALLAX ====================
  const parallaxItems = document.querySelectorAll("[data-parallax]");
  const updateParallax = () => {
    const scrollY = window.scrollY;
    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.parallax || 0);
      const movement = scrollY * speed;
      item.style.transform = `translate3d(0, ${movement}px, 0)`;
    });
  };

  updateParallax();
  window.addEventListener("scroll", updateParallax, { passive: true });

  // ==================== 3. 3D TILT EFFECT ====================
  const tiltCards = document.querySelectorAll(".tilt-card");
  tiltCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = (0.5 - (y / rect.height)) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });

  // ==================== 4. HERO TYPING EFFECT ====================
  const typingElement = document.getElementById("typing-text");
  if (typingElement) {
    const phrases = [
      "Desarrolladora Frontend",
      "Estudiante E.E.S.T N°5",
      "Diseño Web & UI/UX",
      "Programadora de Software",
      "Creación de Experiencias Digitales"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 95;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 450;
      }

      setTimeout(typeLoop, typingSpeed);
    }
    typeLoop();
  }

  // ==================== 5. ANIMATED SKILLS PROGRESS BARS ====================
  const skillsSection = document.getElementById("habilidades");
  const skillBars = document.querySelectorAll(".skill-progress-bar");
  let skillsAnimated = false;

  function animateSkills() {
    skillBars.forEach((bar) => {
      const targetPercent = bar.getAttribute("data-percent") || "80";
      bar.style.width = targetPercent + "%";
    });
    skillsAnimated = true;
  }

  if (skillsSection && "IntersectionObserver" in window) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !skillsAnimated) {
            animateSkills();
          }
        });
      },
      { threshold: 0.15 }
    );
    skillsObserver.observe(skillsSection);
  } else {
    animateSkills();
  }

  // ==================== 6. MOBILE NAVIGATION TOGGLE ====================
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navLinks = document.getElementById("nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("nav-active");
      mobileMenuBtn.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("nav-active");
        mobileMenuBtn.classList.remove("open");
      });
    });
  }

  // ==================== 7. CV MODAL HANDLERS ====================
  const cvModal = document.getElementById("cv-modal");
  const cvModalClose = document.getElementById("cv-modal-close");
  const openCvBtns = document.querySelectorAll(".open-cv-btn");

  function openCvModal() {
    if (cvModal) {
      cvModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeCvModal() {
    if (cvModal) {
      cvModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  openCvBtns.forEach((btn) => btn.addEventListener("click", openCvModal));
  if (cvModalClose) cvModalClose.addEventListener("click", closeCvModal);

  if (cvModal) {
    cvModal.addEventListener("click", (e) => {
      if (e.target === cvModal) closeCvModal();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCvModal();
  });

  // ==================== 8. TOAST NOTIFICATIONS ====================
  function showToast(message) {
    let toast = document.getElementById("portfolio-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "portfolio-toast";
      toast.className = "portfolio-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  // Copy Email Handlers
  const copyEmailBtns = [
    document.getElementById("copy-email-btn"),
    document.getElementById("copy-email-btn-2")
  ];

  copyEmailBtns.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", () => {
        const email = btn.getAttribute("data-email") || "selenaruizdiaz.dev@gmail.com";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(() => {
            showToast(`✓ Correo copiado: "${email}"`);
          }).catch(() => {
            showToast(`Email: ${email}`);
          });
        } else {
          showToast(`Email: ${email}`);
        }
      });
    }
  });

  // ==================== 9. CONTACT FORM HANDLING (WHATSAPP) ====================
  const WHATSAPP_NUMBER = "5491137554748";
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success-msg");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("form-name").value.trim();
      const email = document.getElementById("form-email").value.trim();
      const serviceSelect = document.getElementById("form-service");
      const serviceLabel =
        serviceSelect && serviceSelect.selectedIndex >= 0
          ? serviceSelect.options[serviceSelect.selectedIndex].text
          : "";
      const message = document.getElementById("form-message").value.trim();

      if (!name || !email || !message) {
        showToast("Por favor completa los campos obligatorios (*)");
        return;
      }

      const whatsappMessage = [
        "¡Hola Selena! Te escribo desde tu portfolio:",
        "",
        `*Nombre / Empresa:* ${name}`,
        `*Email:* ${email}`,
        serviceLabel ? `*Tipo de oportunidad:* ${serviceLabel}` : "",
        `*Mensaje:* ${message}`
      ]
        .filter(Boolean)
        .join("\n");

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      contactForm.reset();
      if (formSuccess) {
        formSuccess.style.display = "block";
        setTimeout(() => {
          formSuccess.style.display = "none";
        }, 6000);
      }
      showToast("✓ Abriendo WhatsApp con tu mensaje listo para enviar.");
    });
  }

  // Global exposure
  window.PortfolioApp = {
    openCvModal,
    closeCvModal,
    showToast
  };
});
