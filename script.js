// Updates the footer with the current year.
function setFooterYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

// Opens and closes the mobile navigation menu.
function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("primary-menu");
  if (!toggle || !menu) return;

  // Keeps the button icon and accessible labels in sync with the menu state.
  function setOpen(open) {
    toggle.classList.toggle("is-open", open);
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  document.addEventListener("click", (event) => {
    if (!toggle.contains(event.target) && !menu.contains(event.target)) setOpen(false);
  });
}

// Highlights the navigation link for the section currently in view.
function setupActiveNav() {
  const links = Array.from(document.querySelectorAll(".nav-link"));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      // Marks only the visible section's link as active.
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
}

// Adds a soft shadow to the sticky header after the page scrolls.
function setupHeaderShadow() {
  const header = document.getElementById("site-header");
  if (!header) return;

  // Toggles the shadow class based on scroll position.
  function update() {
    header.classList.toggle("scrolled", window.scrollY > 12);
  }

  window.addEventListener("scroll", update, { passive: true });
  update();
}

// Drives the reviews carousel with automatic rotation and pause-on-interaction behavior.
function setupReviewsCarousel() {
  const root = document.querySelector("[data-carousel]");
  if (!root) return;

  const track = root.querySelector("[data-track]");
  const viewport = root.querySelector("[data-window]");
  if (!track || !viewport) return;

  const cards = Array.from(track.children);
  if (!cards.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const canHover = window.matchMedia("(hover:hover)").matches;

  let index = 0;
  let maxIndex = 0;
  let perView = 1;
  let timer = null;
  let hovering = false;
  let focusWithin = false;
  let pointerActive = false;

  // Measures the viewport, sets cards per view, and rebuilds the dot controls.
  function measure() {
    const width = viewport.clientWidth;
    perView = width >= 1024 ? 3 : width >= 640 ? 2 : 1;
    maxIndex = Math.max(0, cards.length - perView);
    index = Math.min(index, maxIndex);

    track.style.setProperty("--per-view", String(perView));
    render();
  }

  // Slides the track to the current review and updates the dots.
  function render() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;
    track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;

    cards.forEach((card, position) => {
      const visible = position >= index && position < index + perView;
      card.setAttribute("aria-hidden", visible ? "false" : "true");
    });
  }

   // Moves one card forward and loops back to the first card.
  function goNext() {
    index = index >= maxIndex ? 0 : index + 1;
    render();
  }

  // Checks whether autoplay is allowed right now.
  function canAutoplay() {
    return !hovering && !focusWithin && !pointerActive && !reducedMotion.matches;
  }

  // Starts or stops the automatic timer based on interaction state.
  function syncTimer() {
    if (timer) window.clearInterval(timer);
    timer = null;
    if (canAutoplay()) timer = window.setInterval(goNext, 5000);
  }

  measure();
  syncTimer();

  window.addEventListener("resize", () => {
    measure();
    syncTimer();
  });

  if (canHover) {
    root.addEventListener("mouseenter", () => {
      hovering = true;
      syncTimer();
    });
    root.addEventListener("mouseleave", () => {
      hovering = false;
      syncTimer();
    });
  }

  root.addEventListener("focusin", () => {
    focusWithin = true;
    syncTimer();
  });
  root.addEventListener("focusout", (event) => {
    if (!root.contains(event.relatedTarget)) {
      focusWithin = false;
      syncTimer();
    }
  });

  viewport.addEventListener("pointerdown", () => {
    pointerActive = true;
    syncTimer();
  });
  window.addEventListener("pointerup", () => {
    pointerActive = false;
    syncTimer();
  });
  window.addEventListener("pointercancel", () => {
    pointerActive = false;
    syncTimer();
  });

  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", syncTimer);
  }
}

// Builds a pre-filled email from the contact form instead of sending silently.
function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const recipient = "hello@cafenahum.example";

  // Opens the visitor's email app with the form details in the subject and body.
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = `Cafe Nahum message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (status) status.textContent = "Your email app should open with the message ready to send.";
  });
}

// Starts every interactive feature on the page.
function init() {
  setFooterYear();
  setupMobileMenu();
  setupActiveNav();
  setupHeaderShadow();
  setupReviewsCarousel();
  setupContactForm();
}

init();
