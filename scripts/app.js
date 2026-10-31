/**
 * ============================================================================
 * SRM UKM - MAIN APPLICATION CONTROLLER (app.js)
 * ============================================================================
 * Mengawal:
 * - Navigasi responsif & penunjuk seksyen aktif (IntersectionObserver)
 * - Pratonton Rakan & Sorotan Aktiviti Terkini di Laman Utama (Home)
 * - Galeri Aktiviti dengan penapisan kategori Rakan & susunan kronologi
 * - Modal Paparan Terperinci untuk Rakan & Aktiviti (Keyboard & Focus Accessible)
 * - Pautan Media Sosial dinamik daripada data/site-config.js
 * - Animasi dedahan skrol (Scroll Reveal)
 */

(function () {
  let activeFilterRakanId = "all";

  function getRakanById(rakanId) {
    return (window.RAKAN_DATA || []).find((r) => r.id === rakanId) || null;
  }

  function getSortedActivities() {
    const list = [...(window.AKTIVITI_DATA || [])];
    return list.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  /* --------------------------------------------------------------------------
   * 1. NAVIGATION & SCROLL SPY
   * -------------------------------------------------------------------------- */
  function initNavigation() {
    const header = document.getElementById("site-header");
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const navList = document.getElementById("nav-links");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener(
      "scroll",
      () => {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 16);
      },
      { passive: true }
    );

    if (mobileBtn && navList) {
      mobileBtn.addEventListener("click", () => {
        const isOpen = navList.classList.toggle("mobile-open");
        mobileBtn.setAttribute("aria-expanded", String(isOpen));
      });

      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          navList.classList.remove("mobile-open");
          mobileBtn.setAttribute("aria-expanded", "false");
        });
      });
    }

    // Active section indicator using IntersectionObserver
    const sections = document.querySelectorAll("main > section[id]");
    if ("IntersectionObserver" in window && sections.length) {
      const spyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("id");
              navLinks.forEach((link) => {
                const href = link.getAttribute("href");
                link.classList.toggle("active", href === `#${id}`);
              });
            }
          });
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
      );

      sections.forEach((sec) => spyObserver.observe(sec));
    }
  }

  /* --------------------------------------------------------------------------
   * 2. HOME SECTION: RAKAN PREVIEW & LATEST ACTIVITIES PREVIEW
   * -------------------------------------------------------------------------- */
  function renderHomePreviews() {
    const rakanList = window.RAKAN_DATA || [];

    // Hero Interactive Orbit Grid (First 9 Rakan)
    const orbitGrid = document.getElementById("hero-orbit-grid");
    if (orbitGrid) {
      orbitGrid.innerHTML = rakanList
        .map(
          (r) => `
          <button
            type="button"
            class="hero-orbit-item"
            data-jump-rakan="${r.id}"
            title="Terokai ${r.name}"
          >
            <div class="hero-orbit-icon" aria-hidden="true">${r.fallbackEmoji}</div>
            <span class="hero-orbit-name">${r.shortName}</span>
          </button>
        `
        )
        .join("");

      orbitGrid.addEventListener("click", (e) => {
        const item = e.target.closest("[data-jump-rakan]");
        if (!item) return;
        const rakanId = item.getAttribute("data-jump-rakan");
        const rakanSec = document.getElementById("rakan");
        if (rakanSec) rakanSec.scrollIntoView({ behavior: "smooth" });
        if (window.SRM_CAROUSEL) {
          window.SRM_CAROUSEL.goToRakanById(rakanId);
        }
      });
    }

    // Home Rakan Preview Chips
    const previewChipsEl = document.getElementById("home-rakan-preview-chips");
    if (previewChipsEl) {
      previewChipsEl.innerHTML = rakanList
        .map(
          (r) => `
          <button
            type="button"
            class="rakan-mini-chip"
            data-jump-rakan="${r.id}"
          >
            <span class="rakan-mini-dot" style="background: ${r.accentColor};"></span>
            <span>${r.name}</span>
          </button>
        `
        )
        .join("");

      previewChipsEl.addEventListener("click", (e) => {
        const chip = e.target.closest("[data-jump-rakan]");
        if (!chip) return;
        const rakanId = chip.getAttribute("data-jump-rakan");
        const rakanSec = document.getElementById("rakan");
        if (rakanSec) rakanSec.scrollIntoView({ behavior: "smooth" });
        if (window.SRM_CAROUSEL) {
          window.SRM_CAROUSEL.goToRakanById(rakanId);
        }
      });
    }

    // Home Latest Activity Preview (Top 3 latest activities from central data)
    const homeActGrid = document.getElementById("home-latest-activities-grid");
    if (homeActGrid) {
      const latestThree = getSortedActivities().slice(0, 3);
      homeActGrid.innerHTML = latestThree.map((act) => createActivityCardHTML(act)).join("");
    }
  }

  /* --------------------------------------------------------------------------
   * 3. AKTIVITI SECTION: FILTERING & GALLERY
   * -------------------------------------------------------------------------- */
  function createActivityCardHTML(act) {
    const rakan = getRakanById(act.rakanId) || {
      name: "Program SRM UKM",
      shortName: "SRM",
      accentColor: "#0066CC",
      accentLight: "#E8F2FF",
      fallbackEmoji: "📸"
    };

    return `
      <article class="aktiviti-card">
        <div class="aktiviti-img-wrap">
          <img
            src="${act.image}"
            alt="${act.title}"
            loading="lazy"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
          <div
            class="aktiviti-img-fallback"
            style="display: none; --fallback-light: ${rakan.accentLight};"
          >
            <span style="font-size: 2.4rem; margin-bottom: 8px;" aria-hidden="true">${rakan.fallbackEmoji}</span>
            <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-secondary);">
              Pratonton Gambar Aktiviti
            </span>
            <span style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">
              Letakkan fail di ${act.image}
            </span>
          </div>
          <span
            class="aktiviti-badge-floating"
            style="--badge-color: ${rakan.accentColor};"
          >
            ${rakan.name}
          </span>
          ${
            act.isSample
              ? `<span class="aktiviti-sample-tag">CONTOH SUSUN ATUR</span>`
              : ""
          }
        </div>

        <div class="aktiviti-body">
          <div class="aktiviti-meta">
            <span>📅 ${act.displayDate || act.date}</span>
            <span>📍 ${act.location}</span>
          </div>
          <h3 class="aktiviti-title">${act.title}</h3>
          <p class="aktiviti-desc">${act.shortDescription}</p>
          <button
            type="button"
            class="aktiviti-link-btn"
            data-open-aktiviti-modal="${act.id}"
          >
            <span>Lihat Butiran</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </article>
    `;
  }

  function renderAktivitiSection() {
    const filterBar = document.getElementById("aktiviti-filter-bar");
    const gridEl = document.getElementById("aktiviti-gallery-grid");
    const sampleNotice = document.getElementById("aktiviti-sample-notice");
    const rakanList = window.RAKAN_DATA || [];
    const sortedActivities = getSortedActivities();

    // Show/hide sample banner depending on whether any sample activities exist
    if (sampleNotice) {
      const hasSamples = sortedActivities.some((a) => a.isSample);
      sampleNotice.style.display = hasSamples ? "flex" : "none";
    }

    // Build filter buttons
    if (filterBar) {
      const allBtnHTML = `
        <button
          type="button"
          class="filter-btn ${activeFilterRakanId === "all" ? "active" : ""}"
          data-filter-rakan="all"
        >
          Semua Aktiviti
        </button>
      `;

      const rakanBtnsHTML = rakanList
        .map(
          (r) => `
          <button
            type="button"
            class="filter-btn ${activeFilterRakanId === r.id ? "active" : ""}"
            data-filter-rakan="${r.id}"
          >
            ${r.id === "rakan-kesembilan" && !r.isConfigured ? "Rakan Kesembilan" : r.name}
          </button>
        `
        )
        .join("");

      filterBar.innerHTML = allBtnHTML + rakanBtnsHTML;
    }

    // Filter and render activity cards
    if (gridEl) {
      const filtered =
        activeFilterRakanId === "all"
          ? sortedActivities
          : sortedActivities.filter((a) => a.rakanId === activeFilterRakanId);

      if (!filtered.length) {
        const selectedRakan = getRakanById(activeFilterRakanId);
        gridEl.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 56px 24px; background: var(--bg-elevated); border-radius: var(--radius-md); border: 1px dashed var(--border-strong);">
            <div style="font-size: 2.2rem; margin-bottom: 12px;">📂</div>
            <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 8px;">
              Tiada Aktiviti Dipaparkan Untuk Kategori Ini
            </h3>
            <p style="font-size: 0.92rem; color: var(--text-secondary); max-width: 520px; margin: 0 auto 20px;">
              Anda boleh menambah rekod program bagi <strong>${
                selectedRakan ? selectedRakan.name : "kategori ini"
              }</strong> pada bila-bila masa di dalam fail <code>data/aktiviti-data.js</code>.
            </p>
            <button type="button" class="btn btn-secondary btn-sm" id="reset-filter-btn">
              Lihat Semua Aktiviti
            </button>
          </div>
        `;
        const resetBtn = document.getElementById("reset-filter-btn");
        if (resetBtn) {
          resetBtn.addEventListener("click", () => {
            activeFilterRakanId = "all";
            renderAktivitiSection();
          });
        }
      } else {
        gridEl.innerHTML = filtered.map((act) => createActivityCardHTML(act)).join("");
      }
    }
  }

  function bindAktivitiEvents() {
    const filterBar = document.getElementById("aktiviti-filter-bar");
    if (filterBar) {
      filterBar.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-filter-rakan]");
        if (!btn) return;
        activeFilterRakanId = btn.getAttribute("data-filter-rakan");
        renderAktivitiSection();
      });
    }

    // Delegate activity detail modal clicks across the whole document (Home + Aktiviti section)
    document.addEventListener("click", (e) => {
      const actBtn = e.target.closest("[data-open-aktiviti-modal]");
      if (!actBtn) return;
      const actId = actBtn.getAttribute("data-open-aktiviti-modal");
      openAktivitiModal(actId);
    });
  }

  /* --------------------------------------------------------------------------
   * 4. EXPANDED MODAL VIEWS (RAKAN & AKTIVITI)
   * -------------------------------------------------------------------------- */
  function openModalWithHTML(innerHTML) {
    const backdrop = document.getElementById("detail-modal-backdrop");
    const content = document.getElementById("detail-modal-content");
    const closeBtn = document.getElementById("detail-modal-close");
    if (!backdrop || !content) return;

    content.innerHTML = innerHTML;
    backdrop.classList.add("open");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    const backdrop = document.getElementById("detail-modal-backdrop");
    if (!backdrop) return;
    backdrop.classList.remove("open");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  function openRakanModal(rakanId) {
    const rakan = getRakanById(rakanId);
    if (!rakan) return;

    const html = `
      <div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 24px; margin-bottom: 28px;">
        <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
          <div
            style="width: 84px; height: 84px; border-radius: 20px; background: ${rakan.accentLight}; display: flex; align-items: center; justify-content: center; padding: 12px; overflow: hidden;"
          >
            <img
              src="${rakan.logo}"
              alt="${rakan.name}"
              style="width: 100%; height: 100%; object-fit: contain;"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
            />
            <span style="display: none; font-size: 2.2rem;">${rakan.fallbackEmoji}</span>
          </div>
          <div>
            <span
              style="display: inline-block; font-size: 0.75rem; font-weight: 800; padding: 4px 12px; border-radius: 999px; background: ${rakan.accentLight}; color: ${rakan.accentColor}; margin-bottom: 8px;"
            >
              PORTFOLIO ${rakan.number} • ${rakan.coreFocus}
            </span>
            <h2 style="font-size: clamp(1.75rem, 3vw, 2.3rem); font-weight: 800; color: var(--text-primary);">
              ${rakan.name}
            </h2>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 28px;">
        <h3 style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 10px;">
          Pengenalan & Fokus Portfolio
        </h3>
        <p style="font-size: 1.05rem; color: var(--text-primary); line-height: 1.75; margin-bottom: 14px;">
          ${rakan.shortDescription}
        </p>
        <p style="font-size: 0.98rem; color: var(--text-secondary); line-height: 1.75;">
          ${rakan.detailedExplanation}
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-bottom: 32px;">
        <div style="background: var(--bg-secondary); padding: 24px; border-radius: 18px;">
          <h4 style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: ${rakan.accentColor}; margin-bottom: 14px;">
            Fungsi Utama ${rakan.shortName}
          </h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
            ${rakan.functions
              .map(
                (fn) => `
                <li style="font-size: 0.92rem; display: flex; align-items: flex-start; gap: 8px;">
                  <span style="color: ${rakan.accentColor}; font-weight: 800;">✓</span>
                  <span>${fn}</span>
                </li>
              `
              )
              .join("")}
          </ul>
        </div>

        <div style="background: var(--bg-secondary); padding: 24px; border-radius: 18px;">
          <h4 style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: ${rakan.accentColor}; margin-bottom: 14px;">
            Contoh Aktiviti & Program
          </h4>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            ${rakan.examples
              .map(
                (ex) => `
                <span style="background: #ffffff; border: 1px solid var(--border-subtle); padding: 8px 14px; border-radius: 10px; font-size: 0.88rem; font-weight: 600;">
                  ${ex}
                </span>
              `
              )
              .join("")}
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
        <button
          type="button"
          class="btn btn-secondary btn-sm"
          id="modal-filter-rakan-activities"
          data-rakan-filter="${rakan.id}"
        >
          Lihat Aktiviti ${rakan.shortName}
        </button>
        <button
          type="button"
          class="btn btn-primary btn-sm"
          id="modal-return-carousel-btn"
        >
          Kembali ke Karusel Rakan
        </button>
      </div>
    `;

    openModalWithHTML(html);

    const returnBtn = document.getElementById("modal-return-carousel-btn");
    if (returnBtn) {
      returnBtn.addEventListener("click", closeModal);
    }

    const filterActBtn = document.getElementById("modal-filter-rakan-activities");
    if (filterActBtn) {
      filterActBtn.addEventListener("click", () => {
        activeFilterRakanId = rakan.id;
        renderAktivitiSection();
        closeModal();
        const actSec = document.getElementById("aktiviti");
        if (actSec) actSec.scrollIntoView({ behavior: "smooth" });
      });
    }
  }

  function openAktivitiModal(actId) {
    const act = (window.AKTIVITI_DATA || []).find((a) => a.id === actId);
    if (!act) return;
    const rakan = getRakanById(act.rakanId) || {
      name: "SRM UKM",
      accentColor: "#0066CC",
      accentLight: "#E8F2FF",
      fallbackEmoji: "📸"
    };

    const html = `
      <div style="margin-bottom: 24px;">
        <span
          style="display: inline-block; font-size: 0.75rem; font-weight: 800; padding: 5px 12px; border-radius: 999px; background: ${rakan.accentLight}; color: ${rakan.accentColor}; margin-bottom: 12px;"
        >
          ${rakan.name}
        </span>
        <h2 style="font-size: clamp(1.5rem, 2.6vw, 2rem); font-weight: 800; margin-bottom: 12px;">
          ${act.title}
        </h2>
        <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 0.9rem; font-weight: 600; color: var(--text-muted);">
          <span>📅 ${act.displayDate || act.date}</span>
          <span>📍 ${act.location}</span>
        </div>
      </div>

      <div style="aspect-ratio: 16 / 9; border-radius: 18px; overflow: hidden; background: var(--bg-secondary); margin-bottom: 24px; border: 1px solid var(--border-subtle);">
        <img
          src="${act.image}"
          alt="${act.title}"
          style="width: 100%; height: 100%; object-fit: cover;"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        <div style="display: none; width: 100%; height: 100%; flex-direction: column; align-items: center; justify-content: center; padding: 24px; text-align: center; background: ${rakan.accentLight};">
          <span style="font-size: 3rem; margin-bottom: 8px;">${rakan.fallbackEmoji}</span>
          <strong style="font-size: 0.95rem;">Ruang Gambar Program (${act.image})</strong>
          <span style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 4px;">
            Muat naik gambar sebenar ke dalam folder gambar/aktiviti/
          </span>
        </div>
      </div>

      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 0.82rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 8px;">
          Ringkasan & Butiran Program
        </h3>
        <p style="font-size: 1rem; color: var(--text-primary); line-height: 1.75; margin-bottom: 12px;">
          ${act.shortDescription}
        </p>
        <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.75;">
          ${act.fullDescription || ""}
        </p>
      </div>

      ${
        act.highlights && act.highlights.length
          ? `
        <div style="background: var(--bg-secondary); padding: 20px 24px; border-radius: 16px; margin-bottom: 24px;">
          <h4 style="font-size: 0.82rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 10px;">
            Sorotan Utama
          </h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${act.highlights
              .map(
                (h) => `
                <li style="font-size: 0.9rem; display: flex; gap: 8px;">
                  <span style="color: ${rakan.accentColor}; font-weight: 800;">•</span>
                  <span>${h}</span>
                </li>
              `
              )
              .join("")}
          </ul>
        </div>
      `
          : ""
      }

      <div style="text-align: right;">
        <button type="button" class="btn btn-primary btn-sm" id="modal-close-act-btn">
          Tutup Paparan
        </button>
      </div>
    `;

    openModalWithHTML(html);
    const closeActBtn = document.getElementById("modal-close-act-btn");
    if (closeActBtn) {
      closeActBtn.addEventListener("click", closeModal);
    }
  }

  function initModalSystem() {
    const backdrop = document.getElementById("detail-modal-backdrop");
    const closeBtn = document.getElementById("detail-modal-close");

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }
    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) closeModal();
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("modal-open")) {
        closeModal();
      }
    });
  }

  /* --------------------------------------------------------------------------
   * 5. CONTACT & SOCIAL MEDIA CONFIGURATION
   * -------------------------------------------------------------------------- */
  function renderSocialLinks() {
    const cfg = window.SRM_CONFIG || {};
    const social = cfg.socialLinks || {};

    const igHandleEl = document.getElementById("contact-ig-handle");
    const igLinkEl = document.getElementById("contact-ig-link");
    const footerIgEl = document.getElementById("footer-ig-link");

    if (social.instagram) {
      if (igHandleEl) igHandleEl.textContent = social.instagram.handle;
      if (igLinkEl) {
        igLinkEl.href = social.instagram.url;
        if (social.instagram.isConfigured) {
          igLinkEl.target = "_blank";
          igLinkEl.rel = "noopener noreferrer";
        }
      }
      if (footerIgEl) {
        footerIgEl.href = social.instagram.url;
        if (social.instagram.isConfigured) {
          footerIgEl.target = "_blank";
          footerIgEl.rel = "noopener noreferrer";
        }
      }
    }

    const ttHandleEl = document.getElementById("contact-tt-handle");
    const ttLinkEl = document.getElementById("contact-tt-link");
    const footerTtEl = document.getElementById("footer-tt-link");

    if (social.tiktok) {
      if (ttHandleEl) ttHandleEl.textContent = social.tiktok.handle;
      if (ttLinkEl) {
        ttLinkEl.href = social.tiktok.url;
        if (social.tiktok.isConfigured) {
          ttLinkEl.target = "_blank";
          ttLinkEl.rel = "noopener noreferrer";
        }
      }
      if (footerTtEl) {
        footerTtEl.href = social.tiktok.url;
        if (social.tiktok.isConfigured) {
          footerTtEl.target = "_blank";
          footerTtEl.rel = "noopener noreferrer";
        }
      }
    }

    // Dynamic Copyright Year
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }

  /* --------------------------------------------------------------------------
   * 6. SCROLL REVEAL ANIMATIONS
   * -------------------------------------------------------------------------- */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
   * INITIALIZE ENTIRE WEBSITE
   * -------------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    renderHomePreviews();
    if (window.SRM_CAROUSEL) window.SRM_CAROUSEL.init();
    renderAktivitiSection();
    bindAktivitiEvents();
    if (window.SRM_GAME) window.SRM_GAME.init();
    initModalSystem();
    renderSocialLinks();
    initScrollReveal();
  });

  window.SRM_APP = {
    openRakanModal,
    openAktivitiModal
  };
})();
