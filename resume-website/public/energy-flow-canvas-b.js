/**
 * Energy Flow Field - Magazine Edition
 * Philosophy: Organic turbulence in warm cream tones
 * Conceptual seed: Energy transfer in fluid dynamics
 */

(function() {
  const canvas = document.getElementById('energy-flow-canvas-b');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let flowField = [];
  let cols, rows;
  let scl = 18;
  let zOff = 0;
  let animationId;
  let isVisible = true;

  // Magazine color palette - terracotta, sage, warm tones
  const palette = [
    { r: 196, g: 108, b: 84 },   // terracotta #C46C54
    { r: 139, g: 157, b: 120 },  // sage #8B9D78
    { r: 176, g: 148, b: 110 },  // warm sand #B0946E
    { r: 107, g: 122, b: 140 },  // slate #6B7A8C
  ];

  function resize() {
    const parent = canvas.parentElement;
    width = parent.offsetWidth;
    height = parent.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    cols = Math.floor(width / scl);
    rows = Math.floor(height / scl);
    initFlowField();
    initParticles();
  }

  function initFlowField() {
    flowField = new Array(cols * rows);
  }

  function initParticles() {
    particles = [];
    const count = Math.min(600, Math.floor((width * height) / 2500));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = 0;
      this.vy = 0;
      this.speed = Math.random() * 0.6 + 0.2;
      this.maxSpeed = this.speed * 2;
      this.color = palette[Math.floor(Math.random() * palette.length)];
      this.alpha = Math.random() * 0.25 + 0.05;
      this.life = Math.random() * 250 + 150;
      this.age = 0;
      this.size = Math.random() * 1.2 + 0.3;
    }

    follow(vectors) {
      const x = Math.floor(this.x / scl);
      const y = Math.floor(this.y / scl);
      const index = x + y * cols;
      if (vectors[index]) {
        const force = vectors[index];
        this.vx += force.x * 0.08;
        this.vy += force.y * 0.08;
      }
    }

    update() {
      this.vx = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.vx));
      this.vy = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.vy));
      this.x += this.vx;
      this.y += this.vy;
      this.age++;

      if (this.age > this.life || this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset();
      }
    }

    draw(context) {
      const lifeRatio = 1 - (this.age / this.life);
      const a = this.alpha * lifeRatio;
      context.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${a})`;
      context.beginPath();
      context.arc(this.x, this.y, this.size * lifeRatio, 0, Math.PI * 2);
      context.fill();
    }
  }

  function generateFlowField() {
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        const index = x + y * cols;
        const angle = (
          Math.sin(xoff * 1.3) * Math.cos(yoff * 0.9) * Math.PI * 2 +
          Math.sin(xoff * 2.3 + zOff * 0.7) * 0.4 +
          Math.cos(yoff * 1.9 + zOff * 0.5) * 0.25
        );
        const v = {
          x: Math.cos(angle),
          y: Math.sin(angle)
        };
        flowField[index] = v;
        xoff += 0.06;
      }
      yoff += 0.06;
    }
    zOff += 0.002;
  }

  function draw() {
    if (!isVisible) return;

    // Trail effect - fade previous frame with cream background
    ctx.fillStyle = 'rgba(250, 248, 245, 0.06)';
    ctx.fillRect(0, 0, width, height);

    generateFlowField();

    for (let i = 0; i < particles.length; i++) {
      particles[i].follow(flowField);
      particles[i].update();
      particles[i].draw(ctx);
    }

    animationId = requestAnimationFrame(draw);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationId) {
        draw();
      } else if (!isVisible && animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    });
  }, { threshold: 0.1 });

  observer.observe(canvas);

  resize();
  draw();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 250);
  });

  window.energyFlowCanvasB = {
    resize,
    reset: initParticles,
  };
})();
