/**
 * ============================================================================
 * SRM UKM - CENTRAL SITE CONFIGURATION & I18N DICTIONARY (site-config.js)
 * ============================================================================
 * Menyokong Dwi-Bahasa: Bahasa Melayu (ms) & English (en)
 */

window.SRM_CONFIG = {
  defaultLang: "ms",
  organizationName: "Sekretariat Rakan Muda UKM",
  shortName: "SRM UKM",
  university: {
    ms: "Universiti Kebangsaan Malaysia",
    en: "The National University of Malaysia (UKM)"
  },
  tagline: "SRM Peneraju Persada",
  logoPath: "./gambar/logo/srm-logo.png",

  // Official SRM UKM Social Media Links
  socialLinks: {
    instagram: {
      platform: "Instagram",
      handle: "@srmukm",
      url: "https://www.instagram.com/srmukm/",
      isConfigured: true,
      description: {
        ms: "Ikuti perkembangan terkini, hebahan program rasmi, sorotan aktiviti dan pengumuman terkini SRM UKM di Instagram.",
        en: "Follow our latest updates, official programme announcements, event highlights, and stories on Instagram."
      }
    },
    tiktok: {
      platform: "TikTok",
      handle: "@srmukm",
      url: "https://www.tiktok.com/@srmukm",
      isConfigured: true,
      description: {
        ms: "Tonton kandungan video kreatif, rangkuman suasana program kampus dan perkongsian interaktif mahasiswa di TikTok.",
        en: "Watch creative video content, campus event recaps, and interactive student moments on TikTok."
      }
    }
  },

  // 9th Portfolio Configuration
  ninthPortfolioConfig: {
    isConfigured: false,
    includeInGame: false
  },

  // UI Translations Dictionary (BM & EN)
  i18n: {
    ms: {
      nav: {
        home: "Utama",
        rakan: "Rakan",
        aktiviti: "Aktiviti",
        game: "Permainan",
        contact: "Hubungi",
        langLabel: "EN",
        langTooltip: "Switch to English"
      },
      hero: {
        eyebrow: "Sekretariat Mahasiswa • Universiti Kebangsaan Malaysia",
        title: "SEKRETARIAT RAKAN MUDA UKM",
        tagline: "SRM Peneraju Persada",
        subtitle:
          "Memperkasa potensi belia melalui kepimpinan, kreativiti, kemahiran dan penglibatan aktif dalam membina komuniti mahasiswa yang berdaya saing.",
        ctaPrimary: "Terokai Portfolio Rakan",
        ctaSecondary: "Lihat Galeri Aktiviti",
        showcaseTitle: "Ekosistem Gaya Hidup Rakan Muda",
        showcaseSub: "Pilih logo portfolio untuk meneroka peranan dan fungsi secara terperinci",
        statPortfolios: "Portfolio Gaya Hidup",
        statGame: "Cabaran Interaktif",
        statSpirit: "Yakin Boleh!"
      },
      about: {
        eyebrow: "Pengenalan & Peranan",
        title: "Menterjemah Aspirasi Rakan Muda Di Persada Kampus",
        subtitle:
          "Sekretariat Rakan Muda UKM (SRM UKM) merupakan penggerak pembangunan belia di peringkat universiti yang menyatukan kepimpinan, daya inovasi dan semangat kesukarelawanan melalui gaya hidup positif.",
        bento1Title: "Pembangunan Potensi Mahasiswa",
        bento1Desc:
          "Menyediakan ruang holistik di luar bilik kuliah untuk mahasiswa mengenal pasti bakat, membina keyakinan diri dan menyerlahkan potensi sebenar.",
        bento2Title: "Kepimpinan & Kerja Berpasukan",
        bento2Desc:
          "Melatih pelapis pemimpin mahasiswa menerusi pengurusan organisasi yang cekap, perancangan strategik dan budaya kerja berpasukan.",
        bento3Title: "Penglibatan Belia Positif",
        bento3Desc:
          "Menggerakkan penyertaan warga kampus dalam inisiatif yang progresif serta membina jaringan komuniti mahasiswa yang inklusif.",
        bento4Title: "Kemahiran & Daya Kreativiti",
        bento4Desc:
          "Memupuk literasi digital, kemahiran praktikal dan ekspresi seni yang relevan dengan cabaran dunia moden.",
        bento5Title: "Kesukarelawanan & Tanggungjawab Sosial",
        bento5Desc:
          "Menyemai nilai empati, kebajikan komuniti dan kelestarian alam sekitar melalui tindakan lapangan yang berimpak.",
        bento6Title: "Ekosistem Gaya Hidup Rakan Muda",
        bento6Desc:
          "Menyelaraskan program universiti berteraskan portfolio Rakan Muda supaya setiap kecenderungan mahasiswa mempunyai platform tersendiri."
      },
      identity: {
        eyebrow: "Identiti & Falsafah",
        quote: "“SRM Peneraju Persada”",
        lead:
          "Ungkapan SRM Peneraju Persada melambangkan iltizam Sekretariat Rakan Muda UKM untuk tampil di barisan hadapan dalam membentuk kepemimpinan mahasiswa yang berwibawa, kreatif dan memberi impak bermakna kepada universiti serta masyarakat.",
        v1Title: "Kepimpinan Berwawasan",
        v1Desc: "Menerajui perubahan positif dengan integriti, kematangan fikiran dan tanggungjawab sivik.",
        v2Title: "Kecemerlangan Holistik",
        v2Desc: "Mengimbangi kecemerlangan ilmu dengan kemahiran insaniah, keusahawanan dan kesejahteraan fizikal.",
        v3Title: "Sumbangan Komuniti",
        v3Desc: "Memastikan setiap program meninggalkan kesan langsung kepada kesejahteraan kampus dan masyarakat.",
        v4Title: "Sinergi Mahasiswa",
        v4Desc: "Menyatukan kepelbagaian latar belakang dan bakat di bawah satu bumbung Rakan Muda."
      },
      homePreview: {
        rakanEyebrow: "Direktori Portfolio",
        rakanTitle: "Sembilan Portfolio, Satu Halatuju",
        rakanDesc:
          "Setiap Rakan mempunyai fokus dan warna identiti tersendiri bagi memacu pembangunan belia secara menyeluruh.",
        rakanBtn: "Kenali Semua Rakan",
        actEyebrow: "Sorotan Program",
        actTitle: "Aktiviti & Inisiatif Terkini",
        actDesc: "Dikemas kini secara automatik daripada pangkalan data aktiviti SRM UKM.",
        actBtn: "Lihat Semua Aktiviti"
      },
      rakan: {
        eyebrow: "Eksplorasi Portfolio",
        title: "Gaya Hidup Rakan Muda",
        subtitle:
          "Leret slaid ke kiri atau kanan, gunakan butang navigasi, atau klik terus pada ikon logo di bawah untuk meneroka fungsi setiap Rakan.",
        portfolioLabel: "PORTFOLIO",
        mainFunctionsLabel: "Fungsi Utama",
        activityExamplesLabel: "Contoh Program & Aktiviti",
        cardFooterHint: "Klik untuk penerangan terperinci & senarai penuh fungsi",
        cardFooterPlaceholderHint: "Slot boleh dikonfigurasi melalui fail data/rakan-data.js",
        exploreBtn: "Kenali Rakan",
        modalIntroLabel: "Pengenalan & Teras Portfolio",
        modalFunctionsLabel: "Senarai Fungsi Utama",
        modalExamplesLabel: "Contoh Aktiviti & Program",
        modalFilterActBtn: "Lihat Aktiviti Portfolio Ini",
        modalCloseBtn: "Kembali ke Karusel"
      },
      aktiviti: {
        eyebrow: "Galeri Dokumentasi",
        title: "Aktiviti & Program SRM UKM",
        subtitle: "Terokai penganjuran program mahasiswa mengikut kategori portfolio Rakan Muda.",
        filterAll: "Semua Aktiviti",
        sampleBannerTitle: "Pratonton Susun Atur Galeri:",
        sampleBannerText:
          "Kad bertanda 'CONTOH SUSUN ATUR' adalah templat reka bentuk sementara menunggu gambar dan maklumat rasmi dimasukkan ke dalam fail data/aktiviti-data.js.",
        sampleBadge: "CONTOH SUSUN ATUR",
        viewDetailsBtn: "Lihat Butiran",
        emptyTitle: "Tiada Rekod Aktiviti Bagi Kategori Ini",
        emptyDesc: "Anda boleh menambah aktiviti baharu bagi portfolio ini di dalam fail data/aktiviti-data.js.",
        resetFilterBtn: "Papar Semua Aktiviti",
        modalOverviewLabel: "Ringkasan & Butiran Program",
        modalHighlightsLabel: "Sorotan Utama",
        modalCloseBtn: "Tutup Paparan",
        missingImgTitle: "Pratonton Ruang Gambar",
        missingImgSub: "Letakkan fail imej di"
      },
      game: {
        eyebrow: "Permainan Interaktif",
        title: "TEKA RAKAN!",
        subtitle: "Kenali Rakan Melalui Emoji — Uji kefahaman anda tentang peranan setiap portfolio Rakan Muda.",
        welcomeTitle: "Uji Kefahaman Portfolio Rakan Muda Anda",
        welcomeDesc:
          "Setiap soalan memaparkan gabungan DUA emoji sebagai petunjuk. Pilih logo portfolio Rakan yang paling tepat berdasarkan fungsi dan aktiviti utamanya.",
        step1Num: "LANGKAH 01",
        step1Text: "Perhatikan gabungan 2 emoji dan petunjuk ringkas yang dipaparkan.",
        step2Num: "LANGKAH 02",
        step2Text: "Pilih satu jawapan tepat daripada 9 pilihan logo Rakan.",
        step3Num: "LANGKAH 03",
        step3Text: "Jawab 15 soalan rawak dan capai penarafan Juara Rakan!",
        startBtn: "Mula Permainan",
        questionCounter: "Soalan",
        scoreLabel: "Skor",
        promptText: "Portfolio Rakan manakah yang diwakili oleh gabungan emoji ini?",
        cluePrefix: "Petunjuk",
        correctTitle: "BETUL! Hebat, anda mengenali fungsi Rakan ini.",
        wrongTitle: "Belum tepat! Cuba lagi dan kenali fungsi Rakan tersebut.",
        nextBtn: "Soalan Seterusnya",
        finishBtn: "Lihat Keputusan Akhir",
        resultTitle: "Cabaran Selesai!",
        outOfText: "daripada",
        questionsWord: "soalan",
        playAgainBtn: "Main Semula",
        reviewRakanBtn: "Ulang Kaji Seksyen Rakan",
        lockedSlotText: "Menunggu Konfigurasi",
        tierHighBadge: "Juara Rakan! (11–15)",
        tierHighMsg:
          "Syabas! Anda mempunyai kefahaman yang sangat mendalam tentang peranan, fungsi dan gaya hidup setiap portfolio Rakan Muda di SRM UKM.",
        tierMidBadge: "Anda Mula Mengenali Rakan! (6–10)",
        tierMidMsg:
          "Usaha yang baik! Anda sudah mengenali sebahagian besar fungsi Rakan. Terokai slaid Rakan di atas untuk menguasai kesemua portfolio.",
        tierLowBadge: "Teruskan Meneroka! (0–5)",
        tierLowMsg:
          "Permulaan yang baik! Setiap Rakan mempunyai fokus unik tersendiri. Jom terokai seksyen Rakan dan cuba bermain sekali lagi!"
      },
      contact: {
        eyebrow: "Saluran Rasmi",
        title: "Hubungi & Ikuti SRM UKM",
        subtitle: "Ikuti perkembangan dan aktiviti kami di media sosial!",
        igTitle: "Instagram Rasmi",
        igBtn: "Layari Instagram @srmukm",
        ttTitle: "TikTok Rasmi",
        ttBtn: "Layari TikTok @srmukm",
        footerDesc:
          "Memperkasa potensi mahasiswa Universiti Kebangsaan Malaysia melalui kepimpinan, kreativiti, kemahiran dan penglibatan aktif berteraskan gaya hidup Rakan Muda.",
        footerNavTitle: "Navigasi Utama",
        footerSocialTitle: "Pautan Rasmi",
        rights: "Hak Cipta Terpelihara."
      }
    },

    en: {
      nav: {
        home: "Home",
        rakan: "Rakan",
        aktiviti: "Activities",
        game: "Game",
        contact: "Contact",
        langLabel: "BM",
        langTooltip: "Tukar ke Bahasa Melayu"
      },
      hero: {
        eyebrow: "Student Secretariat • The National University of Malaysia (UKM)",
        title: "SEKRETARIAT RAKAN MUDA UKM",
        tagline: "SRM Peneraju Persada",
        subtitle:
          "Empowering youth potential through leadership, creativity, skills, and active participation in building a competitive university community.",
        ctaPrimary: "Explore Rakan Portfolios",
        ctaSecondary: "View Activity Gallery",
        showcaseTitle: "Rakan Muda Lifestyle Ecosystem",
        showcaseSub: "Select any official portfolio emblem below to explore its core functions",
        statPortfolios: "Lifestyle Portfolios",
        statGame: "Interactive Quiz",
        statSpirit: "Yakin Boleh!"
      },
      about: {
        eyebrow: "About SRM UKM",
        title: "Translating the Rakan Muda Spirit into Campus Excellence",
        subtitle:
          "Sekretariat Rakan Muda UKM (SRM UKM) is a student-led youth development organisation uniting leadership, creative innovation, and volunteerism through positive lifestyles.",
        bento1Title: "Student Potential Development",
        bento1Desc:
          "Providing a holistic platform beyond lecture halls for students to discover talents, build confidence, and realise their full potential.",
        bento2Title: "Leadership & Teamwork",
        bento2Desc:
          "Nurturing future student leaders through structured organisation management, strategic planning, and collaborative teamwork.",
        bento3Title: "Positive Youth Engagement",
        bento3Desc:
          "Mobilising active campus participation in meaningful initiatives while fostering an inclusive and supportive student network.",
        bento4Title: "Skills & Creative Innovation",
        bento4Desc:
          "Cultivating digital literacy, practical competencies, and artistic expression relevant to modern career demands.",
        bento5Title: "Volunteerism & Social Responsibility",
        bento5Desc:
          "Instilling empathy, community welfare, and environmental stewardship through impactful on-the-ground action.",
        bento6Title: "Rakan Muda Lifestyle Programmes",
        bento6Desc:
          "Aligning campus programmes across dedicated Rakan Muda portfolios so every student passion has a place to thrive."
      },
      identity: {
        eyebrow: "Our Identity & Ethos",
        quote: "“SRM Peneraju Persada”",
        lead:
          "Our tagline, SRM Peneraju Persada (Pioneers of the Arena), embodies SRM UKM's commitment to standing at the forefront of youth leadership, excellence, and meaningful contribution to both the university and society.",
        v1Title: "Visionary Leadership",
        v1Desc: "Leading positive change with integrity, critical thinking, and civic responsibility.",
        v2Title: "Holistic Excellence",
        v2Desc: "Balancing academic achievement with soft skills, entrepreneurship, and physical wellness.",
        v3Title: "Meaningful Impact",
        v3Desc: "Ensuring every initiative delivers real value to fellow students and surrounding communities.",
        v4Title: "Youth Synergy",
        v4Desc: "Uniting diverse talents and backgrounds under one dynamic Rakan Muda ecosystem."
      },
      homePreview: {
        rakanEyebrow: "Portfolio Directory",
        rakanTitle: "Nine Portfolios, One Shared Vision",
        rakanDesc:
          "Each Rakan represents a distinct lifestyle pillar with its own identity to drive well-rounded youth development.",
        rakanBtn: "Meet All Rakan Portfolios",
        actEyebrow: "Programme Highlights",
        actTitle: "Latest Activities & Initiatives",
        actDesc: "Automatically synced from the central SRM UKM activity database.",
        actBtn: "View Full Gallery"
      },
      rakan: {
        eyebrow: "Interactive Showcase",
        title: "Explore Rakan Muda Portfolios",
        subtitle:
          "Swipe left or right, use the arrow controls, or select any emblem in the dock below to explore each Rakan's role and activities.",
        portfolioLabel: "PORTFOLIO",
        mainFunctionsLabel: "Core Functions",
        activityExamplesLabel: "Sample Programmes & Activities",
        cardFooterHint: "Click for comprehensive explanation & full function list",
        cardFooterPlaceholderHint: "Configurable slot via data/rakan-data.js",
        exploreBtn: "Explore Rakan",
        modalIntroLabel: "Portfolio Overview & Core Focus",
        modalFunctionsLabel: "Complete List of Functions",
        modalExamplesLabel: "Programme & Activity Examples",
        modalFilterActBtn: "View Activities for This Rakan",
        modalCloseBtn: "Back to Carousel"
      },
      aktiviti: {
        eyebrow: "Programme Archive",
        title: "SRM UKM Activity Gallery",
        subtitle: "Browse student programmes, workshops, and initiatives filtered by Rakan Muda portfolio.",
        filterAll: "All Activities",
        sampleBannerTitle: "Gallery Layout Preview:",
        sampleBannerText:
          "Cards marked 'SAMPLE LAYOUT' are structural placeholders until official photos and programme details are added to data/aktiviti-data.js.",
        sampleBadge: "SAMPLE LAYOUT",
        viewDetailsBtn: "View Details",
        emptyTitle: "No Activities Listed for This Category Yet",
        emptyDesc: "You can add new programme records for this portfolio anytime inside data/aktiviti-data.js.",
        resetFilterBtn: "Show All Activities",
        modalOverviewLabel: "Programme Summary & Details",
        modalHighlightsLabel: "Key Highlights",
        modalCloseBtn: "Close View",
        missingImgTitle: "Activity Photo Placeholder",
        missingImgSub: "Place image file at"
      },
      game: {
        eyebrow: "Interactive Challenge",
        title: "TEKA RAKAN! (Guess the Rakan)",
        subtitle: "Learn Rakan Functions Through Emojis — Test how well you know each Rakan Muda portfolio.",
        welcomeTitle: "Ready for the Emoji Portfolio Challenge?",
        welcomeDesc:
          "Each question presents a combination of TWO emojis as a clue. Select the matching Rakan portfolio emblem based on its core functions and activities.",
        step1Num: "STEP 01",
        step1Text: "Observe the 2-emoji combination and short clue displayed on screen.",
        step2Num: "STEP 02",
        step2Text: "Select the single matching portfolio from the 9 Rakan emblems.",
        step3Num: "STEP 03",
        step3Text: "Complete 15 randomised questions and unlock the Juara Rakan rank!",
        startBtn: "Start Game",
        questionCounter: "Question",
        scoreLabel: "Score",
        promptText: "Which Rakan portfolio matches this combination of emojis?",
        cluePrefix: "Clue",
        correctTitle: "CORRECT! Great job, you know this Rakan's function.",
        wrongTitle: "Not quite! Keep exploring and learn this Rakan's function.",
        nextBtn: "Next Question",
        finishBtn: "See Final Score",
        resultTitle: "Challenge Complete!",
        outOfText: "out of",
        questionsWord: "questions",
        playAgainBtn: "Play Again",
        reviewRakanBtn: "Review Rakan Section",
        lockedSlotText: "Awaiting Configuration",
        tierHighBadge: "Rakan Champion! (11–15)",
        tierHighMsg:
          "Outstanding! You have a thorough understanding of the roles, functions, and lifestyles of every Rakan Muda portfolio at SRM UKM.",
        tierMidBadge: "Getting to Know Rakan! (6–10)",
        tierMidMsg:
          "Great effort! You already recognise most Rakan functions. Explore the Rakan carousel above to master all portfolios.",
        tierLowBadge: "Keep Exploring! (0–5)",
        tierLowMsg:
          "Good start! Every Rakan has a unique focus. Take a tour through the Rakan section above and try another round!"
      },
      contact: {
        eyebrow: "Official Channels",
        title: "Connect with SRM UKM",
        subtitle: "Follow our latest updates and campus activities on social media!",
        igTitle: "Official Instagram",
        igBtn: "Visit Instagram @srmukm",
        ttTitle: "Official TikTok",
        ttBtn: "Visit TikTok @srmukm",
        footerDesc:
          "Empowering students of Universiti Kebangsaan Malaysia through leadership, creativity, skills, and active participation rooted in the Rakan Muda lifestyle.",
        footerNavTitle: "Navigation",
        footerSocialTitle: "Official Socials",
        rights: "All Rights Reserved."
      }
    }
  }
};
