/* ===========================
   SCROLL PROGRESS BAR
=========================== */
const scrollBar = document.getElementById('scroll-progress');

function updateScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollBar.style.width = (window.scrollY / max * 100) + '%';
}

/* ===========================
   BACK TO TOP BUTTON
=========================== */
const backTop = document.getElementById('back-top');
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  updateScrollProgress();
  backTop.classList.toggle('show', window.scrollY > 400);
});

/* ===========================
   SCROLL REVEAL ANIMATIONS
=========================== */
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

/* ===========================
   SKILL BAR ANIMATIONS
=========================== */
const bars = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.width = entry.target.dataset.width + '%';
      }, 200);
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

bars.forEach(bar => barObserver.observe(bar));

/* ===========================
   TYPING EFFECT
=========================== */
const phrases = [
  'Cybersecurity Student',
  'Full-Stack Developer',
  'CTF Competitor'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeIt() {
  const phrase = phrases[phraseIndex];

  if (!isDeleting) {
    typedEl.textContent = phrase.slice(0, ++charIndex);
    if (charIndex === phrase.length) {
      isDeleting = true;
      setTimeout(typeIt, 1800);
      return;
    }
  } else {
    typedEl.textContent = phrase.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeIt, isDeleting ? 55 : 90);
}

typeIt();


/* ===========================
   HAMBURGER / MOBILE MENU
=========================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// Attach closeMobile to mobile nav links
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', closeMobile);
});

/* ===========================
   CONTACT FORM VALIDATION
=========================== */
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const btn = this.querySelector('.btn-primary');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate send — replace setTimeout with actual fetch/EmailJS in production
  setTimeout(() => {
    const successMsg = document.getElementById('success-msg');
    successMsg.classList.add('show');
    btn.textContent = 'Send Message ✦';
    btn.disabled = false;
    this.reset();
    setTimeout(() => successMsg.classList.remove('show'), 5000);
  }, 1000);
});

/* ===========================
   HERO ENTRY ANIMATION
=========================== */
window.addEventListener('load', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) heroContent.classList.add('visible');

  setTimeout(() => {
    document.querySelectorAll('.hero-badge .badge-card').forEach(card => {
      card.classList.add('visible');
    });
  }, 300);
});
