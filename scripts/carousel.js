/**
 * ============================================================================
 * SRM UKM - HORIZONTAL RAKAN CAROUSEL CONTROLLER (carousel.js)
 * ============================================================================
 * Menyokong:
 * 1. Butang anak panah Sebelum / Seterusnya.
 * 2. Leretan jari (touch swipe) di peranti mudah alih & seretan tetikus (mouse drag).
 * 3. Butang indikator titik (dot indicators).
 * 4. Menu pilihan pantas portfolio Rakan (Rakan Dock).
 * 5. Navigasi papan kekunci (ArrowLeft / ArrowRight) apabila fokus berada di seksyen Rakan.
 * 6. Kad berpusat (centred featured card) dengan kad bersebelahan kelihatan separa.
 */

(function () {
  let currentIndex = 0;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let dragDelta = 0;

  let viewportEl = null;
  let trackEl = null;
  let dockEl = null;
  let dotsEl = null;
  let prevBtn = null;
  let nextBtn = null;

  function renderLogoMarkup(rakan) {
    return `
      <div class="rakan-logo-box" style="--card-light: ${rakan.accentLight}; --card-accent: ${rakan.accentColor};">
        <img
          src="${rakan.logo}"
          alt="Logo ${rakan.name}"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        <div class="rakan-logo-fallback" style="display: none;">
          <span class="rakan-logo-fallback-emoji" aria-hidden="true">${rakan.fallbackEmoji}</span>
          <span class="rakan-logo-fallback-tag">${rakan.shortName}</span>
        </div>
      </div>
    `;
  }

  function buildCarouselDOM() {
    const rakanList = window.RAKAN_DATA || [];
    viewportEl = document.getElementById("rakan-carousel-viewport");
    trackEl = document.getElementById("rakan-carousel-track");
    dockEl = document.getElementById("rakan-portfolio-dock");
    dotsEl = document.getElementById("rakan-carousel-dots");
    prevBtn = document.getElementById("rakan-prev-btn");
    nextBtn = document.getElementById("rakan-next-btn");

    if (!trackEl || !rakanList.length) return;

    // 1. Render Portfolio Quick Navigation Dock
    if (dockEl) {
      dockEl.innerHTML = rakanList
        .map(
          (rakan, idx) => `
          <button
            type="button"
            class="rakan-dock-btn ${idx === 0 ? "active" : ""}"
            data-rakan-index="${idx}"
            style="--dock-accent: ${rakan.accentColor};"
            aria-label="Pilih ${rakan.name}"
          >
            <span class="rakan-dock-dot"></span>
            <span>${rakan.shortName}</span>
          </button>
        `
        )
        .join("");
    }

    // 2. Render Horizontal Showcase Cards
    trackEl.innerHTML = rakanList
      .map((rakan, idx) => {
        const previewFunctions = rakan.functions.slice(0, 4);
        return `
          <article
            class="rakan-card ${idx === 0 ? "is-active" : ""}"
            data-card-index="${idx}"
            style="--card-accent: ${rakan.accentColor}; --card-light: ${rakan.accentLight};"
            aria-label="${rakan.name}"
          >
            <div>
              <div class="rakan-card-top">
                ${renderLogoMarkup(rakan)}
                <div>
                  <div class="rakan-meta-header">
                    <span class="rakan-number-pill">PORTFOLIO ${rakan.number}</span>
                    <span class="rakan-focus-tag">${rakan.coreFocus}</span>
                  </div>
                  <h3 class="rakan-card-title">${rakan.name}</h3>
                  <p class="rakan-card-desc">${rakan.shortDescription}</p>
                </div>
              </div>

              <div class="rakan-card-columns">
                <div>
                  <div class="rakan-col-label">Fungsi Utama</div>
                  <ul class="rakan-func-list">
                    ${previewFunctions
                      .map(
                        (fn) => `
                        <li>
                          <span class="rakan-func-bullet" aria-hidden="true">•</span>
                          <span>${fn}</span>
                        </li>
                      `
                      )
                      .join("")}
                  </ul>
                </div>
                <div>
                  <div class="rakan-col-label">Contoh Aktiviti</div>
                  <div class="rakan-example-chips">
                    ${rakan.examples
                      .map((ex) => `<span class="rakan-example-chip">${ex}</span>`)
                      .join("")}
                  </div>
                </div>
              </div>
            </div>

            <div class="rakan-card-footer">
              <span style="font-size: 0.84rem; font-weight: 600; color: var(--text-muted);">
                ${
                  rakan.isConfigured
                    ? "Klik untuk penerangan penuh & semua fungsi portfolio"
                    : "Slot Boleh Dikonfigurasi (Kemaskini di data/rakan-data.js)"
                }
              </span>
              <button
                type="button"
                class="rakan-detail-btn"
                data-open-rakan-modal="${rakan.id}"
              >
                <span>Kenali Rakan</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </article>
        `;
      })
      .join("");

    // 3. Render Dots Indicator
    if (dotsEl) {
      dotsEl.innerHTML = rakanList
        .map(
          (rakan, idx) => `
          <button
            type="button"
            class="carousel-dot ${idx === 0 ? "active" : ""}"
            data-dot-index="${idx}"
            aria-label="Pergi ke slaid ${rakan.name}"
          ></button>
        `
        )
        .join("");
    }
  }

  function updateCarouselPosition(animate = true) {
    const rakanList = window.RAKAN_DATA || [];
    if (!trackEl || !viewportEl || !rakanList.length) return;

    const cards = Array.from(trackEl.querySelectorAll(".rakan-card"));
    if (!cards.length) return;

    // Clamp index
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= cards.length) currentIndex = cards.length - 1;

    const activeCard = cards[currentIndex];
    const viewportWidth = viewportEl.clientWidth;
    const cardWidth = activeCard.offsetWidth;
    const cardLeft = activeCard.offsetLeft;

    // Center the active card inside the viewport so neighbouring cards peek on both sides
    const targetTranslate = (viewportWidth - cardWidth) / 2 - cardLeft;
    currentTranslate = targetTranslate;

    if (animate) {
      trackEl.classList.remove("no-transition");
    } else {
      trackEl.classList.add("no-transition");
    }

    trackEl.style.transform = `translate3d(${targetTranslate}px, 0, 0)`;

    // Update active state on cards
    cards.forEach((card, idx) => {
      card.classList.toggle("is-active", idx === currentIndex);
    });

    // Update dock buttons
    if (dockEl) {
      const dockBtns = dockEl.querySelectorAll(".rakan-dock-btn");
      dockBtns.forEach((btn, idx) => {
        const isActive = idx === currentIndex;
        btn.classList.toggle("active", isActive);
      });
    }

    // Update dots
    if (dotsEl) {
      const dots = dotsEl.querySelectorAll(".carousel-dot");
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentIndex);
      });
    }

    // Update arrow disabled states
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === cards.length - 1;

    // Update CSS variable for active Rakan colour
    const activeRakan = rakanList[currentIndex];
    if (activeRakan) {
      document.documentElement.style.setProperty("--active-rakan-color", activeRakan.accentColor);
      document.documentElement.style.setProperty("--active-rakan-light", activeRakan.accentLight);
    }
  }

  function goToSlide(index, scrollDock = true) {
    const rakanList = window.RAKAN_DATA || [];
    if (!rakanList.length) return;
    currentIndex = Math.max(0, Math.min(index, rakanList.length - 1));
    updateCarouselPosition(true);

    if (scrollDock && dockEl) {
      const activeBtn = dockEl.querySelector(`.rakan-dock-btn[data-rakan-index="${currentIndex}"]`);
      if (activeBtn) {
        const dockRect = dockEl.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        const offset = btnRect.left - dockRect.left - dockRect.width / 2 + btnRect.width / 2;
        dockEl.scrollBy({ left: offset, behavior: "smooth" });
      }
    }
  }

  function bindEvents() {
    if (!viewportEl || !trackEl) return;

    if (prevBtn) {
      prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
    }

    if (dockEl) {
      dockEl.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-rakan-index]");
        if (!btn) return;
        const idx = parseInt(btn.getAttribute("data-rakan-index"), 10);
        goToSlide(idx);
      });
    }

    if (dotsEl) {
      dotsEl.addEventListener("click", (e) => {
        const dot = e.target.closest("[data-dot-index]");
        if (!dot) return;
        const idx = parseInt(dot.getAttribute("data-dot-index"), 10);
        goToSlide(idx);
      });
    }

    // Clicking a neighbouring non-active card slides directly to it
    trackEl.addEventListener("click", (e) => {
      if (Math.abs(dragDelta) > 12) return; // Ignore click if user was dragging
      const detailBtn = e.target.closest("[data-open-rakan-modal]");
      if (detailBtn) {
        const rakanId = detailBtn.getAttribute("data-open-rakan-modal");
        if (window.SRM_APP && typeof window.SRM_APP.openRakanModal === "function") {
          window.SRM_APP.openRakanModal(rakanId);
        }
        return;
      }

      const clickedCard = e.target.closest(".rakan-card");
      if (clickedCard) {
        const cardIdx = parseInt(clickedCard.getAttribute("data-card-index"), 10);
        if (!isNaN(cardIdx) && cardIdx !== currentIndex) {
          goToSlide(cardIdx);
        }
      }
    });

    // Pointer / Touch Dragging Support
    function onPointerDown(clientX) {
      isDragging = true;
      startX = clientX;
      dragDelta = 0;
      viewportEl.classList.add("is-dragging");
      trackEl.classList.add("no-transition");
    }

    function onPointerMove(clientX) {
      if (!isDragging) return;
      dragDelta = clientX - startX;
      trackEl.style.transform = `translate3d(${currentTranslate + dragDelta}px, 0, 0)`;
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      viewportEl.classList.remove("is-dragging");

      const threshold = 60;
      if (dragDelta < -threshold && currentIndex < (window.RAKAN_DATA.length - 1)) {
        goToSlide(currentIndex + 1);
      } else if (dragDelta > threshold && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      } else {
        updateCarouselPosition(true);
      }

      setTimeout(() => {
        dragDelta = 0;
      }, 50);
    }

    // Mouse events
    viewportEl.addEventListener("mousedown", (e) => {
      if (e.target.closest("button")) return;
      onPointerDown(e.clientX);
    });
    window.addEventListener("mousemove", (e) => onPointerMove(e.clientX));
    window.addEventListener("mouseup", onPointerUp);

    // Touch events
    viewportEl.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length === 1) {
          onPointerDown(e.touches[0].clientX);
        }
      },
      { passive: true }
    );
    viewportEl.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches.length === 1) {
          onPointerMove(e.touches[0].clientX);
        }
      },
      { passive: true }
    );
    viewportEl.addEventListener("touchend", onPointerUp);

    // Keyboard navigation when Rakan section is in view or focused
    document.addEventListener("keydown", (e) => {
      if (document.body.classList.contains("modal-open")) return;
      const rakanSec = document.getElementById("rakan");
      if (!rakanSec) return;
      const rect = rakanSec.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
      if (!isInViewport) return;

      if (e.key === "ArrowRight") {
        goToSlide(currentIndex + 1);
      } else if (e.key === "ArrowLeft") {
        goToSlide(currentIndex - 1);
      }
    });

    window.addEventListener("resize", () => {
      updateCarouselPosition(false);
    });
  }

  window.SRM_CAROUSEL = {
    init() {
      buildCarouselDOM();
      bindEvents();
      // Initial position calculation after layout settles
      requestAnimationFrame(() => {
        updateCarouselPosition(false);
      });
    },
    goToRakanById(rakanId) {
      const rakanList = window.RAKAN_DATA || [];
      const idx = rakanList.findIndex((r) => r.id === rakanId);
      if (idx !== -1) {
        goToSlide(idx);
      }
    }
  };
})();
