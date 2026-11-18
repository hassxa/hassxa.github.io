function scrollToSection(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function initializeParticles() {
  const container = document.getElementById('particles');
  if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 36; i += 1) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = [
      'position:absolute',
      `width:${Math.random() * 3 + 2}px`,
      `height:${Math.random() * 3 + 2}px`,
      `background:rgba(255,255,255,${Math.random() * 0.24 + 0.08})`,
      'border-radius:50%',
      `left:${Math.random() * 100}%`,
      `top:${Math.random() * 100}%`,
      `animation:float ${Math.random() * 10 + 6}s ease-in-out infinite`,
      `animation-delay:${Math.random() * 5}s`
    ].join(';');
    fragment.appendChild(particle);
  }
  container.appendChild(fragment);
}

function initializeAnimations() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.project-card, .contact-card, .focus-card').forEach((element) => observer.observe(element));
}

function initializeArchitectureModal() {
  const modal = document.getElementById('architectureModal');
  const openButton = document.getElementById('openArchitecture');
  const closeButton = modal?.querySelector('.architecture-close');
  if (!modal || !openButton || !closeButton) return;
  let lastFocused = null;
  const open = () => {
    lastFocused = document.activeElement;
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  };
  const close = () => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocused?.focus?.();
  };
  openButton.addEventListener('click', open);
  closeButton.addEventListener('click', close);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') close();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeParticles();
  initializeAnimations();
  initializeArchitectureModal();
});
