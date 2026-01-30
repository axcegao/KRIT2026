document.addEventListener('DOMContentLoaded', () => {
  if (typeof particlesJS === 'function') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 120, density: { enable: true, value_area: 800 } },
        color: { value: '#00FFAA' },
        shape: { type: 'polygon', polygon: { nb_sides: 3 } },
        opacity: { value: 0.4, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.1 } },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 140,
          color: '#00FFAA',
          opacity: 0.15,
          width: 0.8
        },
        move: {
          enable: true,
          speed: 1.3,
          direction: 'none',
          random: true,
          out_mode: 'out'
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: false }, onclick: { enable: false } }
      },
      retina_detect: true
    });
  }

  // Эффект переписывания
  const rewriteElements = document.querySelectorAll('.hover-rewrite');
  rewriteElements.forEach(el => {
    const originalText = el.textContent.trim();
    let isAnimating = false;

    el.addEventListener('mouseenter', () => {
      if (isAnimating) return;
      isAnimating = true;

      // Сохраняем оригинальный текст
      el.dataset.original = originalText;
      el.classList.add('rewriting');

      // Создаём контейнер для анимации
      const letters = originalText.split('');
      let animatedHTML = '';
      letters.forEach((char, i) => {
        animatedHTML += `<span class="highlight" style="animation-delay: ${i * 0.03}s">${char === ' ' ? '&nbsp;' : char}</span>`;
      });
      el.innerHTML = animatedHTML;

      // Восстанавливаем после завершения
      setTimeout(() => {
        el.textContent = originalText;
        el.classList.remove('rewriting');
        isAnimating = false;
      }, letters.length * 30 + 100);
    });

    el.addEventListener('mouseleave', () => {
      if (isAnimating) {
        el.textContent = el.dataset.original || originalText;
        el.classList.remove('rewriting');
        isAnimating = false;
      }
    });
  });

  // Генератор паролей
  const passwordDisplay = document.getElementById('passwordDisplay');
  const passwordLength = document.getElementById('passwordLength');
  const generateBtn = document.getElementById('generateBtn');
  const copyBtn = document.getElementById('copyBtn');

  function generatePassword() {
    const length = parseInt(passwordLength.value);
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    passwordDisplay.textContent = password;
  }

  generateBtn.addEventListener('click', generatePassword);
  generatePassword();

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordDisplay.textContent).then(() => {
      copyBtn.textContent = 'Скопировано!';
      setTimeout(() => copyBtn.textContent = 'Копировать', 2000);
    });
  });

  // Плавная прокрутка
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Мобильное меню
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
  }
});