/**
 * ============================================================================
 * SRM UKM - MAIN APPLICATION & DUAL-LANGUAGE CONTROLLER (app.js)
 * ============================================================================
 * Mengawal:
 * - Penukaran Bahasa Segera: Bahasa Melayu (BM) <-> English (EN)
 * - Paparan Logo Rasmi Rakan pada Hero Showcase, Preview Chips & Filter Bar
 * - Navigasi Responsif & Scroll Spy
 * - Galeri Aktiviti, Penapis Kategori & Modal Terperinci
 * - Pautan Rasmi Instagram (@srmukm) & TikTok (@srmukm)
 */

(function () {
  let currentLang = "ms";
  let activeFilterRakanId = "all";
  let openModalContext = null; // { type: 'rakan' | 'aktiviti', id: string }

  try {
    const saved = localStorage.getItem("srm_ukm_lang");
    if (saved === "ms" || saved === "en") {
      currentLang = saved;
    }
  } catch (e) {
    // Ignore storage access errors in restricted environments
  }

  function getLang() {
    return currentLang;
  }

  function localize(field) {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[currentLang] || field.ms || "";
  }

  function getI18nSection(sectionKey) {
    return (
      (window.SRM_CONFIG &&
        window.SRM_CONFIG.i18n &&
        window.SRM_CONFIG.i18n[currentLang] &&
        window.SRM_CONFIG.i18n[currentLang][sectionKey]) ||
      {}
    );
  }

  function resolveKeyPath(obj, pathStr) {
    return pathStr.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : null), obj);
  }

  function getRakanById(rakanId) {
    return (window.RAKAN_DATA || []).find((r) => r.id === rakanId) || null;
  }

  function getSortedActivities() {
    const list = [...(window.AKTIVITI_DATA || [])];
    return list.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  /* --------------------------------------------------------------------------
   * 1. DUAL-LANGUAGE (BM / EN) ENGINE
   * -------------------------------------------------------------------------- */
  function applyStaticTranslations() {
    document.documentElement.lang = currentLang === "en" ? "en" : "ms";
    const dict = (window.SRM_CONFIG && window.SRM_CONFIG.i18n && window.SRM_CONFIG.i18n[currentLang]) || {};

    // Update all DOM nodes with data-i18n="section.key"
    const nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach((node) => {
      const keyPath = node.getAttribute("data-i18n");
      const translated = resolveKeyPath(dict, keyPath);
      if (translated !== null && translated !== undefined) {
        node.textContent = translated;
      }
    });

    // Update segmented BM | EN button active pills
    const pillMs = document.getElementById("lang-opt-ms");
    const pillEn = document.getElementById("lang-opt-en");
    const langBtn = document.getElementById("lang-switch-btn");

    if (pillMs) pillMs.classList.toggle("active", currentLang === "ms");
    if (pillEn) pillEn.classList.toggle("active", currentLang === "en");
    if (langBtn && dict.nav && dict.nav.langTooltip) {
      langBtn.setAttribute("title", dict.nav.langTooltip);
      langBtn.setAttribute("aria-label", dict.nav.langTooltip);
    }
  }

  function setLanguage(newLang) {
    if (newLang !== "ms" && newLang !== "en") return;
    currentLang = newLang;
    try {
      localStorage.setItem("srm_ukm_lang", currentLang);
    } catch (e) {
      // Ignore storage errors
    }

    applyStaticTranslations();
    renderHomePreviews();
    if (window.SRM_CAROUSEL) window.SRM_CAROUSEL.refreshLanguage();
    renderAktivitiSection();
    if (window.SRM_GAME) window.SRM_GAME.refreshLanguage();
    renderSocialLinks();

    // If a modal is currently open, re-render it in the new language
    if (openModalContext && document.body.classList.contains("modal-open")) {
      if (openModalContext.type === "rakan") {
        openRakanModal(openModalContext.id);
      } else if (openModalContext.type === "aktiviti") {
        openAktivitiModal(openModalContext.id);
      }
    }
  }

  function initLanguageSwitcher() {
    const langBtn = document.getElementById("lang-switch-btn");
    if (!langBtn) return;

    langBtn.addEventListener("click", () => {
      const nextLang = currentLang === "ms" ? "en" : "ms";
      setLanguage(nextLang);
    });
  }

  /* --------------------------------------------------------------------------
   * 2. NAVIGATION & SCROLL SPY
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
   * 3. HOME SECTION: OFFICIAL RAKAN LOGO SHOWCASE & PREVIEWS
   * -------------------------------------------------------------------------- */
  function renderHomePreviews() {
    const rakanList = window.RAKAN_DATA || [];

    // 1. Hero Interactive 3x3 Official Rakan Logo Showcase (NO EMOJIS!)
    const orbitGrid = document.getElementById("hero-orbit-grid");
    if (orbitGrid) {
      orbitGrid.innerHTML = rakanList
        .map((r) => {
          const shortName = localize(r.shortName);
          const fullName = localize(r.name);
          return `
            <button
              type="button"
              class="hero-orbit-item"
              data-jump-rakan="${r.id}"
              style="--tile-accent: ${r.accentColor}; --tile-light: ${r.accentLight};"
              title="${fullName}"
              aria-label="${fullName}"
            >
              <div class="hero-orbit-logo-wrap">
                <img
                  src="${r.logo}"
                  alt="${fullName}"
                  loading="eager"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                />
                <span class="hero-orbit-svg-fallback" style="display: none;">
                  ${r.number}
                </span>
              </div>
              <span class="hero-orbit-name">${shortName}</span>
            </button>
          `;
        })
        .join("");
    }

    // 2. Home Rakan Preview Chips with Official Logos
    const previewChipsEl = document.getElementById("home-rakan-preview-chips");
    if (previewChipsEl) {
      previewChipsEl.innerHTML = rakanList
        .map((r) => {
          const fullName = localize(r.name);
          const shortName = localize(r.shortName);
          const label = r.id === "rakan-kesembilan" && !r.isConfigured ? shortName : fullName;
          return `
            <button
              type="button"
              class="rakan-mini-chip"
              data-jump-rakan="${r.id}"
            >
              <img
                src="${r.logo}"
                alt=""
                class="rakan-mini-chip-img"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block';"
              />
              <span
                style="display: none; width: 10px; height: 10px; border-radius: 50%; background: ${r.accentColor};"
              ></span>
              <span>${label}</span>
            </button>
          `;
        })
        .join("");
    }

    // 3. Home Latest Activity Preview (Top 3 latest activities)
    const homeActGrid = document.getElementById("home-latest-activities-grid");
    if (homeActGrid) {
      const latestThree = getSortedActivities().slice(0, 3);
      homeActGrid.innerHTML = latestThree.map((act) => createActivityCardHTML(act)).join("");
    }
  }

  function bindHomePreviewEvents() {
    document.addEventListener("click", (e) => {
      const jumpBtn = e.target.closest("[data-jump-rakan]");
      if (!jumpBtn) return;
      const rakanId = jumpBtn.getAttribute("data-jump-rakan");
      const rakanSec = document.getElementById("rakan");
      if (rakanSec) rakanSec.scrollIntoView({ behavior: "smooth" });
      if (window.SRM_CAROUSEL) {
        window.SRM_CAROUSEL.goToRakanById(rakanId);
      }
    });
  }

  /* --------------------------------------------------------------------------
   * 4. AKTIVITI SECTION: FILTERING & EDITORIAL GALLERY
   * -------------------------------------------------------------------------- */
  function createActivityCardHTML(act) {
    const dict = getI18nSection("aktiviti");
    const rakan = getRakanById(act.rakanId) || {
      name: { ms: "Program SRM UKM", en: "SRM UKM Programme" },
      shortName: { ms: "SRM", en: "SRM" },
      logo: "./gambar/logo/srm-logo.png",
      accentColor: "#163F86",
      accentLight: "#EBF1FA"
    };

    const titleText = localize(act.title);
    const dateText = localize(act.displayDate) || act.date;
    const locText = localize(act.location);
    const descText = localize(act.shortDescription);
    const rakanNameText = localize(rakan.name);

    return `
      <article class="aktiviti-card">
        <div class="aktiviti-img-wrap">
          <img
            src="${act.image}"
            alt="${titleText}"
            class="aktiviti-cover-img"
            loading="lazy"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
          <div
            class="aktiviti-img-fallback"
            style="display: none; --fallback-light: ${rakan.accentLight};"
          >
            <img
              src="${rakan.logo}"
              alt=""
              class="aktiviti-fallback-emblem"
              onerror="this.style.display='none';"
            />
            <span style="font-size: 0.78rem; font-weight: 700; color: var(--ink-primary);">
              ${dict.missingImgTitle || "Pratonton Ruang Gambar"}
            </span>
            <span style="font-size: 0.7rem; color: var(--ink-muted); margin-top: 2px;">
              ${dict.missingImgSub || "Letakkan fail di"} <code>${act.image}</code>
            </span>
          </div>
          <span
            class="aktiviti-badge-floating"
            style="--badge-color: ${rakan.accentColor};"
          >
            ${rakanNameText}
          </span>
          ${
            act.isSample
              ? `<span class="aktiviti-sample-tag">${dict.sampleBadge || "CONTOH SUSUN ATUR"}</span>`
              : ""
          }
        </div>

        <div class="aktiviti-body">
          <div class="aktiviti-meta">
            <span class="aktiviti-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>${dateText}</span>
            </span>
            <span class="aktiviti-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${locText}</span>
            </span>
          </div>
          <h3 class="aktiviti-title">${titleText}</h3>
          <p class="aktiviti-desc">${descText}</p>
          <button
            type="button"
            class="aktiviti-link-btn"
            data-open-aktiviti-modal="${act.id}"
          >
            <span>${dict.viewDetailsBtn || "Lihat Butiran"}</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
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
    const dict = getI18nSection("aktiviti");

    if (sampleNotice) {
      const hasSamples = sortedActivities.some((a) => a.isSample);
      sampleNotice.style.display = hasSamples ? "flex" : "none";
    }

    if (filterBar) {
      const allBtnHTML = `
        <button
          type="button"
          class="filter-btn ${activeFilterRakanId === "all" ? "active" : ""}"
          data-filter-rakan="all"
        >
          <span>${dict.filterAll || "Semua Aktiviti"}</span>
        </button>
      `;

      const rakanBtnsHTML = rakanList
        .map((r) => {
          const label =
            r.id === "rakan-kesembilan" && !r.isConfigured
              ? localize(r.shortName)
              : localize(r.name);
          return `
            <button
              type="button"
              class="filter-btn ${activeFilterRakanId === r.id ? "active" : ""}"
              data-filter-rakan="${r.id}"
            >
              <img
                src="${r.logo}"
                alt=""
                class="filter-btn-logo"
                onerror="this.style.display='none';"
              />
              <span>${label}</span>
            </button>
          `;
        })
        .join("");

      filterBar.innerHTML = allBtnHTML + rakanBtnsHTML;
    }

    if (gridEl) {
      const filtered =
        activeFilterRakanId === "all"
          ? sortedActivities
          : sortedActivities.filter((a) => a.rakanId === activeFilterRakanId);

      if (!filtered.length) {
        gridEl.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 56px 24px; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px dashed var(--border-strong);">
            <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 8px;">
              ${dict.emptyTitle || "Tiada Rekod Aktiviti"}
            </h3>
            <p style="font-size: 0.92rem; color: var(--ink-secondary); max-width: 520px; margin: 0 auto 20px;">
              ${dict.emptyDesc || ""}
            </p>
            <button type="button" class="btn btn-secondary btn-sm" id="reset-filter-btn">
              ${dict.resetFilterBtn || "Papar Semua Aktiviti"}
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

    document.addEventListener("click", (e) => {
      const actBtn = e.target.closest("[data-open-aktiviti-modal]");
      if (!actBtn) return;
      const actId = actBtn.getAttribute("data-open-aktiviti-modal");
      openAktivitiModal(actId);
    });
  }

  /* --------------------------------------------------------------------------
   * 5. EXPANDED MODAL VIEWS (RAKAN & AKTIVITI)
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
    openModalContext = null;
  }

  function openRakanModal(rakanId) {
    const rakan = getRakanById(rakanId);
    if (!rakan) return;
    openModalContext = { type: "rakan", id: rakanId };

    const dict = getI18nSection("rakan");
    const nameText = localize(rakan.name);
    const focusText = localize(rakan.coreFocus);
    const shortDesc = localize(rakan.shortDescription);
    const detailedDesc = localize(rakan.detailedExplanation);
    const functionsArr = localize(rakan.functions) || [];
    const examplesArr = localize(rakan.examples) || [];

    const html = `
      <div style="border-bottom: 1px solid var(--border-hairline); padding-bottom: 24px; margin-bottom: 28px;">
        <div style="display: flex; align-items: center; gap: 22px; flex-wrap: wrap;">
          <div
            style="width: 88px; height: 88px; border-radius: 50%; background: #ffffff; border: 1px solid var(--border-strong); box-shadow: var(--shadow-sm); display: flex; align-items: center; justify-content: center; padding: 4px; overflow: hidden;"
          >
            <img
              src="${rakan.logo}"
              alt="${nameText}"
              style="width: 100%; height: 100%; object-fit: contain; border-radius: 50%;"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            />
            <span style="display: none; font-size: 1.3rem; font-weight: 800; color: ${rakan.accentColor};">
              ${rakan.number}
            </span>
          </div>
          <div>
            <span
              style="display: inline-block; font-size: 0.72rem; font-weight: 800; padding: 4px 12px; border-radius: 999px; background: ${rakan.accentLight}; color: ${rakan.accentColor}; margin-bottom: 8px; letter-spacing: 0.06em; text-transform: uppercase;"
            >
              ${dict.portfolioLabel || "PORTFOLIO"} ${rakan.number} • ${focusText}
            </span>
            <h2 style="font-size: clamp(1.75rem, 3vw, 2.35rem); font-weight: 800; color: var(--ink-primary);">
              ${nameText}
            </h2>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 28px;">
        <h3 style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--ink-muted); margin-bottom: 10px;">
          ${dict.modalIntroLabel || "Pengenalan & Teras Portfolio"}
        </h3>
        <p style="font-size: 1.04rem; color: var(--ink-primary); font-weight: 500; line-height: 1.72; margin-bottom: 14px;">
          ${shortDesc}
        </p>
        <p style="font-size: 0.96rem; color: var(--ink-secondary); line-height: 1.75;">
          ${detailedDesc}
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-bottom: 32px;">
        <div style="background: var(--bg-canvas); border: 1px solid var(--border-hairline); padding: 24px; border-radius: 20px;">
          <h4 style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: ${rakan.accentColor}; margin-bottom: 14px;">
            ${dict.modalFunctionsLabel || "Senarai Fungsi Utama"}
          </h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
            ${functionsArr
              .map(
                (fn) => `
                <li style="font-size: 0.91rem; display: flex; align-items: flex-start; gap: 10px;">
                  <span style="color: ${rakan.accentColor}; font-weight: 800;">✓</span>
                  <span>${fn}</span>
                </li>
              `
              )
              .join("")}
          </ul>
        </div>

        <div style="background: var(--bg-canvas); border: 1px solid var(--border-hairline); padding: 24px; border-radius: 20px;">
          <h4 style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: ${rakan.accentColor}; margin-bottom: 14px;">
            ${dict.modalExamplesLabel || "Contoh Aktiviti & Program"}
          </h4>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            ${examplesArr
              .map(
                (ex) => `
                <span style="background: #ffffff; border: 1px solid var(--border-hairline); padding: 8px 14px; border-radius: 10px; font-size: 0.86rem; font-weight: 600;">
                  ${ex}
                </span>
              `
              )
              .join("")}
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding-top: 20px; border-top: 1px solid var(--border-hairline);">
        <button
          type="button"
          class="btn btn-secondary btn-sm"
          id="modal-filter-rakan-activities"
        >
          ${dict.modalFilterActBtn || "Lihat Aktiviti Portfolio Ini"}
        </button>
        <button
          type="button"
          class="btn btn-primary btn-sm"
          id="modal-return-carousel-btn"
        >
          ${dict.modalCloseBtn || "Kembali ke Karusel"}
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
    openModalContext = { type: "aktiviti", id: actId };

    const dict = getI18nSection("aktiviti");
    const rakan = getRakanById(act.rakanId) || {
      name: { ms: "SRM UKM", en: "SRM UKM" },
      logo: "./gambar/logo/srm-logo.png",
      accentColor: "#163F86",
      accentLight: "#EBF1FA"
    };

    const titleText = localize(act.title);
    const dateText = localize(act.displayDate) || act.date;
    const locText = localize(act.location);
    const shortDesc = localize(act.shortDescription);
    const fullDesc = localize(act.fullDescription);
    const highlightsArr = localize(act.highlights) || [];
    const rakanNameText = localize(rakan.name);

    const html = `
      <div style="margin-bottom: 24px;">
        <span
          style="display: inline-block; font-size: 0.74rem; font-weight: 800; padding: 5px 12px; border-radius: 999px; background: ${rakan.accentLight}; color: ${rakan.accentColor}; margin-bottom: 12px;"
        >
          ${rakanNameText}
        </span>
        <h2 style="font-size: clamp(1.5rem, 2.6vw, 2.05rem); font-weight: 800; margin-bottom: 12px;">
          ${titleText}
        </h2>
        <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 0.88rem; font-weight: 600; color: var(--ink-muted);">
          <span>${dateText}</span>
          <span>•</span>
          <span>${locText}</span>
        </div>
      </div>

      <div style="aspect-ratio: 16 / 9; border-radius: 18px; overflow: hidden; background: var(--bg-canvas); margin-bottom: 24px; border: 1px solid var(--border-hairline);">
        <img
          src="${act.image}"
          alt="${titleText}"
          style="width: 100%; height: 100%; object-fit: cover;"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        <div style="display: none; width: 100%; height: 100%; flex-direction: column; align-items: center; justify-content: center; padding: 24px; text-align: center; background: ${rakan.accentLight};">
          <img
            src="${rakan.logo}"
            alt=""
            style="width: 68px; height: 68px; border-radius: 50%; background: #fff; padding: 4px; margin-bottom: 10px; object-fit: contain;"
            onerror="this.style.display='none';"
          />
          <strong style="font-size: 0.95rem;">${dict.missingImgTitle || "Ruang Gambar"} (${act.image})</strong>
        </div>
      </div>

      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink-muted); margin-bottom: 8px;">
          ${dict.modalOverviewLabel || "Ringkasan & Butiran Program"}
        </h3>
        <p style="font-size: 1rem; color: var(--ink-primary); font-weight: 500; line-height: 1.72; margin-bottom: 12px;">
          ${shortDesc}
        </p>
        <p style="font-size: 0.94rem; color: var(--ink-secondary); line-height: 1.75;">
          ${fullDesc}
        </p>
      </div>

      ${
        highlightsArr.length
          ? `
        <div style="background: var(--bg-canvas); border: 1px solid var(--border-hairline); padding: 20px 24px; border-radius: 16px; margin-bottom: 24px;">
          <h4 style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink-muted); margin-bottom: 10px;">
            ${dict.modalHighlightsLabel || "Sorotan Utama"}
          </h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${highlightsArr
              .map(
                (h) => `
                <li style="font-size: 0.9rem; display: flex; gap: 10px;">
                  <span style="color: ${rakan.accentColor}; font-weight: 800;">✓</span>
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
          ${dict.modalCloseBtn || "Tutup Paparan"}
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
   * 6. CONTACT & OFFICIAL SOCIAL MEDIA LINKS (@srmukm)
   * -------------------------------------------------------------------------- */
  function renderSocialLinks() {
    const cfg = window.SRM_CONFIG || {};
    const social = cfg.socialLinks || {};

    const igHandleEl = document.getElementById("contact-ig-handle");
    const igDescEl = document.getElementById("contact-ig-desc");
    const igLinkEl = document.getElementById("contact-ig-link");
    const footerIgEl = document.getElementById("footer-ig-link");

    if (social.instagram) {
      if (igHandleEl) igHandleEl.textContent = social.instagram.handle;
      if (igDescEl) igDescEl.textContent = localize(social.instagram.description);
      if (igLinkEl) {
        igLinkEl.href = social.instagram.url;
        igLinkEl.target = "_blank";
        igLinkEl.rel = "noopener noreferrer";
      }
      if (footerIgEl) {
        footerIgEl.href = social.instagram.url;
        footerIgEl.target = "_blank";
        footerIgEl.rel = "noopener noreferrer";
      }
    }

    const ttHandleEl = document.getElementById("contact-tt-handle");
    const ttDescEl = document.getElementById("contact-tt-desc");
    const ttLinkEl = document.getElementById("contact-tt-link");
    const footerTtEl = document.getElementById("footer-tt-link");

    if (social.tiktok) {
      if (ttHandleEl) ttHandleEl.textContent = social.tiktok.handle;
      if (ttDescEl) ttDescEl.textContent = localize(social.tiktok.description);
      if (ttLinkEl) {
        ttLinkEl.href = social.tiktok.url;
        ttLinkEl.target = "_blank";
        ttLinkEl.rel = "noopener noreferrer";
      }
      if (footerTtEl) {
        footerTtEl.href = social.tiktok.url;
        footerTtEl.target = "_blank";
        footerTtEl.rel = "noopener noreferrer";
      }
    }

    const yearEl = document.getElementById("current-year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }

  /* --------------------------------------------------------------------------
   * 7. SCROLL REVEAL ANIMATIONS
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
      { threshold: 0.1 }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
   * INITIALIZE ENTIRE WEBSITE
   * -------------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initLanguageSwitcher();
    applyStaticTranslations();
    renderHomePreviews();
    bindHomePreviewEvents();
    if (window.SRM_CAROUSEL) window.SRM_CAROUSEL.init();
    renderAktivitiSection();
    bindAktivitiEvents();
    if (window.SRM_GAME) window.SRM_GAME.init();
    initModalSystem();
    renderSocialLinks();
    initScrollReveal();
  });

  window.SRM_APP = {
    getLang,
    setLanguage,
    openRakanModal,
    openAktivitiModal
  };
})();
