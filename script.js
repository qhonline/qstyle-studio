const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealEls.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
  observer.observe(el);
});

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

const portrait = document.querySelector('.portrait-wrap');
if (portrait) {
  portrait.addEventListener('mousemove', (event) => {
    const rect = portrait.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    portrait.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  portrait.addEventListener('mouseleave', () => {
    portrait.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
}
