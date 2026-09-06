CARA PAKAI WEB UCAPAN ULANG TAHUN INI
======================================

1. BUKA WEBSITE
   Klik dua kali file index.html, atau upload seluruh folder ini
   ke hosting gratis seperti Netlify / Vercel / GitHub Pages kalau
   mau kirim linknya ke dia.

2. GANTI NAMA
   Cari tulisan "[Nama Pacarmu]" dan "[Namamu]" di index.html,
   lalu ganti dengan nama asli (ada di beberapa tempat: judul besar,
   surat penutup, dan footer).

3. GANTI PESAN
   Buka script.js, cari bagian "const messages = [...]" lalu ubah
   teksnya sesuai cerita kalian sendiri. Ada 6 slot dengan gaya
   berbeda (puitis, lucu, tegas, dalam, janji, singkat) — boleh
   ditambah atau dikurangi jumlahnya.

4. GANTI FOTO
   - Siapkan 4 foto asli, idealnya rasio potret (4:5), format .jpg/.png.
   - Simpan di folder assets/ dengan nama: foto1.jpg, foto2.jpg,
     foto3.jpg, foto4.jpg (boleh format lain, tinggal sesuaikan nama).
   - Di index.html, cari bagian <section id="galeri"> lalu ganti
     src="assets/foto1.svg" menjadi src="assets/foto1.jpg" (dst),
     dan ganti juga data-full="assets/foto1.svg" nya.
   - Ganti juga tulisan caption di bawah tiap foto sesuai momennya.

5. TAMBAH VIDEO LATAR (opsional)
   - Simpan video pendek (disarankan di bawah 10MB, format .mp4,
     tanpa suara penting karena videonya di-mute) dengan nama
     video-latar.mp4 di folder assets/.
   - Kalau file ini tidak ada, website otomatis memakai animasi
     lampu-lampu bergerak sebagai latar — jadi tetap aman dipakai
     tanpa video sama sekali.

6. TAMBAH MUSIK LATAR (opsional, belum ada di file utama)
   Tambahkan baris ini di dalam <body> pada index.html:

     <audio id="bg-music" src="assets/musik.mp3" loop></audio>

   lalu tambahkan tombol play/pause sendiri karena browser modern
   tidak mengizinkan audio otomatis menyala tanpa interaksi user.

SELAMAT MENGEDIT DAN SEMOGA DIA SUKA! 🎉
