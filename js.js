// =============================
// PERSONALISASI WEBSITE
// =============================
const birthdayName = "Latifah Aruni Ramadhani";

const birthdayMessage =
  "Selamat ulang tahun arunii, semoga sehat selalu, dan bahagia selalu yaa, semoga semua impianmu juga tercapai, aku buat ini cuma karena mau belajar buat website dan karena berdekatan sama ulang tahun mu yaa sekalian wkwkw, sekali lagi selamat ulang tahun, semoga tuhan selalu memperlancar jalan mu, aminnnn. ✨";

// =============================
// ELEMENTS
// =============================
const intro = document.getElementById("intro");
const openBtn = document.getElementById("openBtn");
const blowBtn = document.getElementById("blowBtn");
const wishText = document.getElementById("wishText");
const wishHint = document.getElementById("wishHint");
const nameDisplay = document.getElementById("nameDisplay");
const typedMessage = document.getElementById("typedMessage");
const retypeBtn = document.getElementById("retypeBtn");
const petals = document.getElementById("petals");
const confetti = document.getElementById("confetti");
const hearts = document.getElementById("hearts");
const surpriseBtn = document.getElementById("surpriseBtn");
const finalMessage = document.getElementById("finalMessage");
const musicBtn = document.getElementById("musicBtn");
const audio = document.getElementById("birthdayAudio");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const scrollDownBtn = document.getElementById("scrollDownBtn");

// Personalization
nameDisplay.textContent = birthdayName;

// Function untuk memutar musik
async function playAudio() {
  try {
    await audio.play();
    musicBtn.classList.add("playing");
    musicBtn.textContent = "⏸️";
  } catch (err) {
    console.log("Autoplay dicegah oleh browser:", err);
  }
}

// Intro - Buka Kejutan & Langsung Putar Musik
openBtn.addEventListener("click", () => {
  intro.classList.add("hide");
  playAudio();
  burstConfetti(80);
  createFloatingFlowers(15);
  setTimeout(() => {
    document.getElementById("home").scrollIntoView({ behavior: "smooth" });
  }, 500);
});

// Mobile menu
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Candle
blowBtn.addEventListener("click", () => {
  document.querySelectorAll(".flame").forEach(flame => {
    flame.style.animation = "none";
    flame.style.opacity = "0";
    flame.style.transform = "scale(.2) translateY(12px)";
  });

  wishText.classList.remove("hidden");
  wishHint.textContent = "Harapannya sudah disimpan semesta ✨";
  blowBtn.textContent = "Lilin Sudah Ditiup 🪻";
  blowBtn.disabled = true;
  blowBtn.style.opacity = ".7";

  burstConfetti(120);
  createFloatingFlowers(22);
  createPetals(18);
});

// Typing effect
let typingTimer;
function typeMessage() {
  clearInterval(typingTimer);
  typedMessage.textContent = "";
  let index = 0;

  typingTimer = setInterval(() => {
    typedMessage.textContent = birthdayMessage.slice(0, index);
    index++;
    if (index > birthdayMessage.length) clearInterval(typingTimer);
  }, 28);
}
typeMessage();
retypeBtn.addEventListener("click", typeMessage);

// Falling petals & Lavender
function createPetals(amount = 12) {
  const flowerIcons = ["🌸", "🪻", "✿", "✨"];
  for (let i = 0; i < amount; i++) {
    const el = document.createElement("span");
    el.className = "petal";
    el.textContent = flowerIcons[Math.floor(Math.random() * flowerIcons.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${5 + Math.random() * 6}s`;
    el.style.animationDelay = `${Math.random() * 2}s`;
    el.style.fontSize = `${12 + Math.random() * 12}px`;
    petals.appendChild(el);
    setTimeout(() => el.remove(), 13000);
  }
}
setInterval(() => createPetals(3), 2500);
createPetals(10);

// Confetti
function burstConfetti(amount = 80) {
  const shapes = ["✦", "●", "◆", "🪻"];
  for (let i = 0; i < amount; i++) {
    const el = document.createElement("span");
    el.className = "confetti-piece";
    el.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.fontSize = `${8 + Math.random() * 12}px`;
    el.style.width = "auto";
    el.style.height = "auto";
    el.style.color = ["#c8a8ef", "#f1afd8", "#fff", "#9d78cf", "#ffd68c"][Math.floor(Math.random() * 5)];
    el.style.animationDelay = `${Math.random() * .8}s`;
    confetti.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  }
}

// Floating Lavender
function createFloatingFlowers(amount = 10) {
  const floatingIcons = ["🪻", "🌸", "✨"];
  for (let i = 0; i < amount; i++) {
    const el = document.createElement("span");
    el.className = "heart-piece";
    el.textContent = floatingIcons[Math.floor(Math.random() * floatingIcons.length)];
    el.style.left = `${20 + Math.random() * 60}%`;
    el.style.setProperty("--x", `${-120 + Math.random() * 240}px`);
    el.style.animationDelay = `${Math.random() * .8}s`;
    hearts.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  }
}

// =============================
// EFEK KEMBANG API (FIREWORKS)
// =============================
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 3 + 1;
    this.velocity = {
      x: (Math.random() - 0.5) * (Math.random() * 8 + 4),
      y: (Math.random() - 0.5) * (Math.random() * 8 + 4)
    };
    this.alpha = 1;
    this.friction = 0.96;
    this.gravity = 0.08;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.012;
  }
}

function launchFireworks() {
  const colors = ["#a88beb", "#f8ceec", "#ffffff", "#e1bee7", "#ffd1dc", "#c8b6ff"];
  let timer = 0;
  
  const interval = setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height * 0.6);
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    for (let i = 0; i < 40; i++) {
      particles.push(new Particle(x, y, color));
    }
    
    timer++;
    if (timer > 15) clearInterval(interval);
  }, 250);
}

function animateFireworks() {
  requestAnimationFrame(animateFireworks);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    if (particle.alpha > 0) {
      particle.update();
      particle.draw();
    } else {
      particles.splice(index, 1);
    }
  });
}
animateFireworks();

// =============================
// FINAL SURPRISE ACTION
// =============================
surpriseBtn.addEventListener("click", () => {
  finalMessage.classList.remove("hidden");
  surpriseBtn.classList.add("hidden");

  // Pemicu Efek Melimpah & Kembang Api
  launchFireworks();
  burstConfetti(250);
  createFloatingFlowers(60);
  createPetals(60);

  // Loop hujan bunga melimpah selama 5 detik
  let extraPetals = setInterval(() => {
    createPetals(15);
  }, 400);

  setTimeout(() => {
    clearInterval(extraPetals);
  }, 5000);
});

// Music Toggle Button
musicBtn.addEventListener("click", () => {
  if (audio.paused) {
    playAudio();
  } else {
    audio.pause();
    musicBtn.classList.remove("playing");
    musicBtn.textContent = "🎵";
  }
});

// Scroll Controls
window.addEventListener("scroll", () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }

  if (window.scrollY >= maxScroll - 50) {
    scrollDownBtn.classList.add("hide");
  } else {
    scrollDownBtn.classList.remove("hide");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

scrollDownBtn.addEventListener("click", () => {
  window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));