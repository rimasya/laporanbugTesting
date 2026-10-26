# BugHunt Lab — Praktik Bug Hunting & Defect Reporting

Website statis untuk latihan mahasiswa mata kuliah Testing dan Implementasi Sistem.

## Fitur
- Aplikasi simulasi pengumpulan tugas mahasiswa.
- Aturan bisnis sebagai acuan expected result.
- Form defect report dengan ID, severity, priority, langkah reproduksi, expected/actual result, dan bukti.
- Daftar laporan tersimpan di browser.
- Ekspor laporan ke CSV untuk dikumpulkan.
- Tampilan responsif desktop dan ponsel.

## Menjalankan secara lokal
1. Ekstrak folder.
2. Buka `index.html` di browser.
3. Uji formulir pengumpulan tugas menggunakan skenario positif, negatif, batas, dan pengiriman berulang.
4. Catat temuan di bagian **Lapor defect**.
5. Klik **Ekspor CSV** untuk menyimpan laporan.

Tidak perlu Node.js, database, atau server. File yang dipilih hanya dibaca nama dan ukurannya oleh browser; file tidak diunggah.

## Batasan penting
- Ini aplikasi statis untuk pembelajaran, bukan sistem pengumpulan tugas sungguhan.
- Laporan menggunakan `localStorage` di browser/perangkat masing-masing.
- Laporan tidak otomatis terkirim ke dosen. Mahasiswa harus mengekspor CSV dan mengumpulkannya melalui LMS/email/kanal kelas.
- Gunakan data fiktif, bukan data pribadi sungguhan.

## Publikasi gratis dengan GitHub Pages
1. Buat akun di https://github.com jika belum punya.
2. Klik **New repository**. Nama contoh: `bughunt-lab`.
3. Pilih **Public**, lalu buat repository.
4. Unggah `index.html`, `style.css`, `app.js`, dan `README.md` ke root repository.
5. Buka **Settings → Pages**.
6. Pada **Build and deployment**, pilih **Deploy from a branch**.
7. Pilih branch `main` dan folder `/(root)`, lalu klik **Save**.
8. Tunggu proses deploy selesai. URL biasanya berbentuk `https://USERNAME.github.io/bughunt-lab/`.

Jika URL belum muncul, refresh halaman Settings → Pages setelah beberapa menit. GitHub Pages gratis untuk website statis pada repository publik. Menu dapat sedikit berbeda tergantung tampilan GitHub.

## Saran tugas mahasiswa
- Buat minimal 8 skenario uji: positif, negatif, batas, dan pengiriman berulang.
- Buktikan setiap defect; jangan mengarang temuan.
- Isi satu defect report per temuan yang valid.
- Tentukan severity dan priority beserta alasannya.
- Ekspor CSV dan kumpulkan bersama screenshot bukti.
