/**
 * Energy Flow Field - Algorithmic Art for AI-Native Energy Engineer Portfolio
 * Philosophy: Invisible forces made visible through particle traces
 * Conceptual seed: Energy transfer in fluid dynamics meets neural network signal propagation
 */

(function() {
  const canvas = document.getElementById('energy-flow-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let flowField = [];
  let cols, rows;
  let scl = 15;
  let zOff = 0;
  let animationId;
  let isVisible = true;

  // Energy color palette - warm oranges and cool cyans
  const palette = [
    { r: 249, g: 115, b: 22 },   // energy orange #F97316
    { r: 6, g: 182, b: 212 },    // tech cyan #06B6D4
    { r: 245, g: 158, b: 11 },   // warm amber #F59E0B
    { r: 139, g: 92, b: 246 },   // purple #8B5CF6
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
    const count = Math.min(800, Math.floor((width * height) / 2000));
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
      this.speed = Math.random() * 0.8 + 0.3;
      this.maxSpeed = this.speed * 2;
      this.color = palette[Math.floor(Math.random() * palette.length)];
      this.alpha = Math.random() * 0.4 + 0.1;
      this.life = Math.random() * 200 + 100;
      this.age = 0;
      this.size = Math.random() * 1.5 + 0.5;
    }

    follow(vectors) {
      const x = Math.floor(this.x / scl);
      const y = Math.floor(this.y / scl);
      const index = x + y * cols;
      if (vectors[index]) {
        const force = vectors[index];
        this.vx += force.x * 0.1;
        this.vy += force.y * 0.1;
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
        // Multi-octave noise simulation using sine combinations
        const angle = (
          Math.sin(xoff) * Math.cos(yoff) * Math.PI * 2 +
          Math.sin(xoff * 2.1 + zOff) * 0.5 +
          Math.cos(yoff * 1.7 + zOff * 0.8) * 0.3
        );
        const v = {
          x: Math.cos(angle),
          y: Math.sin(angle)
        };
        flowField[index] = v;
        xoff += 0.08;
      }
      yoff += 0.08;
    }
    zOff += 0.003;
  }

  function draw() {
    if (!isVisible) return;

    // Trail effect - fade previous frame
    ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
    ctx.fillRect(0, 0, width, height);

    generateFlowField();

    for (let i = 0; i < particles.length; i++) {
      particles[i].follow(flowField);
      particles[i].update();
      particles[i].draw(ctx);
    }

    animationId = requestAnimationFrame(draw);
  }

  // Visibility observer for performance
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

  // Initialize
  resize();
  draw();

  // Handle resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 250);
  });

  // Expose for potential external control
  window.energyFlowCanvas = {
    resize,
    reset: initParticles,
    setPalette: (newPalette) => {
      palette.length = 0;
      palette.push(...newPalette);
      initParticles();
    }
  };
})();
