/**
 * ============================================================================
 * SRM UKM - TEKA RAKAN! EMOJI GAME QUESTIONS (game-questions.js)
 * ============================================================================
 * Setiap soalan memaparkan DUA emoji sebagai petunjuk dan mempunyai tepat
 * SATU jawapan Rakan yang betul serta penerangan pendidikan.
 *
 * NOTA RAKAN KESEMBILAN:
 * Soalan bagi Rakan Kesembilan hanya akan dimasukkan ke dalam pusingan
 * permainan sekiranya anda menetapkan 'isConfigured: true' pada Rakan Kesembilan
 * di dalam 'data/rakan-data.js' ATAU 'includeInGame: true' di 'data/site-config.js'.
 */

window.GAME_QUESTIONS = [
  // --- RAKAN DIGITAL ---
  {
    id: "q-01",
    emojis: ["💻", "🎨"],
    clueLabel: "Teknologi + Reka Bentuk Kreatif",
    correctRakanId: "rakan-digital",
    explanation:
      "Betul! Rakan Digital memberi tumpuan kepada teknologi, kreativiti media, reka bentuk grafik dan pendigitalan."
  },
  {
    id: "q-02",
    emojis: ["📱", "🎬"],
    clueLabel: "Media Sosial + Produksi Video",
    correctRakanId: "rakan-digital",
    explanation:
      "Tepat sekali! Penghasilan video kreatif dan pengurusan kandungan media sosial adalah antara fokus utama Rakan Digital."
  },
  {
    id: "q-03",
    emojis: ["🛡️", "🌐"],
    clueLabel: "Keselamatan Siber + Dunia Internet",
    correctRakanId: "rakan-digital",
    explanation:
      "Betul! Rakan Digital turut meningkatkan literasi digital dan kesedaran keselamatan siber dalam kalangan belia."
  },

  // --- RAKAN BUMI ---
  {
    id: "q-04",
    emojis: ["🌳", "♻️"],
    clueLabel: "Penanaman Pokok + Kitar Semula",
    correctRakanId: "rakan-bumi",
    explanation:
      "Betul! Rakan Bumi menggalakkan pemeliharaan alam sekitar, penanaman pokok dan amalan kelestarian."
  },
  {
    id: "q-05",
    emojis: ["🌍", "🌱"],
    clueLabel: "Bumi Hijau + Kelestarian Alam",
    correctRakanId: "rakan-bumi",
    explanation:
      "Tepat! Rakan Bumi memupuk gaya hidup lestari dan kesedaran pemuliharaan kawasan hijau."
  },

  // --- RAKAN PRIHATIN ---
  {
    id: "q-06",
    emojis: ["🤝", "❤️"],
    clueLabel: "Kerjasama Komuniti + Empati Kebajikan",
    correctRakanId: "rakan-prihatin",
    explanation:
      "Betul! Rakan Prihatin memberi tumpuan kepada kesukarelawanan, kebajikan dan keprihatinan masyarakat."
  },
  {
    id: "q-07",
    emojis: ["📦", "🤲"],
    clueLabel: "Sumbangan Bantuan + Sukarelawan",
    correctRakanId: "rakan-prihatin",
    explanation:
      "Tepat sekali! Program sumbangan, ziarah kebajikan dan bantuan komuniti digerakkan melalui Rakan Prihatin."
  },

  // --- RAKAN AKTIF ---
  {
    id: "q-08",
    emojis: ["🏃", "⚽"],
    clueLabel: "Larian Kecergasan + Sukan Berpasukan",
    correctRakanId: "rakan-aktif",
    explanation:
      "Betul! Rakan Aktif menggalakkan kecergasan, aktiviti fizikal, sukan dan gaya hidup sihat."
  },
  {
    id: "q-09",
    emojis: ["🏅", "💪"],
    clueLabel: "Semangat Kesukanan + Kesihatan Fizikal",
    correctRakanId: "rakan-aktif",
    explanation:
      "Tepat! Rakan Aktif membina disiplin, semangat kesukanan dan kecergasan fizikal mahasiswa."
  },

  // --- RAKAN DEMOKRASI ---
  {
    id: "q-10",
    emojis: ["🗳️", "🏛️"],
    clueLabel: "Simulasi Pilihan Raya + Institusi Kenegaraan",
    correctRakanId: "rakan-demokrasi",
    explanation:
      "Betul! Rakan Demokrasi meningkatkan kesedaran tentang sistem demokrasi, kenegaraan dan tanggungjawab sivik."
  },
  {
    id: "q-11",
    emojis: ["🎙️", "⚖️"],
    clueLabel: "Forum Wacana + Pemikiran Kritis",
    correctRakanId: "rakan-demokrasi",
    explanation:
      "Tepat sekali! Forum mahasiswa, diskusi isu semasa dan pemikiran kritis merupakan teras Rakan Demokrasi."
  },

  // --- RAKAN NIAGA ---
  {
    id: "q-12",
    emojis: ["💼", "📈"],
    clueLabel: "Perniagaan + Pertumbuhan Ekonomi",
    correctRakanId: "rakan-niaga",
    explanation:
      "Betul! Rakan Niaga memupuk pemikiran keusahawanan, kemahiran pengurusan perniagaan dan inovasi ekonomi."
  },
  {
    id: "q-13",
    emojis: ["🛍️", "💡"],
    clueLabel: "Karnival Jualan + Idea Inovasi",
    correctRakanId: "rakan-niaga",
    explanation:
      "Tepat! Karnival keusahawanan, jualan produk mahasiswa dan pertandingan idea perniagaan adalah contoh aktiviti Rakan Niaga."
  },

  // --- RAKAN EKSPRESI ---
  {
    id: "q-14",
    emojis: ["🎭", "🎶"],
    clueLabel: "Persembahan Pentas + Seni Muzik & Budaya",
    correctRakanId: "rakan-ekspresi",
    explanation:
      "Betul! Rakan Ekspresi menyediakan ruang untuk persembahan seni, kebudayaan dan ekspresi bakat mahasiswa."
  },
  {
    id: "q-15",
    emojis: ["📷", "🖌️"],
    clueLabel: "Fotografi + Karya Seni Visual",
    correctRakanId: "rakan-ekspresi",
    explanation:
      "Tepat sekali! Pertandingan fotografi, pameran kreativiti dan penghasilan karya seni adalah di bawah Rakan Ekspresi."
  },

  // --- RAKAN MAHIR ---
  {
    id: "q-16",
    emojis: ["🛠️", "🎓"],
    clueLabel: "Kemahiran Praktikal + Kebolehpasaran Graduan",
    correctRakanId: "rakan-mahir",
    explanation:
      "Betul! Rakan Mahir memberi penekanan kepada kemahiran teknikal dan vokasional (TVET) serta pembangunan kompetensi kerjaya."
  },
  {
    id: "q-17",
    emojis: ["⚙️", "🧩"],
    clueLabel: "Latihan Teknikal + Penyelesaian Masalah",
    correctRakanId: "rakan-mahir",
    explanation:
      "Tepat! Kursus teknikal, pembelajaran praktikal dan kemahiran penyelesaian masalah adalah fokus utama Rakan Mahir."
  },
  {
    id: "q-18",
    emojis: ["🗣️", "📋"],
    clueLabel: "Komunikasi Profesional + Pembangunan Kerjaya",
    correctRakanId: "rakan-mahir",
    explanation:
      "Betul! Rakan Mahir turut mengembangkan kemahiran komunikasi profesional dan persediaan melangkah ke alam pekerjaan."
  }
];
