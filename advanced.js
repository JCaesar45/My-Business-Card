// ===== MATRIX RAIN EFFECT =====
class MatrixRain {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.matrixBg = document.getElementById('matrixBg');
    this.setupCanvas();
    this.init();
  }

  setupCanvas() {
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.zIndex = '-1';
    document.body.appendChild(this.canvas);
  }

  init() {
    this.resize();
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    this.chars = this.chars.split('');
    this.fontSize = 14;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = [];

    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.random() * this.canvas.height / this.fontSize;
    }

    this.draw();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
  }

  draw() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = '#00ff41';
    this.ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      const text = this.chars[Math.floor(Math.random() * this.chars.length)];
      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

      if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
  }

  start() {
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  animate() {
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// ===== PARTICLE SYSTEM =====
class ParticleSystem {
  constructor() {
    this.container = document.getElementById('particles');
    this.particles = [];
    this.init();
  }

  init() {
    this.createParticles();
    this.animate();
  }

  createParticles() {
    for (let i = 0; i < 50; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.animationDuration = `${15 + Math.random() * 10}s`;
    
    this.container.appendChild(particle);
    this.particles.push(particle);
  }

  animate() {
    // Particles animate via CSS
  }
}

// ===== CARD FLIP LOGIC =====
class CardFlip {
  constructor(exportCallback) {
    this.card = document.getElementById('card');
    this.flipBtn = document.getElementById('flipBtn');
    this.flipBtnBack = document.getElementById('flipBtnBack');
    this.isFlipped = false;
    this.exportCallback = exportCallback; // Save callback
    this.init();
  }

  init() {
    this.flipBtn.addEventListener('click', () => this.flip());
    this.flipBtnBack.addEventListener('click', () => this.flip());
    
    // Call export callback when flipping to back side
    this.flipBtn.addEventListener('click', () => {
      if (!this.isFlipped && this.exportCallback) {
        this.exportCallback();
      }
    });
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.flip();
      }
    });
  }

  flip() {
    this.isFlipped = !this.isFlipped;
    this.card.classList.toggle('flipped', this.isFlipped);
    // Optional haptic feedback effect
    this.card.style.transform += ' scale(0.95)';
    setTimeout(() => {
      this.card.style.transform = this.card.style.transform.replace(' scale(0.95)', '');
    }, 150);
  }
}

// ===== VCARD EXPORT =====
class VCardExporter {
  constructor() {
    this.vcardBtn = document.getElementById('vcardBtn');
    this.init();
  }

  init() {
    this.vcardBtn.addEventListener('click', () => this.exportVCard());
  }

  exportVCard() {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Jordan Leturgez
TITLE:Frontend Developer/Content Creator/Copywriter
ORG:Jordan Leturgez
EMAIL:jordanleturgez@gmail.com
TEL:(260) 225-3559
URL:https://grabify.link/MBS9DP
NOTE:Full Stack Developer | Content Creator | Tech Strategist
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Jordan_Leturgez.vcf';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    // Visual feedback
    this.vcardBtn.style.background = '#00ff41';
    this.vcardBtn.innerHTML = '<span class="btn-icon">✓</span><span class="btn-text">Exported!</span>';
    
    setTimeout(() => {
      this.vcardBtn.style.background = '';
      this.vcardBtn.innerHTML = '<span class="btn-icon">💾</span><span class="btn-text">Export vCard</span>';
    }, 2000);
  }
}

// ===== NETWORK LINK ANIMATIONS =====
class NetworkLinks {
  constructor() {
    this.links = document.querySelectorAll('.network-item');
    this.init();
  }

  init() {
    this.links.forEach((link, index) => {
      link.style.opacity = '0';
      link.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        link.style.transition = 'all 0.5s ease';
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)';
      }, index * 100);
      
      link.addEventListener('mouseenter', () => this.onHover(link));
      link.addEventListener('mouseleave', () => this.onLeave(link));
    });
  }

  onHover(link) {
    link.style.transform = 'translateY(-5px) scale(1.02)';
    link.style.boxShadow = '0 10px 30px rgba(0, 255, 65, 0.4)';
  }

  onLeave(link) {
    link.style.transform = 'translateY(0) scale(1)';
    link.style.boxShadow = '0 5px 15px rgba(0, 255, 65, 0.3)';
  }
}

// ===== GLITCH TEXT EFFECT =====
class GlitchText {
  constructor() {
    this.name = document.querySelector('.name');
    this.init();
  }

  init() {
    setInterval(() => {
      this.glitch();
    }, 3000);
  }

  glitch() {
    const originalText = this.name.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    
    let iterations = 0;
    const maxIterations = 10;
    
    const interval = setInterval(() => {
      this.name.textContent = this.name.textContent
        .split('')
        .map((char, index) => {
          if (index < iterations) return originalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      if (iterations >= originalText.length) {
        clearInterval(interval);
        this.name.textContent = originalText;
      }
      
      iterations += 1;
    }, 50);
  }
}

// ===== MAIN APPLICATION =====
class DigitalBusinessCard {
  constructor() {
    this.matrixRain = null;
    this.particleSystem = null;
    this.cardFlip = null;
    this.vcardExporter = null;
    this.networkLinks = null;
    this.glitchText = null;
    
    this.init();
  }

  init() {
    // Initialize all components
    this.matrixRain = new MatrixRain();
    this.particleSystem = new ParticleSystem();
    this.vcardExporter = new VCardExporter();
    // Pass the exportVCard method as a callback to flip
    this.cardFlip = new CardFlip(() => this.vcardExporter.exportVCard());
    this.networkLinks = new NetworkLinks();
    this.glitchText = new GlitchText();
    
    // Start animations
    this.matrixRain.start();
    
    // Add loading completion
    this.onLoadComplete();
  }

  onLoadComplete() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  new DigitalBusinessCard();
});

// ===== EASTER EGGS =====
document.addEventListener('keydown', (e) => {
  // Konami code
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    let sequence = [];
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    sequence.push(e.key);
    if (sequence.length > konami.length) sequence.shift();
    
    if (sequence.join('') === konami.join('')) {
      document.body.style.animation = 'rainbow 2s infinite';
    }
  }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);
