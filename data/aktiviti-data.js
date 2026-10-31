/**
 * ============================================================================
 * SRM UKM - CENTRAL ACTIVITY DATA (aktiviti-data.js)
 * ============================================================================
 * Cara Menambah Aktiviti Baharu:
 * 1. Letakkan gambar aktiviti di dalam folder 'gambar/aktiviti/' (cth: program-kami.jpg).
 * 2. Salin salah satu blok objek di bawah dan masukkan maklumat sebenar.
 * 3. Tukar 'isSample: false' untuk aktiviti rasmi SRM UKM.
 * 4. Laman Utama (Home) dan Galeri Aktiviti akan dikemas kini secara automatik!
 *
 * Nilai 'rakanId' yang sah:
 * - "rakan-digital"
 * - "rakan-demokrasi"
 * - "rakan-niaga"
 * - "rakan-prihatin"
 * - "rakan-ekspresi"
 * - "rakan-bumi"
 * - "rakan-mahir"
 * - "rakan-aktif"
 * - "rakan-kesembilan"
 */

window.AKTIVITI_DATA = [
  {
    id: "sample-aktiviti-01",
    isSample: true,
    title: "[CONTOH SUSUN ATUR] Bengkel Reka Bentuk Kreatif & Literasi Media",
    date: "2026-10-15",
    displayDate: "Tarikh Contoh (Kemaskini di data/aktiviti-data.js)",
    location: "Lokasi Contoh — Kampus UKM",
    rakanId: "rakan-digital",
    image: "./gambar/aktiviti/activity-01.jpg",
    shortDescription:
      "Kad ini adalah contoh susun atur galeri untuk Rakan Digital. Gantikan dengan program sebenar SRM UKM di dalam fail data/aktiviti-data.js.",
    fullDescription:
      "NOTA: Ini adalah kandungan contoh (sample placeholder) bagi tujuan ujian susun atur antaramuka sahaja dan bukan rekod pencapaian rasmi SRM UKM. Apabila anda mempunyai gambar dan maklumat program sebenar, sila letakkan gambar di dalam folder 'gambar/aktiviti/' dan kemas kini butiran tajuk, tarikh, lokasi serta penerangan di dalam fail 'data/aktiviti-data.js'.",
    highlights: [
      "Contoh sorotan aktiviti 1 (boleh diubah suai)",
      "Contoh sorotan aktiviti 2 (boleh diubah suai)",
      "Menyokong paparan gambar resolusi tinggi dengan fallback automatik"
    ]
  },
  {
    id: "sample-aktiviti-02",
    isSample: true,
    title: "[CONTOH SUSUN ATUR] Kempen Kampus Lestari & Pemuliharaan Alam",
    date: "2026-09-28",
    displayDate: "Tarikh Contoh (Kemaskini di data/aktiviti-data.js)",
    location: "Lokasi Contoh — Kampus UKM",
    rakanId: "rakan-bumi",
    image: "./gambar/aktiviti/activity-02.jpg",
    shortDescription:
      "Kad ini adalah contoh susun atur galeri untuk Rakan Bumi. Gantikan dengan aktiviti kelestarian sebenar SRM UKM.",
    fullDescription:
      "NOTA: Ini adalah kandungan contoh (sample placeholder) bagi memaparkan bagaimana aktiviti di bawah kategori Rakan Bumi akan kelihatan apabila ditapis oleh pelawat. Tiada maklumat program rekaan dinyatakan sebagai acara rasmi. Sila kemas kini fail 'data/aktiviti-data.js' dengan maklumat program sebenar anda.",
    highlights: [
      "Penapisan mengikut kategori Rakan berfungsi secara automatik",
      "Susunan kronologi mengikut tarikh terkini",
      "Paparan modal terperinci apabila pengguna menekan 'Lihat Butiran'"
    ]
  },
  {
    id: "sample-aktiviti-03",
    isSample: true,
    title: "[CONTOH SUSUN ATUR] Wacana Kepimpinan & Kesedaran Sivik Mahasiswa",
    date: "2026-09-10",
    displayDate: "Tarikh Contoh (Kemaskini di data/aktiviti-data.js)",
    location: "Lokasi Contoh — Kampus UKM",
    rakanId: "rakan-demokrasi",
    image: "./gambar/aktiviti/activity-03.jpg",
    shortDescription:
      "Kad ini adalah contoh susun atur galeri untuk Rakan Demokrasi. Mudah ditambah atau dipadam pada bila-bila masa.",
    fullDescription:
      "NOTA: Ini adalah kandungan contoh (sample placeholder) untuk menguji fungsi galeri Rakan Demokrasi. Anda boleh menambah seberapa banyak aktiviti baharu hanya dengan menambah objek JSON di dalam fail 'data/aktiviti-data.js' tanpa perlu menyentuh kod reka bentuk laman web.",
    highlights: [
      "Integrasi terus dengan bahagian Sorotan Aktiviti di Laman Utama",
      "Rekaan kad editorial moden dan responsif",
      "Label 'Contoh Susun Atur' boleh dimatikan dengan menukar isSample: false"
    ]
  },
  {
    id: "sample-aktiviti-04",
    isSample: true,
    title: "[CONTOH SUSUN ATUR] Program Jalinan Kasih & Kesukarelawanan Komuniti",
    date: "2026-08-22",
    displayDate: "Tarikh Contoh (Kemaskini di data/aktiviti-data.js)",
    location: "Lokasi Contoh — Komuniti Setempat",
    rakanId: "rakan-prihatin",
    image: "./gambar/aktiviti/activity-04.jpg",
    shortDescription:
      "Kad ini adalah contoh susun atur galeri untuk Rakan Prihatin bagi memaparkan program kebajikan dan sukarelawan.",
    fullDescription:
      "NOTA: Ini adalah kandungan contoh (sample placeholder) untuk Rakan Prihatin. Apabila anda memuat naik fail gambar seperti 'activity-04.jpg' ke dalam folder 'gambar/aktiviti/', gambar tersebut akan terus dipaparkan dengan kemas menggunakan nisbah aspek yang optimum.",
    highlights: [
      "Sokongan imej pintar (lazy-loading & object-fit)",
      "Fallback visual sekiranya gambar belum dimuat naik",
      "Mudah diuruskan oleh ahli jawatankuasa SRM UKM"
    ]
  },
  {
    id: "sample-aktiviti-05",
    isSample: true,
    title: "[CONTOH SUSUN ATUR] Karnival Kecergasan & Sukan Mahasiswa",
    date: "2026-08-05",
    displayDate: "Tarikh Contoh (Kemaskini di data/aktiviti-data.js)",
    location: "Lokasi Contoh — Kompleks Sukan",
    rakanId: "rakan-aktif",
    image: "./gambar/aktiviti/activity-05.jpg",
    shortDescription:
      "Kad ini adalah contoh susun atur galeri untuk Rakan Aktif bagi memaparkan aktiviti sukan, rekreasi dan gaya hidup sihat.",
    fullDescription:
      "NOTA: Ini adalah kandungan contoh (sample placeholder) untuk Rakan Aktif. Sila gantikan maklumat ini dengan program sebenar SRM UKM apabila gambar dan butiran rasmi telah sedia.",
    highlights: [
      "Reka bentuk bersih mengikut warna identiti Rakan Aktif",
      "Mesra peranti mudah alih, tablet dan desktop",
      "Sedia untuk penerbitan GitHub Pages"
    ]
  },
  {
    id: "sample-aktiviti-06",
    isSample: true,
    title: "[CONTOH SUSUN ATUR] Hari Inovasi Keusahawanan & Jualan Mahasiswa",
    date: "2026-07-19",
    displayDate: "Tarikh Contoh (Kemaskini di data/aktiviti-data.js)",
    location: "Lokasi Contoh — Kampus UKM",
    rakanId: "rakan-niaga",
    image: "./gambar/aktiviti/activity-06.jpg",
    shortDescription:
      "Kad ini adalah contoh susun atur galeri untuk Rakan Niaga bagi memaparkan inisiatif keusahawanan dan inovasi ekonomi.",
    fullDescription:
      "NOTA: Ini adalah kandungan contoh (sample placeholder) untuk Rakan Niaga. Anda boleh memadam contoh-contoh ini atau menukarkannya terus kepada aktiviti rasmi SRM UKM di dalam fail 'data/aktiviti-data.js'.",
    highlights: [
      "Kemas kini berpusat tanpa perlu mengubah kod HTML",
      "Paparan lencana kategori Rakan secara automatik",
      "Navigasi pantas antara Laman Utama dan Galeri Aktiviti"
    ]
  }
];
