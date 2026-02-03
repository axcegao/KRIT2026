const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

document.addEventListener('DOMContentLoaded', () => {
  if (typeof particlesJS === 'function') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: { value: 0.7, random: true },
        size: { value: 2, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.35,
          width: 1.0
        },
        move: {
          enable: true,
          speed: 1.0,
          direction: 'none',
          random: true,
          out_mode: 'out'
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: false },
          onclick: { enable: false },
          resize: true
        }
      },
      retina_detect: true
    });
  }

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

  if (generateBtn && passwordDisplay) {
    generateBtn.addEventListener('click', generatePassword);
    generatePassword();
  }

  if (copyBtn && passwordDisplay) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(passwordDisplay.textContent).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Скопировано!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
      }).catch(err => console.warn('Не удалось скопировать:', err));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
});