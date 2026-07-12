// ── Header hide on scroll down, show on scroll up ──
const siteHeader = document.getElementById("siteHeader");
let lastScrollY = 0;
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const headerH = siteHeader ? siteHeader.offsetHeight : 80;
      if (siteHeader) {
        if (currentScrollY > lastScrollY && currentScrollY > headerH) {
          siteHeader.classList.add("header--hidden");
        } else {
          siteHeader.classList.remove("header--hidden");
        }
      }
      lastScrollY = currentScrollY;
      ticking = false;
    });
    ticking = true;
  }
});

// ── Navigation menu toggle ──
const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (primaryNav.classList.contains("is-open")) {
        primaryNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// ── Tours Flip Cards ──
const tourCards = document.querySelectorAll(".tour-card");
tourCards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
  });
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.classList.toggle("is-flipped");
    }
  });
});

// ── Accessibility widget ──
const a11yToggle = document.getElementById("a11yToggle");
const a11yPanel  = document.getElementById("a11yPanel");
const a11yClose  = document.getElementById("a11yClose");

function openPanel() {
  a11yPanel.removeAttribute("hidden");
  a11yToggle.setAttribute("aria-expanded", "true");
}

function closePanel() {
  a11yPanel.setAttribute("hidden", "");
  a11yToggle.setAttribute("aria-expanded", "false");
}

if (a11yToggle && a11yPanel) {
  a11yToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    a11yPanel.hasAttribute("hidden") ? openPanel() : closePanel();
  });

  if (a11yClose) {
    a11yClose.addEventListener("click", closePanel);
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".a11y-widget") && !a11yPanel.hasAttribute("hidden")) {
      closePanel();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !a11yPanel.hasAttribute("hidden")) {
      closePanel();
      a11yToggle.focus();
    }
  });
}

// Font size
let fontSize = 100;
const fontUp   = document.getElementById("fontUp");
const fontDown = document.getElementById("fontDown");

if (fontUp) {
  fontUp.addEventListener("click", () => {
    fontSize = Math.min(fontSize + 10, 140);
    document.documentElement.style.fontSize = fontSize + "%";
  });
}

if (fontDown) {
  fontDown.addEventListener("click", () => {
    fontSize = Math.max(fontSize - 10, 80);
    document.documentElement.style.fontSize = fontSize + "%";
  });
}

// High contrast
const contrastToggle = document.getElementById("contrastToggle");
if (contrastToggle) {
  contrastToggle.addEventListener("click", () => {
    document.body.classList.toggle("hc");
    contrastToggle.classList.toggle("active");
  });
}

// Highlight links
const linksToggle = document.getElementById("linksToggle");
if (linksToggle) {
  linksToggle.addEventListener("click", () => {
    document.body.classList.toggle("links-hl");
    linksToggle.classList.toggle("active");
  });
}

// Reset all accessibility settings
const a11yReset = document.getElementById("a11yReset");
if (a11yReset) {
  a11yReset.addEventListener("click", () => {
    fontSize = 100;
    document.documentElement.style.fontSize = "100%";
    document.body.classList.remove("hc", "links-hl");
    document.querySelectorAll(".a11y-options button").forEach((btn) => {
      btn.classList.remove("active");
    });
  });
}
