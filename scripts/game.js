/**
 * ============================================================================
 * SRM UKM - "TEKA RAKAN!" EMOJI GAME ENGINE (game.js)
 * ============================================================================
 * Menyokong Dwi-Bahasa (Bahasa Melayu & English) secara langsung pada setiap
 * skrin permainan, petunjuk, maklum balas dan keputusan akhir.
 */

(function () {
  const TOTAL_QUESTIONS_PER_ROUND = 15;

  let sessionQuestions = [];
  let currentQuestionIdx = 0;
  let score = 0;
  let hasAnsweredCurrent = false;
  let lastWasCorrect = false;
  let currentShuffledOptions = [];
  let lastSelectedRakanId = null;

  // DOM Elements
  let screenWelcome = null;
  let screenPlay = null;
  let screenResult = null;

  let progressTextEl = null;
  let scoreTextEl = null;
  let progressBarEl = null;
  let emojiFirstEl = null;
  let emojiSecondEl = null;
  let clueHintEl = null;
  let optionsGridEl = null;
  let feedbackBoxEl = null;
  let feedbackTitleEl = null;
  let feedbackDescEl = null;
  let nextQuestionBtn = null;

  let finalScoreNumEl = null;
  let finalScoreTotalEl = null;
  let finalTierBadgeEl = null;
  let finalTierMessageEl = null;

  function getLang() {
    return (window.SRM_APP && window.SRM_APP.getLang()) || "ms";
  }

  function localize(field) {
    if (!field) return "";
    if (typeof field === "string") return field;
    const lang = getLang();
    return field[lang] || field.ms || "";
  }

  function getDict() {
    const lang = getLang();
    return (
      (window.SRM_CONFIG &&
        window.SRM_CONFIG.i18n &&
        window.SRM_CONFIG.i18n[lang] &&
        window.SRM_CONFIG.i18n[lang].game) ||
      {}
    );
  }

  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function isNinthPortfolioReady() {
    const rakanNine = (window.RAKAN_DATA || []).find((r) => r.id === "rakan-kesembilan");
    const cfg = window.SRM_CONFIG && window.SRM_CONFIG.ninthPortfolioConfig;
    return Boolean((rakanNine && rakanNine.isConfigured) || (cfg && cfg.includeInGame));
  }

  function switchScreen(targetScreen) {
    [screenWelcome, screenPlay, screenResult].forEach((el) => {
      if (!el) return;
      el.classList.toggle("active", el === targetScreen);
    });
  }

  function startNewSession() {
    const allQuestions = window.GAME_QUESTIONS || [];
    const allowNinth = isNinthPortfolioReady();

    const eligibleQuestions = allQuestions.filter((q) => {
      if (q.correctRakanId === "rakan-kesembilan" && !allowNinth) {
        return false;
      }
      return true;
    });

    sessionQuestions = shuffleArray(eligibleQuestions).slice(
      0,
      Math.min(TOTAL_QUESTIONS_PER_ROUND, eligibleQuestions.length)
    );

    currentQuestionIdx = 0;
    score = 0;
    hasAnsweredCurrent = false;
    lastSelectedRakanId = null;

    switchScreen(screenPlay);
    prepareNewQuestion();
  }

  function renderOptionLogo(rakan) {
    const nameText = localize(rakan.name);
    return `
      <div class="game-opt-logo">
        <img
          src="${rakan.logo}"
          alt="${nameText}"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        <span
          style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 800; color: #0f172a;"
          aria-hidden="true"
        >
          ${rakan.number}
        </span>
      </div>
    `;
  }

  function prepareNewQuestion() {
    hasAnsweredCurrent = false;
    lastSelectedRakanId = null;
    currentShuffledOptions = shuffleArray(window.RAKAN_DATA || []);
    renderCurrentQuestionState();
  }

  function renderCurrentQuestionState() {
    const q = sessionQuestions[currentQuestionIdx];
    const dict = getDict();
    if (!q) return;

    const total = sessionQuestions.length;

    if (progressTextEl) {
      progressTextEl.textContent = `${dict.questionCounter || "Soalan"} ${currentQuestionIdx + 1} / ${total}`;
    }
    if (scoreTextEl) {
      scoreTextEl.textContent = `${dict.scoreLabel || "Skor"}: ${score}`;
    }
    if (progressBarEl) {
      const pct = ((currentQuestionIdx + 1) / total) * 100;
      progressBarEl.style.width = `${pct}%`;
    }

    if (emojiFirstEl) emojiFirstEl.textContent = q.emojis[0] || "✨";
    if (emojiSecondEl) emojiSecondEl.textContent = q.emojis[1] || "🌟";
    if (clueHintEl) {
      clueHintEl.textContent = `${dict.cluePrefix || "Petunjuk"}: ${localize(q.clueLabel)}`;
    }

    const allowNinth = isNinthPortfolioReady();
    if (!currentShuffledOptions.length) {
      currentShuffledOptions = shuffleArray(window.RAKAN_DATA || []);
    }

    if (optionsGridEl) {
      optionsGridEl.innerHTML = currentShuffledOptions
        .map((rakan) => {
          const isPlaceholderNinth = rakan.id === "rakan-kesembilan" && !allowNinth;
          const displayTitle = isPlaceholderNinth
            ? localize(rakan.shortName)
            : localize(rakan.name);
          const displaySub = isPlaceholderNinth
            ? dict.lockedSlotText || "Menunggu Konfigurasi"
            : localize(rakan.shortName);

          let stateClass = "";
          if (hasAnsweredCurrent) {
            if (rakan.id === q.correctRakanId) {
              stateClass = "is-correct";
            } else if (rakan.id === lastSelectedRakanId && !lastWasCorrect) {
              stateClass = "is-wrong";
            }
          }

          return `
            <button
              type="button"
              class="game-option-btn ${isPlaceholderNinth ? "is-locked-placeholder" : ""} ${stateClass}"
              data-answer-rakan="${rakan.id}"
              ${isPlaceholderNinth || hasAnsweredCurrent ? "disabled" : ""}
            >
              ${renderOptionLogo(rakan)}
              <div>
                <div class="game-opt-name">${displayTitle}</div>
                <span class="game-opt-sub">${displaySub}</span>
              </div>
            </button>
          `;
        })
        .join("");
    }

    if (feedbackBoxEl && feedbackTitleEl && feedbackDescEl) {
      if (hasAnsweredCurrent) {
        feedbackBoxEl.className = `game-feedback-box show ${lastWasCorrect ? "correct" : "wrong"}`;
        feedbackTitleEl.textContent = lastWasCorrect
          ? dict.correctTitle || "BETUL!"
          : dict.wrongTitle || "Belum tepat!";
        feedbackDescEl.textContent = localize(q.explanation);
        if (nextQuestionBtn) {
          const isLast = currentQuestionIdx >= sessionQuestions.length - 1;
          nextQuestionBtn.textContent = isLast
            ? dict.finishBtn || "Lihat Keputusan Akhir"
            : `${dict.nextBtn || "Soalan Seterusnya"} →`;
        }
      } else {
        feedbackBoxEl.className = "game-feedback-box";
      }
    }
  }

  function handleSelectAnswer(selectedRakanId) {
    if (hasAnsweredCurrent) return;
    const q = sessionQuestions[currentQuestionIdx];
    if (!q) return;

    hasAnsweredCurrent = true;
    lastSelectedRakanId = selectedRakanId;
    lastWasCorrect = selectedRakanId === q.correctRakanId;

    if (lastWasCorrect) {
      score += 1;
    }

    renderCurrentQuestionState();
    if (nextQuestionBtn) {
      nextQuestionBtn.focus();
    }
  }

  function getAchievementTier(finalScore) {
    const dict = getDict();
    if (finalScore >= 11) {
      return {
        badge: dict.tierHighBadge || "Juara Rakan! (11–15)",
        message: dict.tierHighMsg || ""
      };
    }
    if (finalScore >= 6) {
      return {
        badge: dict.tierMidBadge || "Anda Mula Mengenali Rakan! (6–10)",
        message: dict.tierMidMsg || ""
      };
    }
    return {
      badge: dict.tierLowBadge || "Teruskan Meneroka! (0–5)",
      message: dict.tierLowMsg || ""
    };
  }

  function showFinalResults() {
    switchScreen(screenResult);
    renderFinalResultsText();
  }

  function renderFinalResultsText() {
    const dict = getDict();
    const total = sessionQuestions.length || TOTAL_QUESTIONS_PER_ROUND;
    const tier = getAchievementTier(score);

    if (finalScoreNumEl) finalScoreNumEl.textContent = String(score);
    if (finalScoreTotalEl) {
      finalScoreTotalEl.textContent = `${dict.outOfText || "daripada"} ${total} ${dict.questionsWord || "soalan"}`;
    }
    if (finalTierBadgeEl) finalTierBadgeEl.textContent = tier.badge;
    if (finalTierMessageEl) finalTierMessageEl.textContent = tier.message;
  }

  function init() {
    screenWelcome = document.getElementById("game-screen-welcome");
    screenPlay = document.getElementById("game-screen-play");
    screenResult = document.getElementById("game-screen-result");

    progressTextEl = document.getElementById("game-progress-text");
    scoreTextEl = document.getElementById("game-score-text");
    progressBarEl = document.getElementById("game-progress-bar");
    emojiFirstEl = document.getElementById("game-emoji-1");
    emojiSecondEl = document.getElementById("game-emoji-2");
    clueHintEl = document.getElementById("game-clue-hint");
    optionsGridEl = document.getElementById("game-options-grid");
    feedbackBoxEl = document.getElementById("game-feedback-box");
    feedbackTitleEl = document.getElementById("game-feedback-title");
    feedbackDescEl = document.getElementById("game-feedback-desc");
    nextQuestionBtn = document.getElementById("game-next-btn");

    finalScoreNumEl = document.getElementById("game-final-score");
    finalScoreTotalEl = document.getElementById("game-final-total");
    finalTierBadgeEl = document.getElementById("game-tier-badge");
    finalTierMessageEl = document.getElementById("game-tier-message");

    const startBtn = document.getElementById("game-start-btn");
    const playAgainBtn = document.getElementById("game-restart-btn");

    if (startBtn) {
      startBtn.addEventListener("click", startNewSession);
    }

    if (playAgainBtn) {
      playAgainBtn.addEventListener("click", startNewSession);
    }

    if (optionsGridEl) {
      optionsGridEl.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-answer-rakan]");
        if (!btn || btn.disabled) return;
        const selectedId = btn.getAttribute("data-answer-rakan");
        handleSelectAnswer(selectedId);
      });
    }

    if (nextQuestionBtn) {
      nextQuestionBtn.addEventListener("click", () => {
        if (currentQuestionIdx < sessionQuestions.length - 1) {
          currentQuestionIdx += 1;
          prepareNewQuestion();
        } else {
          showFinalResults();
        }
      });
    }
  }

  window.SRM_GAME = {
    init,
    refreshLanguage() {
      if (screenPlay && screenPlay.classList.contains("active")) {
        renderCurrentQuestionState();
      } else if (screenResult && screenResult.classList.contains("active")) {
        renderFinalResultsText();
      }
    }
  };
})();
