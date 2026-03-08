/* ============================================
   PHOTOS BY KYLE — Global JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Custom Cursor ----
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
if (cursor && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function animateCursor() {
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animateCursor);
  })();

  // Links and buttons: hide custom cursor so native pointer shows
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hidden');
      ring.classList.add('hidden');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hidden');
      ring.classList.remove('hidden');
    });
  });

  // Gallery items: expand ring to signal clickability
  document.querySelectorAll('[data-src]').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('expand'));
    el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
  });
}

  // ---- Scrolled Nav ----
  const nav = document.querySelector('nav');
  if (nav) {
    const handleScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  // ---- Mobile Nav ----
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Scroll Reveal ----
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
  }

  // ---- Lightbox ----
  const lightbox      = document.getElementById('lightbox');
  const lbImg         = document.getElementById('lb-img');
  const lbCaption     = document.getElementById('lb-caption');
  const lbClose       = document.getElementById('lb-close');
  const lbPrev        = document.getElementById('lb-prev');
  const lbNext        = document.getElementById('lb-next');
  const galleryItems  = Array.from(document.querySelectorAll('.grid-item[data-src]'));
  let currentIndex    = 0;

  function openLightbox(index) {
    if (!lightbox || !lbImg) return;
    currentIndex = index;
    const item = galleryItems[index];
    lbImg.src = item.dataset.src;
    const thumbImg = item.querySelector('img');
    lbImg.alt = thumbImg ? thumbImg.alt : (item.dataset.caption || '');
    if (lbCaption) lbCaption.textContent = item.dataset.caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function showPrev() { openLightbox((currentIndex - 1 + galleryItems.length) % galleryItems.length); }
  function showNext() { openLightbox((currentIndex + 1) % galleryItems.length); }

  galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev)  lbPrev.addEventListener('click', showPrev);
  if (lbNext)  lbNext.addEventListener('click', showNext);
  if (lightbox) {
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  }
  document.addEventListener('keydown', e => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

});
