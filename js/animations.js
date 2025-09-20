// ===== ROMANTIC ANIMATIONS FOR TANIA'S LOVE PAGE =====

class LoveAnimations {
    constructor() {
        this.heartsContainer = document.getElementById('heartsContainer');
        this.petalsContainer = document.getElementById('petalsContainer');
        this.init();
    }

    init() {
        this.startFloatingHearts();
        this.startFloatingPetals();
        this.initScrollAnimations();
        this.initHoverEffects();
    }

    // Floating Hearts Animation
    startFloatingHearts() {
        const heartSymbols = ['💖', '💕', '💗', '💓', '💝', '💘', '💋', '🌹'];
        
        const createHeart = () => {
            if (this.heartsContainer) {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
                heart.style.left = Math.random() * window.innerWidth + 'px';
                heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
                heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
                heart.style.animationDelay = Math.random() * 2 + 's';
                
                this.heartsContainer.appendChild(heart);
                
                // Remove heart after animation
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 8000);
            }
        };

        // Create hearts at intervals
        setInterval(createHeart, 800);
        
        // Create initial hearts
        for (let i = 0; i < 5; i++) {
            setTimeout(createHeart, i * 200);
        }
    }

    // Floating Petals Animation
    startFloatingPetals() {
        const petalColors = ['#ffb3ba', '#ffcccb', '#ffc0cb', '#dda0dd', '#f0e68c'];
        
        const createPetal = () => {
            if (this.petalsContainer) {
                const petal = document.createElement('div');
                petal.className = 'floating-petal';
                petal.style.left = Math.random() * window.innerWidth + 'px';
                petal.style.backgroundColor = petalColors[Math.floor(Math.random() * petalColors.length)];
                petal.style.animationDuration = (Math.random() * 5 + 8) + 's';
                petal.style.animationDelay = Math.random() * 3 + 's';
                
                // Add slight wind effect
                const windOffset = (Math.random() - 0.5) * 100;
                petal.style.setProperty('--wind-offset', windOffset + 'px');
                
                this.petalsContainer.appendChild(petal);
                
                // Remove petal after animation
                setTimeout(() => {
                    if (petal.parentNode) {
                        petal.parentNode.removeChild(petal);
                    }
                }, 10000);
            }
        };

        // Create petals at intervals
        setInterval(createPetal, 1200);
        
        // Create initial petals
        for (let i = 0; i < 3; i++) {
            setTimeout(createPetal, i * 400);
        }
    }

    // Scroll-based animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll(
            '.message-card, .photo-container, .quotes-carousel, .music-player'
        );
        
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    }

    // Hover effects and micro-interactions
    initHoverEffects() {
        // Photo hover effect
        const mainPhoto = document.getElementById('mainPhoto');
        if (mainPhoto) {
            mainPhoto.addEventListener('mouseenter', () => {
                this.createSparkleEffect(mainPhoto);
            });
        }

        // Message cards hover effects
        const messageCards = document.querySelectorAll('.message-card');
        messageCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateMessageCard(card);
            });
        });

        // Letter animations on hover
        const letterAnimations = document.querySelectorAll('.letter-animation');
        letterAnimations.forEach((letter, index) => {
            letter.addEventListener('mouseenter', () => {
                letter.style.animationDelay = '0s';
                letter.style.animationDuration = '0.6s';
            });
        });
    }

    // Create sparkle effect
    createSparkleEffect(element) {
        const rect = element.getBoundingClientRect();
        const sparkles = ['✨', '💫', '⭐', '🌟'];
        
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
                sparkle.style.position = 'fixed';
                sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
                sparkle.style.fontSize = '20px';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '1000';
                sparkle.style.animation = 'sparkleAnimation 1.5s ease-out forwards';
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 1500);
            }, i * 100);
        }
    }

    // Animate message card
    animateMessageCard(card) {
        const icon = card.querySelector('.message-icon');
        if (icon) {
            icon.style.animation = 'none';
            setTimeout(() => {
                icon.style.animation = 'iconFloat 0.8s ease-in-out';
            }, 10);
        }
    }

    // Create love explosion effect
    createLoveExplosion(x, y) {
        const explosion = document.createElement('div');
        explosion.className = 'love-explosion';
        explosion.style.left = x + 'px';
        explosion.style.top = y + 'px';
        
        const hearts = ['💖', '💕', '💗', '💓', '💝'];
        
        for (let i = 0; i < 12; i++) {
            const heart = document.createElement('div');
            heart.className = 'explosion-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            
            const angle = (i * 30) * Math.PI / 180;
            const distance = 50 + Math.random() * 50;
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;
            
            heart.style.left = offsetX + 'px';
            heart.style.top = offsetY + 'px';
            heart.style.animationDelay = (i * 0.1) + 's';
            
            explosion.appendChild(heart);
        }
        
        document.body.appendChild(explosion);
        
        setTimeout(() => {
            if (explosion.parentNode) {
                explosion.parentNode.removeChild(explosion);
            }
        }, 1000);
    }
}

// Particle system for enhanced effects
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.init();
    }

    init() {
        // Create canvas for particle effects
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
        
        this.animate();
    }

    addParticle(x, y, type = 'heart') {
        const particle = {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: -Math.random() * 3 - 1,
            size: Math.random() * 10 + 5,
            life: 1.0,
            decay: Math.random() * 0.02 + 0.01,
            type: type,
            color: `hsl(${Math.random() * 60 + 300}, 70%, 70%)`
        };
        
        this.particles.push(particle);
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // gravity
            particle.life -= particle.decay;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            
            if (particle.type === 'heart') {
                this.ctx.font = `${particle.size}px Arial`;
                this.ctx.fillStyle = particle.color;
                this.ctx.fillText('💖', particle.x, particle.y);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fillStyle = particle.color;
                this.ctx.fill();
            }
            
            this.ctx.restore();
        });
    }

    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const loveAnimations = new LoveAnimations();
    const particleSystem = new ParticleSystem();
    
    // Make particle system globally accessible
    window.loveParticleSystem = particleSystem;
    
    // Add some initial particles
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            particleSystem.addParticle(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight,
                'heart'
            );
        }
    }, 1000);
});

// Export for use in other scripts
window.LoveAnimations = LoveAnimations;