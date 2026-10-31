/**
 * ============================================================================
 * SRM UKM - "TEKA RAKAN!" EMOJI GAME ENGINE (game.js)
 * ============================================================================
 * Ciri-ciri Permainan:
 * - Memilih 15 soalan secara rawak pada setiap sesi (tiada ulangan dalam satu sesi).
 * - Memaparkan DUA emoji sebagai petunjuk bagi setiap soalan.
 * - Menyediakan 9 pilihan portfolio Rakan dalam susunan rawak.
 * - Portfolio kesembilan hanya dijadikan soalan aktif apabila telah dikonfigurasi.
 * - Maklum balas segera dengan penerangan fungsi Rakan yang betul.
 * - Sistem pencapaian:
 *   0–5: Teruskan Meneroka!
 *   6–10: Anda Mula Mengenali Rakan!
 *   11–15: Juara Rakan!
 */

(function () {
  const TOTAL_QUESTIONS_PER_ROUND = 15;

  let sessionQuestions = [];
  let currentQuestionIdx = 0;
  let score = 0;
  let hasAnsweredCurrent = false;

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

    // Filter out questions for the 9th portfolio unless configured
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

    switchScreen(screenPlay);
    renderCurrentQuestion();
  }

  function renderOptionLogo(rakan) {
    return `
      <div class="game-opt-logo">
        <img
          src="${rakan.logo}"
          alt="${rakan.name}"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
        />
        <span style="display: none; font-size: 1.35rem;" aria-hidden="true">${rakan.fallbackEmoji}</span>
      </div>
    `;
  }

  function renderCurrentQuestion() {
    const q = sessionQuestions[currentQuestionIdx];
    if (!q) {
      showFinalResults();
      return;
    }

    hasAnsweredCurrent = false;
    const total = sessionQuestions.length;

    if (progressTextEl) {
      progressTextEl.textContent = `Soalan ${currentQuestionIdx + 1} / ${total}`;
    }
    if (scoreTextEl) {
      scoreTextEl.textContent = `Skor: ${score}`;
    }
    if (progressBarEl) {
      const pct = ((currentQuestionIdx + 1) / total) * 100;
      progressBarEl.style.width = `${pct}%`;
    }

    if (emojiFirstEl) emojiFirstEl.textContent = q.emojis[0] || "✨";
    if (emojiSecondEl) emojiSecondEl.textContent = q.emojis[1] || "🌟";
    if (clueHintEl) clueHintEl.textContent = `Petunjuk: ${q.clueLabel}`;

    // Hide feedback panel
    if (feedbackBoxEl) {
      feedbackBoxEl.className = "game-feedback-box";
    }

    // Randomise the 9 Rakan portfolio options
    const rakanList = window.RAKAN_DATA || [];
    const allowNinth = isNinthPortfolioReady();
    const shuffledOptions = shuffleArray(rakanList);

    if (optionsGridEl) {
      optionsGridEl.innerHTML = shuffledOptions
        .map((rakan) => {
          const isPlaceholderNinth = rakan.id === "rakan-kesembilan" && !allowNinth;
          return `
            <button
              type="button"
              class="game-option-btn ${isPlaceholderNinth ? "is-locked-placeholder" : ""}"
              data-answer-rakan="${rakan.id}"
              ${isPlaceholderNinth ? 'disabled title="Portfolio kesembilan belum dikonfigurasi"' : ""}
            >
              ${renderOptionLogo(rakan)}
              <div>
                <div class="game-opt-name">${rakan.shortName === "Kesembilan" && !allowNinth ? "Rakan Ke-9" : rakan.name}</div>
                <span class="game-opt-sub">${
                  isPlaceholderNinth ? "Menunggu Konfigurasi" : rakan.shortName
                }</span>
              </div>
            </button>
          `;
        })
        .join("");
    }
  }

  function handleSelectAnswer(selectedRakanId, btnElement) {
    if (hasAnsweredCurrent) return;
    const q = sessionQuestions[currentQuestionIdx];
    if (!q) return;

    hasAnsweredCurrent = true;
    const isCorrect = selectedRakanId === q.correctRakanId;

    if (isCorrect) {
      score += 1;
    }

    if (scoreTextEl) {
      scoreTextEl.textContent = `Skor: ${score}`;
    }

    // Highlight buttons
    const allOptionBtns = optionsGridEl
      ? Array.from(optionsGridEl.querySelectorAll(".game-option-btn"))
      : [];

    allOptionBtns.forEach((btn) => {
      const rId = btn.getAttribute("data-answer-rakan");
      btn.disabled = true;
      if (rId === q.correctRakanId) {
        btn.classList.add("is-correct");
      } else if (btn === btnElement && !isCorrect) {
        btn.classList.add("is-wrong");
      }
    });

    // Show immediate educational feedback
    if (feedbackBoxEl && feedbackTitleEl && feedbackDescEl) {
      feedbackBoxEl.className = `game-feedback-box show ${isCorrect ? "correct" : "wrong"}`;
      feedbackTitleEl.textContent = isCorrect
        ? "BETUL! Hebat, anda mengenali fungsi Rakan ini."
        : "Belum tepat! Cuba lagi dan kenali fungsi Rakan tersebut.";
      feedbackDescEl.textContent = q.explanation;
    }

    if (nextQuestionBtn) {
      const isLast = currentQuestionIdx >= sessionQuestions.length - 1;
      nextQuestionBtn.textContent = isLast ? "Lihat Keputusan Akhir" : "Soalan Seterusnya →";
      nextQuestionBtn.focus();
    }
  }

  function getAchievementTier(finalScore) {
    if (finalScore >= 11) {
      return {
        badge: "🏆 Juara Rakan! (11–15)",
        message:
          "Syabas! Anda mempunyai kefahaman yang sangat mendalam tentang peranan, fungsi dan gaya hidup setiap portfolio Rakan Muda di SRM UKM."
      };
    }
    if (finalScore >= 6) {
      return {
        badge: "🌟 Anda Mula Mengenali Rakan! (6–10)",
        message:
          "Usaha yang baik! Anda sudah mengenali sebahagian besar fungsi Rakan. Terokai slaid Rakan di atas untuk menguasai kesemua portfolio."
      };
    }
    return {
      badge: "🚀 Teruskan Meneroka! (0–5)",
      message:
        "Permulaan yang baik! Setiap Rakan mempunyai fokus unik tersendiri. Jom terokai seksyen Rakan dan cuba bermain sekali lagi!"
    };
  }

  function showFinalResults() {
    switchScreen(screenResult);
    const total = sessionQuestions.length;
    const tier = getAchievementTier(score);

    if (finalScoreNumEl) finalScoreNumEl.textContent = String(score);
    if (finalScoreTotalEl) finalScoreTotalEl.textContent = `daripada ${total} soalan`;
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
        handleSelectAnswer(selectedId, btn);
      });
    }

    if (nextQuestionBtn) {
      nextQuestionBtn.addEventListener("click", () => {
        if (currentQuestionIdx < sessionQuestions.length - 1) {
          currentQuestionIdx += 1;
          renderCurrentQuestion();
        } else {
          showFinalResults();
        }
      });
    }
  }

  window.SRM_GAME = {
    init
  };
})();
