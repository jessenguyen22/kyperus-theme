

// DOM load
document.addEventListener('DOMContentLoaded', initHeroFadeAnimation);

function initHeroFadeAnimation() {
 try {
   // Đăng ký ScrollTrigger plugin
   gsap.registerPlugin(ScrollTrigger);
   
   const tl = gsap.timeline({
     scrollTrigger: {
       trigger: '.hero-section',
       start: 'top top',
       end: '+=200%',
       scrub: 2.5,
       pin: true,
     }
   });
   
   // Tạo timeline với ScrollTrigger cho fade effect
   tl.to('.hero-section', {
     opacity: 0,
     duration: 2,
     ease: "power2.out"
   }).to('.mask-wrapper', {
     maskSize: '100% 100%',
     maskPosition: '50% 50%',
     duration: 2,
     ease: "power2.inOut"
   }, '<');

 } catch (error) {
   console.error('Error initializing hero animation:', error);
 }
}