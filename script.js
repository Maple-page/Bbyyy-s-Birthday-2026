// ============================================================
// Setiap fitur di file ini dibungkus try/catch sendiri-sendiri.
// Tujuannya: kalau satu fitur gagal jalan (misalnya animasi latar
// diblokir browser tertentu), fitur lain seperti game dan lilin
// tetap bisa berfungsi normal.
// ============================================================

// ============================================================
// 1. LATAR ANIMASI (partikel lampu-lampu bergerak pelan ke atas)
// ============================================================
try {
(function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let particles = [];
  let width, height;
  const reduceMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function makeParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.6,
      speed: Math.random() * 0.35 + 0.08,
      drift: Math.random() * 0.4 - 0.2,
      hue: Math.random() > 0.6 ? '#f0b93d' : '#f2a6c1',
      twinkle: Math.random() * Math.PI * 2
    };
  }

  const count = window.innerWidth < 600 ? 45 : 90;
  for (let i = 0; i < count; i++) particles.push(makeParticle());

  function draw() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.twinkle += 0.02;
      const alpha = 0.4 + Math.sin(p.twinkle) * 0.3;
      ctx.beginPath();
      ctx.fillStyle = p.hue;
      ctx.globalAlpha = Math.max(0.15, alpha);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
    });
    ctx.globalAlpha = 1;
    if (!reduceMotion) requestAnimationFrame(draw);
  }
  draw();
})();
} catch (e) { console.warn('Animasi latar gagal dimuat:', e); }

// ============================================================
// 2. VIDEO LATAR — sembunyikan kalau file belum ditambahkan
// ============================================================
try {
(function initBgVideo() {
  const video = document.getElementById('bg-video');
  if (!video) return;
  video.addEventListener('error', () => video.classList.add('video-missing'));
  // Kalau tidak ada <source> yang valid, event 'error' akan terpicu otomatis.
})();
} catch (e) { console.warn('Video latar gagal dimuat:', e); }

// ============================================================
// 3. SCROLL DARI HERO
// ============================================================
try {
  const scrollBtn = document.getElementById('scroll-down-btn');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      const target = document.getElementById('pesan');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }
} catch (e) { console.warn('Tombol scroll gagal:', e); }

// ============================================================
// 4. PESAN CINTA — carousel 6 variasi gaya berbeda
//    Ganti teks di sini sesuai cerita kalian sendiri.
// ============================================================
try {
const messages = [
  {
    style: 1,
    label: '6 September',
    text: 'Di antara semua hari dalam kalender, hari ini yang paling ingin aku tandai — karena hari ini, dunia jadi lebih baik sejak kamu lahir.'
  },
  {
    style: 2,
    label: '6 September 2026',
    text: 'Met ultah ya. Makasih udah mau tahan sama aku yang kadang ngeselin, tapi sayangku ke bbyyy puolll maksimal 😄'
  },
  {
    style: 3,
    label: '6 September 2026',
    text: 'POKOKNYA HARI INI HARUS SENENG. Nggak ada penolakan. Selamat ulang tahun, orang paling berharga yang aku punya.'
  },
  {
    style: 4,
    label: '6 September 2026',
    text: 'Kadang aku lupa bilang, tapi kehadiran kamu bikin banyak hal yang tadinya berat jadi terasa lebih ringan buat dijalani. Terima kasih sudah ada di dunia bbyyyy.'
  },
  {
    style: 5,
    label: '6 September 2026',
    text: 'Aku akan selalu dengerin ceritamu, lebih sering yapping ke kamu, dan tetap milih kamu di setiap harinya.'
  },
  {
    style: 6,
    // label: '6',
    text: 'Selamat ulang tahun sayangggg. wopyuuuu bbyyyy.'
  }
];

let messageIndex = 0;
const messageCard = document.getElementById('message-card');
const messageLabel = document.querySelector('.message-card__label');
const messageText = document.getElementById('message-text');

function renderMessage(index) {
  const m = messages[index];
  messageCard.dataset.style = m.style;
  messageLabel.textContent = m.label;
  messageText.textContent = m.text;
  messageCard.style.animation = 'none';
  // eslint-disable-next-line no-unused-expressions
  messageCard.offsetHeight; // trigger reflow untuk restart animasi
  messageCard.style.animation = '';
}

document.getElementById('next-message-btn').addEventListener('click', () => {
  messageIndex = (messageIndex + 1) % messages.length;
  renderMessage(messageIndex);
});

document.getElementById('random-message-btn').addEventListener('click', () => {
  let next = Math.floor(Math.random() * messages.length);
  if (next === messageIndex) next = (next + 1) % messages.length;
  messageIndex = next;
  renderMessage(messageIndex);
});
} catch (e) { console.warn('Pesan cinta gagal dimuat:', e); }

// ============================================================
// 5. GALERI — lightbox sederhana
// ============================================================
try {
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.polaroid').forEach(btn => {
  btn.addEventListener('click', () => {
    lightboxImg.src = btn.dataset.full;
    lightbox.hidden = false;
  });
});

