/**
 * Hero Section Scroll Animation
 * Simple fade effect for hero section during scroll
 */

// Hàm kiểm tra và chờ GSAP load xong
function waitForGSAP(callback, attempts = 0) {
  const maxAttempts = 50; // Tối đa 5 giây
  
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    callback();
  } else if (attempts < maxAttempts) {
    setTimeout(() => {
      waitForGSAP(callback, attempts + 1);
    }, 100);
  } else {
    console.error('GSAP/ScrollTrigger failed to load after 5 seconds');
  }
}

// Khởi tạo hero fade animation
function initHeroFadeAnimation() {
  try {
    // Đăng ký ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Kiểm tra hero section có tồn tại không
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) {
      console.warn('Hero section not found');
      return;
    }

    // Tạo timeline với ScrollTrigger cho fade effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: '+=200%',
        scrub: 2.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: self => {
          console.log('Scroll progress:', self.progress);
        },
        onRefresh: () => {
          console.log('ScrollTrigger refreshed');
        }
      }
    });

    // Simple fade out effect khi scroll
    tl.to(heroSection, {
      opacity: 0,
      duration: 2,
      ease: "power2.out"
    });

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
    
    console.log('Hero fade animation initialized successfully');
    
  } catch (error) {
    console.error('Error initializing hero fade animation:', error);
  }
}

// Chờ DOM và GSAP load xong
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    waitForGSAP(initHeroFadeAnimation);
  });
} else {
  waitForGSAP(initHeroFadeAnimation);
}

// Refresh ScrollTrigger khi resize window
window.addEventListener('resize', () => {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
});

// Debug: Log khi scripts load
window.addEventListener('load', () => {
  console.log('Hero animation script loaded');
  console.log('GSAP available:', typeof gsap !== 'undefined');
  console.log('ScrollTrigger available:', typeof ScrollTrigger !== 'undefined');
});