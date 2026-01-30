// Проверка мобильных устройств
const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

window.addEventListener('DOMContentLoaded', () => {
  if (typeof particlesJS !== 'function') return;

  // белые частицы + яркие линии
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
        opacity: 0.25,
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

  // Запускаем след курсора только на десктопе
  if (!isMobile) {
    initCursorTrail();
  }
});

function initCursorTrail() {
  const canvas = document.getElementById('cursor-trail');
  const ctx = canvas.getContext('2d');
  let points = [];

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);
  };

  window.addEventListener('resize', resize);
  resize();

  document.addEventListener('mousemove', (e) => {
    points.push({
      x: e.clientX,
      y: e.clientY,
      life: 1.0
    });
  });

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Обновляем жизнь точек
    for (let i = points.length - 1; i >= 0; i--) {
      points[i].life -= 0.02;
      if (points[i].life <= 0) {
        points.splice(i, 1);
        continue;
      }
    }

    // Рисуем след как цепочку полупрозрачных линий
    if (points.length > 1) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }

      const gradient = ctx.createLinearGradient(
        points[0].x, points[0].y,
        points[points.length - 1].x, points[points.length - 1].y
      );
      gradient.addColorStop(0, 'rgba(0, 240, 180, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 240, 180, 0)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    requestAnimationFrame(animate);
  };

  animate();
}