const revealItems = document.querySelectorAll('section, .service-card, .project-card, .tools-panel, .hero-stats div, .tools-list span, .why-grid article, .hero-badges span');
revealItems.forEach((item, index) => {
  item.classList.add('reveal');
  item.style.transitionDelay = `${Math.min(index * 35, 260)}ms`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

const headline = document.querySelector('h1');
if (headline) {
  headline.dataset.text = headline.textContent;
  headline.innerHTML = headline.textContent
    .split(' ')
    .map((word, i) => `<span class="word" style="--i:${i}">${word}</span>`)
    .join(' ');
}

const visual = document.querySelector('.hero-visual');
if (visual && window.matchMedia('(pointer: fine)').matches) {
  visual.addEventListener('mousemove', (event) => {
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    visual.style.setProperty('--tilt-x', `${y * -8}deg`);
    visual.style.setProperty('--tilt-y', `${x * 10}deg`);
    visual.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    visual.style.setProperty('--my', `${event.clientY - rect.top}px`);
  });
  visual.addEventListener('mouseleave', () => {
    visual.style.setProperty('--tilt-x', '0deg');
    visual.style.setProperty('--tilt-y', '0deg');
  });
}

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
  document.body.style.setProperty('--scroll', window.scrollY * 0.04 + 'px');
});

const cards = document.querySelectorAll('.project-card, .service-card, .why-grid article');
cards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--y', `${event.clientY - rect.top}px`);
  });
});
