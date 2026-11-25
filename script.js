/* ════════════════════════════════════════
   WEDDING INVITATION JS – Adarsh & Avani
   ════════════════════════════════════════ */

// ─── COUNTDOWN TIMER ─────────────────────────────────────────
(function initCountdown() {
  const weddingDate = new Date('2027-02-07T12:13:00+05:30');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now  = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('days').textContent    = '00';
      document.getElementById('hours').textContent   = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    animateNumber('days',    pad(days));
    animateNumber('hours',   pad(hours));
    animateNumber('minutes', pad(minutes));
    animateNumber('seconds', pad(seconds));
  }

  function animateNumber(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.textContent !== value) {
      el.style.transform = 'scale(1.2)';
      el.style.color = 'var(--gold)';
      setTimeout(() => {
        el.textContent = value;
        el.style.transform = 'scale(1)';
        el.style.color = '';
      }, 150);
    }
  }

  tick();
  setInterval(tick, 1000);
})();

// ─── FLOATING PARTICLES ──────────────────────────────────────
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 5 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.5 + 0.1;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -10px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${opacity};
      background: ${Math.random() > 0.5 ? '#D4AF37' : '#c9a227'};
    `;
    container.appendChild(p);
  }
})();

// ─── SCROLL ANIMATIONS ───────────────────────────────────────
(function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  // Add fade-in class to key sections
  const sections = document.querySelectorAll(
    '.countdown-section, .invitation-section, .couple-section, .event-section, .story-section, .glimpses-section, .rsvp-section, .quote-section'
  );
  sections.forEach(sec => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(30px)';
    sec.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(sec);
  });

  // IntersectionObserver callback adds 'visible' class
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .countdown-section.visible,
    .invitation-section.visible,
    .couple-section.visible,
    .event-section.visible,
    .story-section.visible,
    .glimpses-section.visible,
    .rsvp-section.visible,
    .quote-section.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(styleEl);
})();

// ─── PERSON CARDS STAGGER ────────────────────────────────────
(function staggerCards() {
  const cards = document.querySelectorAll('.person-card, .count-box');
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
          }, i * 120);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px) scale(0.97)';
    card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    obs.observe(card);
  });
})();

// ─── IMAGE FALLBACK ──────────────────────────────────────────
(function handleImageFallback() {
  const brideImg = document.getElementById('bride-img');
  const groomImg = document.getElementById('groom-img');

  function setupFallback(img) {
    if (!img) return;
    img.addEventListener('error', function () {
      this.style.display = 'none';
      const fallback = this.parentElement.querySelector('.photo-fallback');
      if (fallback) fallback.style.display = 'flex';
    });
  }

  setupFallback(brideImg);
  setupFallback(groomImg);
})();

// ─── SMOOTH SCROLL ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── LOCATION BUTTON RIPPLE ───────────────────────────────────
document.querySelectorAll('.btn-loc').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: 10px; height: 10px;
      background: rgba(255,255,255,0.4);
      border-radius: 50%;
      pointer-events: none;
      transform: scale(0);
      animation: rippleAnim 0.6s ease-out;
      left: ${e.offsetX - 5}px;
      top: ${e.offsetY - 5}px;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Ripple keyframe
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(20); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

// Initialize Lucide vector icons
if (window.lucide) {
  lucide.createIcons();
}

// ─── BACKGROUND MUSIC PLAYER ──────────────────────────────────
(function initMusicPlayer() {
  const musicBtn = document.createElement('button');
  musicBtn.className = 'music-toggle';
  musicBtn.setAttribute('aria-label', 'Toggle Music');
  musicBtn.innerHTML = '<i data-lucide="volume-x"></i>';
  document.body.appendChild(musicBtn);

  const audio = document.createElement('audio');
  audio.id = 'bg-music';
  audio.src = 'song.mp3';
  audio.loop = true;
  document.body.appendChild(audio);

  let isPlaying = false;

  function togglePlay() {
    if (isPlaying) {
      audio.pause();
      musicBtn.classList.remove('playing');
      musicBtn.innerHTML = '<i data-lucide="volume-x"></i>';
      if (window.lucide) lucide.createIcons();
    } else {
      audio.play().then(() => {
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '<i data-lucide="volume-2"></i>';
        if (window.lucide) lucide.createIcons();
        startFloatingNotes();
      }).catch(err => console.log("Autoplay prevented:", err));
    }
    isPlaying = !isPlaying;
  }

  musicBtn.addEventListener('click', togglePlay);

  // Attempt to play on first user interaction (scroll or click)
  function handleFirstInteraction() {
    if (!isPlaying) {
      togglePlay();
    }
    window.removeEventListener('click', handleFirstInteraction);
    window.removeEventListener('scroll', handleFirstInteraction);
  }
  window.addEventListener('click', handleFirstInteraction);
  window.addEventListener('scroll', handleFirstInteraction);

  // Floating music notes effect
  let noteInterval;
  function startFloatingNotes() {
    if (noteInterval) clearInterval(noteInterval);
    noteInterval = setInterval(() => {
      if (!isPlaying) {
        clearInterval(noteInterval);
        return;
      }
      const note = document.createElement('span');
      note.className = 'music-note';
      note.textContent = Math.random() > 0.5 ? '🎵' : '🎶';
      const btnRect = musicBtn.getBoundingClientRect();
      note.style.left = `${btnRect.left + 15 + Math.random() * 20}px`;
      note.style.top = `${btnRect.top + window.scrollY - 10}px`;
      note.style.position = 'absolute';
      document.body.appendChild(note);
      setTimeout(() => note.remove(), 2000);
    }, 800);
  }
})();

// Lock body scroll on load
document.body.classList.add('scroll-locked');

// Preloader Hide
(function initPreloader() {
  const el = document.getElementById("preloader");
  if (!el) return;
  window.addEventListener("load", () => {
    setTimeout(() => el.classList.add("is-hidden"), 500);
  });
  setTimeout(() => el.classList.add("is-hidden"), 3000);
})();

// Arch Reveal (signature door opening)
(function initArchReveal() {
  const cta = document.getElementById("archCta");
  const frame = document.getElementById("archFrame");
  const hero = document.getElementById("hero");

  if (!cta || !frame) return;

  function openArch() {
    frame.classList.add("is-open");
    if (hero) hero.classList.add("is-open");
    document.body.classList.remove('scroll-locked');
    spawnRingParticles();

    // Trigger the music to play automatically on opening
    const musicBtn = document.querySelector('.music-toggle');
    if (musicBtn && !musicBtn.classList.contains('playing')) {
      musicBtn.click();
    }
  }

  cta.addEventListener("click", openArch);
  cta.addEventListener("keyup", (e) => {
    if (e.key === "Enter" || e.key === " ") openArch();
  });
})();

// Ring particle burst (played when the arch opens)
function spawnRingParticles() {
  const holder = document.getElementById("ringParticles");
  if (!holder || holder.dataset.played) return;
  holder.dataset.played = "true";

  const RING_SVG = (size, hue) => `
    <svg viewBox="0 0 40 40" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="15" fill="none" stroke="${hue}" stroke-width="2.4"/>
    </svg>`;

  const COUNT = 16;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement("span");
    p.className = "ring-particle";

    const size = 14 + Math.random() * 22;
    const hue = Math.random() > 0.5 ? "#D4AF37" : "#ede0c8";
    p.innerHTML = RING_SVG(size, hue);

    const startX = 50 + (Math.random() * 60 - 30);
    const drift = (Math.random() * 220 - 110);
    const rise = 260 + Math.random() * 220;
    const rotate = (Math.random() * 360 - 180).toFixed(0);
    const delay = (Math.random() * 0.35).toFixed(2);
    const duration = (2.2 + Math.random() * 1.4).toFixed(2);

    p.style.left = `${startX}%`;
    p.style.setProperty("--drift", `${drift}px`);
    p.style.setProperty("--rise", `-${rise}px`);
    p.style.setProperty("--rotate", `${rotate}deg`);
    p.style.animationDelay = `${delay}s`;
    p.style.animationDuration = `${duration}s`;

    holder.appendChild(p);
    setTimeout(() => p.remove(), (parseFloat(duration) + parseFloat(delay)) * 1000 + 200);
  }
}

console.log('💍 Adarsh & Avani Wedding Website Loaded');

// ─── LOVE STORY TIMELINE ─────────────────────────────────────
(function initStoryTimeline() {
  const timeline = document.getElementById('storyTimeline');
  const fill = document.getElementById('storyLineFill');
  if (!timeline) return;
  const items = timeline.querySelectorAll('.story-item');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  items.forEach(it => io.observe(it));

  function updateLine() {
    if (!fill) return;
    const r = timeline.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    const progress = Math.min(1, Math.max(0, (vh * 0.65 - r.top) / r.height));
    fill.style.height = (progress * 100) + '%';
  }
  window.addEventListener('scroll', updateLine, { passive: true });
  window.addEventListener('resize', updateLine);
  updateLine();
})();

// ─── RSVP FORM (Google Apps Script) ──────────────────────────
(function initRSVP() {
  const RSVP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz8j0LELHkqOSKhWDNQoHKIgkA4ihLhSCaOCD2hHRFMdDodXaXI4N3AeMX7tlkLNP3Byg/exec';

  const form = document.getElementById('rsvpForm');
  const attendanceInput = document.getElementById('rsvpAttendance');
  const toggleBtns = document.querySelectorAll('.rsvp-toggle-btn');
  const guestsGroup = document.getElementById('rsvpGuestsGroup');
  const guestsInput = document.getElementById('rsvpGuests');
  const submitBtn = document.getElementById('rsvpSubmitBtn');
  const statusEl = document.getElementById('rsvpStatus');
  if (!form) return;

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const val = btn.dataset.value;
      attendanceInput.value = val;

      if (val === 'No') {
        guestsGroup.style.display = 'none';
        guestsInput.required = false;
        guestsInput.value = '0';
      } else {
        guestsGroup.style.display = 'flex';
        guestsInput.required = true;
        if (guestsInput.value === '0' || !guestsInput.value) guestsInput.value = '1';
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.classList.remove('is-error');

    if (!RSVP_SCRIPT_URL) {
      statusEl.classList.add('is-error');
      statusEl.textContent = 'Please add your Google Apps Script Web App URL in script.js.';
      return;
    }

    const payload = {
      attendance: attendanceInput.value,
      name: document.getElementById('rsvpName').value.trim(),
      phone: document.getElementById('rsvpPhone').value.trim(),
      guests: attendanceInput.value === 'No' ? 0 : Number(guestsInput.value || 1),
      message: document.getElementById('rsvpMessage').value.trim(),
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    statusEl.textContent = '';

    try {
      await fetch(RSVP_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload),
      });

      statusEl.textContent =
        payload.attendance === 'Yes'
          ? 'Thank you! We look forward to celebrating with you.'
          : 'Thank you for letting us know. You will be missed!';
      form.reset();
      toggleBtns[0].click();
    } catch (err) {
      statusEl.classList.add('is-error');
      statusEl.textContent = 'Something went wrong. Please try again.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit RSVP';
    }
  });
})();
