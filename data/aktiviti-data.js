/**
 * ============================================================================
 * SRM UKM - CENTRAL ACTIVITY DATA (aktiviti-data.js)
 * ============================================================================
 * Menyokong Dwi-Bahasa: Bahasa Melayu (ms) & English (en).
 * Anda boleh memasukkan teks dalam bentuk objek { ms: "...", en: "..." }
 * atau rentetan biasa (string) jika mahu teks yang sama untuk kedua-dua bahasa.
 */

window.AKTIVITI_DATA = [
  {
    id: "sample-aktiviti-01",
    isSample: true,
    title: {
      ms: "[CONTOH SUSUN ATUR] Bengkel Reka Bentuk Kreatif & Literasi Media",
      en: "[SAMPLE LAYOUT] Creative Design & Media Literacy Workshop"
    },
    date: "2026-10-15",
    displayDate: {
      ms: "Tarikh Contoh (Kemaskini di data/aktiviti-data.js)",
      en: "Sample Date (Update in data/aktiviti-data.js)"
    },
    location: {
      ms: "Lokasi Contoh — Kampus UKM",
      en: "Sample Location — UKM Campus"
    },
    rakanId: "rakan-digital",
    image: "./gambar/aktiviti/activity-01.jpg",
    shortDescription: {
      ms: "Kad ini adalah contoh susun atur galeri untuk Rakan Digital. Gantikan dengan program sebenar SRM UKM di dalam fail data/aktiviti-data.js.",
      en: "This card is a gallery layout preview for Rakan Digital. Replace with official SRM UKM programmes inside data/aktiviti-data.js."
    },
    fullDescription: {
      ms: "NOTA: Ini adalah kandungan contoh (sample placeholder) bagi tujuan ujian susun atur antaramuka sahaja dan bukan rekod pencapaian rasmi SRM UKM. Apabila anda mempunyai gambar dan maklumat program sebenar, sila letakkan gambar di dalam folder 'gambar/aktiviti/' dan kemas kini butiran tajuk, tarikh, lokasi serta penerangan di dalam fail 'data/aktiviti-data.js'.",
      en: "NOTE: This is sample placeholder content for interface layout testing only and does not represent an official SRM UKM programme record. When your official photographs and programme details are ready, place the images inside 'gambar/aktiviti/' and update the title, date, location, and description in 'data/aktiviti-data.js'."
    },
    highlights: {
      ms: [
        "Contoh sorotan aktiviti 1 (boleh diubah suai)",
        "Contoh sorotan aktiviti 2 (boleh diubah suai)",
        "Menyokong paparan gambar resolusi tinggi dengan fallback automatik"
      ],
      en: [
        "Sample programme highlight 1 (customisable)",
        "Sample programme highlight 2 (customisable)",
        "Supports high-resolution photography with automatic fallback"
      ]
    }
  },
  {
    id: "sample-aktiviti-02",
    isSample: true,
    title: {
      ms: "[CONTOH SUSUN ATUR] Kempen Kampus Lestari & Pemuliharaan Alam",
      en: "[SAMPLE LAYOUT] Sustainable Campus & Nature Conservation Campaign"
    },
    date: "2026-09-28",
    displayDate: {
      ms: "Tarikh Contoh (Kemaskini di data/aktiviti-data.js)",
      en: "Sample Date (Update in data/aktiviti-data.js)"
    },
    location: {
      ms: "Lokasi Contoh — Kampus UKM",
      en: "Sample Location — UKM Campus"
    },
    rakanId: "rakan-bumi",
    image: "./gambar/aktiviti/activity-02.jpg",
    shortDescription: {
      ms: "Kad ini adalah contoh susun atur galeri untuk Rakan Bumi. Gantikan dengan aktiviti kelestarian sebenar SRM UKM.",
      en: "This card is a gallery layout preview for Rakan Bumi. Replace with actual SRM UKM sustainability activities."
    },
    fullDescription: {
      ms: "NOTA: Ini adalah kandungan contoh (sample placeholder) bagi memaparkan bagaimana aktiviti di bawah kategori Rakan Bumi akan kelihatan apabila ditapis oleh pelawat. Tiada maklumat program rekaan dinyatakan sebagai acara rasmi. Sila kemas kini fail 'data/aktiviti-data.js' dengan maklumat program sebenar anda.",
      en: "NOTE: This is a sample placeholder showing how activities under the Rakan Bumi category appear when filtered by visitors. No fictional events are claimed as official records. Update 'data/aktiviti-data.js' with your verified programme information."
    },
    highlights: {
      ms: [
        "Penapisan mengikut kategori Rakan berfungsi secara automatik",
        "Susunan kronologi mengikut tarikh terkini",
        "Paparan modal terperinci apabila pengguna menekan 'Lihat Butiran'"
      ],
      en: [
        "Automatic filtering by Rakan portfolio category",
        "Chronological sorting by latest date",
        "Detailed modal view when clicking 'View Details'"
      ]
    }
  },
  {
    id: "sample-aktiviti-03",
    isSample: true,
    title: {
      ms: "[CONTOH SUSUN ATUR] Wacana Kepimpinan & Kesedaran Sivik Mahasiswa",
      en: "[SAMPLE LAYOUT] Student Leadership & Civic Awareness Discourse"
    },
    date: "2026-09-10",
    displayDate: {
      ms: "Tarikh Contoh (Kemaskini di data/aktiviti-data.js)",
      en: "Sample Date (Update in data/aktiviti-data.js)"
    },
    location: {
      ms: "Lokasi Contoh — Kampus UKM",
      en: "Sample Location — UKM Campus"
    },
    rakanId: "rakan-demokrasi",
    image: "./gambar/aktiviti/activity-03.jpg",
    shortDescription: {
      ms: "Kad ini adalah contoh susun atur galeri untuk Rakan Demokrasi. Mudah ditambah atau dipadam pada bila-bila masa.",
      en: "This card is a gallery layout preview for Rakan Demokrasi. Easily editable or removable at any time."
    },
    fullDescription: {
      ms: "NOTA: Ini adalah kandungan contoh (sample placeholder) untuk menguji fungsi galeri Rakan Demokrasi. Anda boleh menambah seberapa banyak aktiviti baharu hanya dengan menambah objek di dalam fail 'data/aktiviti-data.js' tanpa perlu menyentuh kod reka bentuk laman web.",
      en: "NOTE: This is sample placeholder content for testing the Rakan Demokrasi gallery filter. You can add new activities simply by adding entries in 'data/aktiviti-data.js' without modifying the website layout code."
    },
    highlights: {
      ms: [
        "Integrasi terus dengan bahagian Sorotan Aktiviti di Laman Utama",
        "Rekaan kad editorial moden dan responsif",
        "Label 'Contoh Susun Atur' boleh dimatikan dengan menukar isSample: false"
      ],
      en: [
        "Direct integration with Homepage Latest Activity previews",
        "Modern editorial card layout across all devices",
        "Turn off the sample badge anytime by setting isSample: false"
      ]
    }
  },
  {
    id: "sample-aktiviti-04",
    isSample: true,
    title: {
      ms: "[CONTOH SUSUN ATUR] Program Jalinan Kasih & Kesukarelawanan Komuniti",
      en: "[SAMPLE LAYOUT] Community Outreach & Volunteerism Initiative"
    },
    date: "2026-08-22",
    displayDate: {
      ms: "Tarikh Contoh (Kemaskini di data/aktiviti-data.js)",
      en: "Sample Date (Update in data/aktiviti-data.js)"
    },
    location: {
      ms: "Lokasi Contoh — Komuniti Setempat",
      en: "Sample Location — Local Community"
    },
    rakanId: "rakan-prihatin",
    image: "./gambar/aktiviti/activity-04.jpg",
    shortDescription: {
      ms: "Kad ini adalah contoh susun atur galeri untuk Rakan Prihatin bagi memaparkan program kebajikan dan sukarelawan.",
      en: "This card is a gallery layout preview for Rakan Prihatin showcasing welfare and volunteer programmes."
    },
    fullDescription: {
      ms: "NOTA: Ini adalah kandungan contoh (sample placeholder) untuk Rakan Prihatin. Apabila anda memuat naik fail gambar seperti 'activity-04.jpg' ke dalam folder 'gambar/aktiviti/', gambar tersebut akan terus dipaparkan dengan kemas menggunakan nisbah aspek yang optimum.",
      en: "NOTE: This is a sample placeholder for Rakan Prihatin. Once you upload an image such as 'activity-04.jpg' into 'gambar/aktiviti/', it will automatically render with optimal aspect-ratio framing."
    },
    highlights: {
      ms: [
        "Sokongan imej pintar (lazy-loading & object-fit)",
        "Fallback visual bersama logo rasmi Rakan sekiranya gambar belum dimuat naik",
        "Mudah diuruskan oleh ahli jawatankuasa SRM UKM"
      ],
      en: [
        "Smart image handling (lazy-loading & object-fit)",
        "Clean visual fallback featuring the official Rakan emblem until photo is uploaded",
        "Easy maintenance for SRM UKM committee members"
      ]
    }
  },
  {
    id: "sample-aktiviti-05",
    isSample: true,
    title: {
      ms: "[CONTOH SUSUN ATUR] Karnival Kecergasan & Sukan Mahasiswa",
      en: "[SAMPLE LAYOUT] Student Fitness & Sports Carnival"
    },
    date: "2026-08-05",
    displayDate: {
      ms: "Tarikh Contoh (Kemaskini di data/aktiviti-data.js)",
      en: "Sample Date (Update in data/aktiviti-data.js)"
    },
    location: {
      ms: "Lokasi Contoh — Kompleks Sukan",
      en: "Sample Location — Sports Complex"
    },
    rakanId: "rakan-aktif",
    image: "./gambar/aktiviti/activity-05.jpg",
    shortDescription: {
      ms: "Kad ini adalah contoh susun atur galeri untuk Rakan Aktif bagi memaparkan aktiviti sukan, rekreasi dan gaya hidup sihat.",
      en: "This card is a gallery layout preview for Rakan Aktif highlighting sports, recreation, and active lifestyle events."
    },
    fullDescription: {
      ms: "NOTA: Ini adalah kandungan contoh (sample placeholder) untuk Rakan Aktif. Sila gantikan maklumat ini dengan program sebenar SRM UKM apabila gambar dan butiran rasmi telah sedia.",
      en: "NOTE: This is a sample placeholder for Rakan Aktif. Replace this entry with official SRM UKM programme details once your photographs are ready."
    },
    highlights: {
      ms: [
        "Reka bentuk bersih mengikut warna identiti Rakan Aktif",
        "Mesra peranti mudah alih, tablet dan desktop",
        "Sedia untuk penerbitan GitHub Pages"
      ],
      en: [
        "Clean styling matched to Rakan Aktif's official orange identity",
        "Responsive across mobile, tablet, and desktop",
        "GitHub Pages deployment ready"
      ]
    }
  },
  {
    id: "sample-aktiviti-06",
    isSample: true,
    title: {
      ms: "[CONTOH SUSUN ATUR] Hari Inovasi Keusahawanan & Jualan Mahasiswa",
      en: "[SAMPLE LAYOUT] Student Entrepreneurship & Innovation Showcase"
    },
    date: "2026-07-19",
    displayDate: {
      ms: "Tarikh Contoh (Kemaskini di data/aktiviti-data.js)",
      en: "Sample Date (Update in data/aktiviti-data.js)"
    },
    location: {
      ms: "Lokasi Contoh — Kampus UKM",
      en: "Sample Location — UKM Campus"
    },
    rakanId: "rakan-niaga",
    image: "./gambar/aktiviti/activity-06.jpg",
    shortDescription: {
      ms: "Kad ini adalah contoh susun atur galeri untuk Rakan Niaga bagi memaparkan inisiatif keusahawanan dan inovasi ekonomi.",
      en: "This card is a gallery layout preview for Rakan Niaga showcasing entrepreneurship and economic innovation."
    },
    fullDescription: {
      ms: "NOTA: Ini adalah kandungan contoh (sample placeholder) untuk Rakan Niaga. Anda boleh memadam contoh-contoh ini atau menukarkannya terus kepada aktiviti rasmi SRM UKM di dalam fail 'data/aktiviti-data.js'.",
      en: "NOTE: This is a sample placeholder for Rakan Niaga. You can remove these samples or overwrite them directly with official SRM UKM programmes in 'data/aktiviti-data.js'."
    },
    highlights: {
      ms: [
        "Kemas kini berpusat tanpa perlu mengubah kod HTML",
        "Paparan lencana kategori Rakan secara automatik",
        "Navigasi pantas antara Laman Utama dan Galeri Aktiviti"
      ],
      en: [
        "Centralised updates without touching HTML code",
        "Automatic Rakan portfolio category badge",
        "Seamless navigation between Homepage and Activity Gallery"
      ]
    }
  }
];
