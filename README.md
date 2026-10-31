# Sekretariat Rakan Muda UKM (SRM UKM) — Laman Web Rasmi Interaktif
**Tagline:** *"SRM Peneraju Persada"*

Laman web statik moden dan interaktif untuk **Sekretariat Rakan Muda Universiti Kebangsaan Malaysia (SRM UKM)**. Dibangunkan menggunakan seni bina modular **HTML5, CSS3 & Vanilla JavaScript** tanpa kebergantungan pangkalan data atau pelayan berbayar, serta sedia diterbitkan terus ke **GitHub Pages** (termasuk pada sub-laluan `https://username.github.io/repository-name/`).

---

## Struktur Folder Projek

```text
srm-ukm/
├── index.html                  # Dokumen utama dengan 5 seksyen (Home, Rakan, Aktiviti, Game, Contact)
├── README.md                   # Dokumentasi penyelenggaraan & panduan GitHub Pages
├── data/
│   ├── site-config.js          # Konfigurasi pautan Instagram, TikTok & tetapan organisasi
│   ├── rakan-data.js           # Data berpusat untuk 9 portfolio Rakan Muda
│   ├── aktiviti-data.js        # Data berpusat untuk galeri aktiviti & sorotan Laman Utama
│   └── game-questions.js       # Bank soalan (18 soalan emoji) untuk permainan "Teka Rakan!"
├── styles/
│   └── main.css                # Reka bentuk visual, susun atur responsif & animasi
├── scripts/
│   ├── carousel.js             # Pengawal karusel mendatar Rakan (swipe, drag, arrows, dots, dock)
│   ├── game.js                 # Enjin permainan interaktif "Teka Rakan!"
│   └── app.js                  # Pengawal navigasi, penapis aktiviti, modal & pautan sosial
└── gambar/
    ├── PANDUAN_GAMBAR.md       # Spesifikasi saiz dan format gambar yang disyorkan
    ├── logo/                   # Letakkan srm-logo.png & 9 logo Rakan di sini
    ├── aktiviti/               # Letakkan gambar program (activity-01.jpg, dll.) di sini
    └── gallery/                # Folder tambahan untuk koleksi gambar galeri
```

---

## Panduan Kemas Kini Kandungan

### 1. Cara Mengemas Kini Portfolio Rakan (Termasuk Rakan Kesembilan)
Buka fail [`data/rakan-data.js`](./data/rakan-data.js).
- Untuk mengemas kini **Rakan Kesembilan**, cari objek dengan `id: "rakan-kesembilan"`.
- Tukar nilai `name`, `shortName`, `coreFocus`, `logo`, `accentColor`, `shortDescription`, `detailedExplanation`, `functions`, dan `examples`.
- Tukar `isConfigured: false` kepada `isConfigured: true`.

### 2. Cara Menambah atau Mengemas Kini Aktiviti
Buka fail [`data/aktiviti-data.js`](./data/aktiviti-data.js).
1. Simpan gambar program di dalam folder `gambar/aktiviti/` (contoh: `karnival-srm.jpg`).
2. Tambah objek baharu di dalam tatasusunan `window.AKTIVITI_DATA`:
   ```js
   {
     id: "aktiviti-2026-01",
     isSample: false, // Tetapkan false untuk aktiviti sebenar SRM UKM
     title: "Nama Program Rasmi SRM UKM",
     date: "2026-11-01", // Format YYYY-MM-DD untuk susunan kronologi automatik
     displayDate: "1 November 2026",
     location: "Dewan Canselor Tun Abdul Razak (DECTAR), UKM",
     rakanId: "rakan-digital", // Pilih id Rakan yang berkaitan
     image: "./gambar/aktiviti/karnival-srm.jpg",
     shortDescription: "Ringkasan pendek program untuk paparan kad.",
     fullDescription: "Penerangan penuh program apabila pelawat menekan Lihat Butiran.",
     highlights: [
       "Sorotan pencapaian atau pengisian 1",
       "Sorotan pencapaian atau pengisian 2"
     ]
   }
   ```
3. Bahagian **Sorotan Terkini** di Laman Utama dan **Galeri Aktiviti** akan dikemas kini secara automatik.

### 3. Cara Mengemas Kini Pautan Instagram & TikTok Rasmi
Buka fail [`data/site-config.js`](./data/site-config.js):
- Masukkan `@username` pada medan `handle` dan URL penuh pada medan `url`.
- Tukar `isConfigured: false` kepada `isConfigured: true`.

---

## Panduan Penerbitan ke GitHub Pages (Deployment)

1. **Cipta Repositori GitHub:**
   - Log masuk ke akaun GitHub anda dan klik **New repository**.
   - Namakan repositori (contoh: `srm-ukm`) dan tetapkan kepada **Public**.
2. **Muat Naik / Push Projek ke GitHub:**
   Jalankan arahan berikut di dalam terminal pada folder `srm-ukm`:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Laman Web Rasmi SRM UKM"
   git branch -M main
   git remote add origin https://github.com/USERNAME_ANDA/srm-ukm.git
   git push -u origin main
   ```
3. **Aktifkan GitHub Pages:**
   - Buka repositori anda di GitHub -> klik tab **Settings** -> pilih **Pages** di menu kiri.
   - Di bawah **Build and deployment** -> **Source**, pilih **Deploy from a branch**.
   - Pilih branch **`main`** dan folder **`/ (root)`**, kemudian klik **Save**.
4. **Akses Laman Web:**
   - Selepas 1–2 minit, laman web anda akan aktif di `https://USERNAME_ANDA.github.io/srm-ukm/`.