function closeLightbox() { lightbox.hidden = true; lightboxImg.src = ''; }
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
} catch (e) { console.warn('Galeri gagal dimuat:', e); }

// ============================================================
// 6. MINI GAME — Tangkap Cinta
// ============================================================
try {
(function initGame() {
  const stage = document.getElementById('game-stage');
  const idleScreen = document.getElementById('game-idle');
  const resultScreen = document.getElementById('game-result');
  const scoreEl = document.getElementById('game-score');
  const timeEl = document.getElementById('game-time');
  const finalScoreEl = document.getElementById('final-score');
  const gameMessageEl = document.getElementById('game-message');
  const startBtn = document.getElementById('start-game-btn');
  const restartBtn = document.getElementById('restart-game-btn');

  let score = 0;
  let timeLeft = 30;
  let spawnTimer = null;
  let countdownTimer = null;
  let activeItems = [];

  function spawnItem() {
    const isBomb = Math.random() < 0.22;
    const el = document.createElement('button');
    el.className = 'falling-item';
    el.textContent = isBomb ? '💣' : '❤️';
    el.setAttribute('aria-label', isBomb ? 'Bom' : 'Hati');

    const stageWidth = stage.clientWidth;
    const left = Math.random() * (stageWidth - 40);
    el.style.left = left + 'px';

    const duration = Math.random() * 1.8 + 2.2;
    el.style.animationDuration = duration + 's';

    el.addEventListener('click', () => {
      score += isBomb ? -5 : 10;
      score = Math.max(0, score);
      scoreEl.textContent = score;
      el.remove();
      activeItems = activeItems.filter(i => i !== el);
    });

    el.addEventListener('animationend', () => {
      el.remove();
      activeItems = activeItems.filter(i => i !== el);
    });

    stage.appendChild(el);
    activeItems.push(el);
  }

  function endGame() {
    clearInterval(spawnTimer);
    clearInterval(countdownTimer);
    activeItems.forEach(i => i.remove());
    activeItems = [];

    finalScoreEl.textContent = score;
    let msg;
    if (score >= 200) msg = 'Wah, refleksmu se-cepat cintaku ke kamu! 💘';
    else if (score >= 100) msg = 'Lumayan! Tapi cintaku tetap lebih cepat nangkep hatimu duluan 😏';
    else msg = 'Nggak apa-apa, yang penting kamu udah nangkep hatiku dari awal 🥰';
    gameMessageEl.textContent = msg;

    resultScreen.hidden = false;
  }

  function startGame() {
    score = 0;
    timeLeft = 30;
    scoreEl.textContent = '0';
    timeEl.textContent = '30';
    idleScreen.hidden = true;
    resultScreen.hidden = true;

    spawnTimer = setInterval(spawnItem, 550);
    countdownTimer = setInterval(() => {
      timeLeft -= 1;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) endGame();
    }, 1000);
  }

  startBtn.addEventListener('click', startGame);
  restartBtn.addEventListener('click', startGame);
})();
} catch (e) { console.warn('Game gagal dimuat:', e); }

// ============================================================
// 7. LILIN + CONFETTI
// ============================================================
try {
const candleBtn = document.getElementById('candle-btn');
const letter = document.getElementById('letter');
const candleHint = document.getElementById('candle-hint');

function launchConfetti() {
  const colors = ['#f0b93d', '#f2a6c1', '#d1618a', '#fbf3e6'];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('div');
    const size = Math.random() * 8 + 6;
    piece.style.position = 'fixed';
    piece.style.top = '-20px';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.width = size + 'px';
    piece.style.height = size * 0.6 + 'px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.opacity = '0.9';
    piece.style.borderRadius = '2px';
    piece.style.zIndex = '20';
    piece.style.pointerEvents = 'none';
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.transition = `transform ${2 + Math.random() * 1.5}s ease-in, top ${2 + Math.random() * 1.5}s ease-in, opacity 0.4s ease ${1.8 + Math.random()}s`;
    document.body.appendChild(piece);

    requestAnimationFrame(() => {
      piece.style.top = (60 + Math.random() * 35) + 'vh';
      piece.style.transform = `rotate(${Math.random() * 720}deg)`;
      piece.style.opacity = '0';
    });

    setTimeout(() => piece.remove(), 4000);
  }
}

candleBtn.addEventListener('click', () => {
  if (candleBtn.classList.contains('is-blown')) return;
  candleBtn.classList.add('is-blown');
  candleHint.textContent = 'Permintaanmu sudah terkirim ke semesta 🌙';
  letter.hidden = false;
  letter.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  launchConfetti();
});
} catch (e) { console.warn('Lilin gagal dimuat:', e); }

// ============================================================
// 8. ULANGI DARI AWAL
// ============================================================
try {
  const replayBtn = document.getElementById('replay-btn');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
} catch (e) { console.warn('Tombol ulangi gagal:', e); }
