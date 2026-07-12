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

// ── Gallery Carousel ──
(function () {
  const track = document.getElementById('galleryTrack');
  const dotsWrap = document.getElementById('galleryDots');
  if (!track || !dotsWrap) return;

  const cards = Array.from(track.children);
  const total = cards.length;
  let current = 0;

  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `תמונה ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = `translateX(${-current * 100}%)`;
    dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('is-active', i === current);
    });
  }

  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  let sx = 0;
  const wrap = track.parentElement;
  wrap.addEventListener('touchstart', e => { sx = e.changedTouches[0].clientX; }, { passive: true });
  wrap.addEventListener('touchend', e => {
    const d = e.changedTouches[0].clientX - sx;
    if (Math.abs(d) > 40) d < 0 ? goTo(current + 1) : goTo(current - 1);
  }, { passive: true });
})();

// ── Tours Carousel + Flip Cards ──
(function () {
  const track = document.getElementById('toursTrack');
  const dotsWrap = document.getElementById('toursDots');
  if (!track || !dotsWrap) return;

  const cards = Array.from(track.querySelectorAll('.tour-card'));
  const total = cards.length;
  let current = 0;

  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `כרטיס ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(idx) {
    cards[current].classList.remove('is-flipped');
    current = (idx + total) % total;
    track.style.transform = `translateX(${-current * 100}%)`;
    dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('is-active', i === current);
    });
  }

  const prevBtn = document.getElementById('tourPrev');
  const nextBtn = document.getElementById('tourNext');
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  cards.forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('is-flipped'));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('is-flipped');
      }
    });
  });

  let sx = 0;
  const wrap = track.parentElement;
  wrap.addEventListener('touchstart', e => { sx = e.changedTouches[0].clientX; }, { passive: true });
  wrap.addEventListener('touchend', e => {
    const d = e.changedTouches[0].clientX - sx;
    if (Math.abs(d) > 40) d < 0 ? goTo(current + 1) : goTo(current - 1);
  }, { passive: true });
})();

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
