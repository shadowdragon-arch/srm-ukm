/**
 * ============================================================================
 * SRM UKM - CENTRAL SITE CONFIGURATION (site-config.js)
 * ============================================================================
 * Kemas kini pautan media sosial rasmi dan tetapan organisasi di sini.
 * Jangan ubah struktur objek utama supaya kod laman web kekal berfungsi.
 */

window.SRM_CONFIG = {
  organizationName: "Sekretariat Rakan Muda UKM",
  shortName: "SRM UKM",
  university: "Universiti Kebangsaan Malaysia (UKM)",
  tagline: "SRM Peneraju Persada",
  heroSubtitle:
    "Memperkasa potensi belia melalui kepimpinan, kreativiti, kemahiran dan penglibatan aktif dalam membina komuniti mahasiswa yang berdaya saing.",

  // Laluan logo rasmi SRM UKM (Letakkan fail di dalam folder gambar/logo/)
  logoPath: "./gambar/logo/srm-logo.png",

  // Pautan Media Sosial Rasmi
  // NOTA: Tukar nilai 'url' dan 'handle' di bawah apabila URL rasmi disahkan.
  // Biarkan 'isConfigured: false' selagi URL sebenar belum dimasukkan.
  socialLinks: {
    instagram: {
      platform: "Instagram",
      handle: "[PLACEHOLDER: Masukkan @username Instagram Rasmi SRM UKM]",
      url: "#contact-placeholder-instagram",
      isConfigured: false,
      description: "Ikuti perkembangan terkini, sorotan program dan pengumuman rasmi SRM UKM di Instagram."
    },
    tiktok: {
      platform: "TikTok",
      handle: "[PLACEHOLDER: Masukkan @username TikTok Rasmi SRM UKM]",
      url: "#contact-placeholder-tiktok",
      isConfigured: false,
      description: "Tonton video kreatif, suasana aktiviti mahasiswa dan kandungan interaktif kami di TikTok."
    }
  },

  // Tetapan Portfolio Kesembilan
  // Tukar 'includeInGame: true' selepas anda mengemas kini maklumat sebenar Rakan Kesembilan di data/rakan-data.js
  ninthPortfolioConfig: {
    isConfigured: false,
    includeInGame: false
  }
};
