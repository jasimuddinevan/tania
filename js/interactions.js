// ===== INTERACTIVE ELEMENTS FOR TANIA'S LOVE PAGE =====

class LoveInteractions {
    constructor() {
        this.loveCounter = 0;
        this.currentQuote = 0;
        this.quotes = [];
        this.isPlaying = false;
        this.init();
    }

    init() {
        this.loadLoveCounter();
        this.initHeartButton();
        this.initQuotesCarousel();
        this.initMusicPlayer();
        this.initMessageCards();
        this.initPhotoInteraction();
        this.initKeyboardShortcuts();
        this.addPersonalTouches();
    }

    // Load love counter from localStorage
    loadLoveCounter() {
        this.loveCounter = localStorage.getItem('taniaLoveCounter') || 0;
        const counterElement = document.getElementById('loveCounter');
        if (counterElement) {
            counterElement.textContent = this.loveCounter;
        }
    }

    // Save love counter to localStorage
    saveLoveCounter() {
        localStorage.setItem('taniaLoveCounter', this.loveCounter);
    }

    // Initialize heart button interactions
    initHeartButton() {
        const heartButton = document.getElementById('heartButton');
        if (heartButton) {
            heartButton.addEventListener('click', (e) => {
                this.sendLove(e);
            });

            // Add pulsing effect on hover
            heartButton.addEventListener('mouseenter', () => {
                heartButton.style.animation = 'pulse 0.5s ease-in-out infinite';
            });

            heartButton.addEventListener('mouseleave', () => {
                heartButton.style.animation = '';
            });
        }
    }

    // Send love function with visual effects
    sendLove(event) {
        this.loveCounter++;
        const counterElement = document.getElementById('loveCounter');
        if (counterElement) {
            counterElement.textContent = this.loveCounter;
            
            // Animate counter
            counterElement.style.transform = 'scale(1.5)';
            counterElement.style.color = '#ff69b4';
            setTimeout(() => {
                counterElement.style.transform = 'scale(1)';
                counterElement.style.color = '';
            }, 300);
        }

        // Create love explosion at click position
        const rect = event.target.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        this.createLoveExplosion(x, y);
        
        // Add particles if available
        if (window.loveParticleSystem) {
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    window.loveParticleSystem.addParticle(x, y, 'heart');
                }, i * 50);
            }
        }

        // Play heart sound effect (silent - just visual feedback)
        this.playLoveSound();
        
        // Save counter
        this.saveLoveCounter();
        
        // Special milestones
        this.checkLoveMilestones();
    }

    // Create love explosion effect
    createLoveExplosion(x, y) {
        const hearts = ['💖', '💕', '💗', '💓', '💝', '💘', '💋', '🌹'];
        
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.color = `hsl(${Math.random() * 60 + 300}, 80%, 60%)`;
            
            const angle = (Math.random() * 360) * Math.PI / 180;
            const distance = Math.random() * 100 + 50;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance - Math.random() * 100;
            
            heart.animate([
                { 
                    transform: 'translate(0, 0) scale(1) rotate(0deg)',
                    opacity: 1 
                },
                { 
                    transform: `translate(${endX - x}px, ${endY - y}px) scale(0.3) rotate(360deg)`,
                    opacity: 0 
                }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'ease-out'
            });
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 1500);
        }
    }

    // Check for love milestones
    checkLoveMilestones() {
        const milestones = {
            10: "10 loves! You're amazing! 💕",
            25: "25 loves! My heart is so full! 💖",
            50: "50 loves! You make me so happy! 🌹",
            100: "100 loves! You're incredible, Tania! ✨",
            250: "250 loves! Forever grateful for you! 💝",
            500: "500 loves! You're my everything! 👑"
        };

        if (milestones[this.loveCounter]) {
            this.showMilestoneMessage(milestones[this.loveCounter]);
        }
    }

    // Show milestone message
    showMilestoneMessage(message) {
        const milestone = document.createElement('div');
        milestone.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff69b4, #ff1493);
            color: white;
            padding: 20px 30px;
            border-radius: 15px;
            font-size: 1.2rem;
            font-weight: bold;
            z-index: 2000;
            text-align: center;
            box-shadow: 0 10px 30px rgba(255, 20, 147, 0.3);
            animation: milestoneAppear 3s ease-out forwards;
        `;
        milestone.textContent = message;
        
        // Add CSS for milestone animation
        if (!document.getElementById('milestone-style')) {
            const style = document.createElement('style');
            style.id = 'milestone-style';
            style.textContent = `
                @keyframes milestoneAppear {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                    15% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                    25% { transform: translate(-50%, -50%) scale(1); }
                    85% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(milestone);
        
        setTimeout(() => {
            if (milestone.parentNode) {
                milestone.parentNode.removeChild(milestone);
            }
        }, 3000);
    }

    // Initialize quotes carousel
    initQuotesCarousel() {
        this.quotes = document.querySelectorAll('.quote');
        const nextBtn = document.getElementById('nextQuote');
        const prevBtn = document.getElementById('prevQuote');
        const dots = document.querySelectorAll('.dot');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuote());
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevQuote());
        }

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToQuote(index));
        });

        // Auto-advance quotes
        setInterval(() => {
            this.nextQuote();
        }, 5000);
    }

    nextQuote() {
        this.currentQuote = (this.currentQuote + 1) % this.quotes.length;
        this.updateQuoteDisplay();
    }

    prevQuote() {
        this.currentQuote = (this.currentQuote - 1 + this.quotes.length) % this.quotes.length;
        this.updateQuoteDisplay();
    }

    goToQuote(index) {
        this.currentQuote = index;
        this.updateQuoteDisplay();
    }

    updateQuoteDisplay() {
        // Update quotes
        this.quotes.forEach((quote, index) => {
            quote.classList.toggle('active', index === this.currentQuote);
        });

        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentQuote);
        });
    }

    // Initialize music player
    initMusicPlayer() {
        const playBtn = document.getElementById('playBtn');
        const playIcon = document.getElementById('playIcon');
        const bars = document.querySelectorAll('.bar');

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                this.toggleMusic(playIcon, bars);
            });
        }
    }

    toggleMusic(playIcon, bars) {
        this.isPlaying = !this.isPlaying;
        
        if (this.isPlaying) {
            playIcon.className = 'fas fa-pause';
            bars.forEach(bar => {
                bar.style.animationPlayState = 'running';
            });
        } else {
            playIcon.className = 'fas fa-play';
            bars.forEach(bar => {
                bar.style.animationPlayState = 'paused';
            });
        }
    }

    // Initialize message cards interactions
    initMessageCards() {
        const messageCards = document.querySelectorAll('.message-card');
        
        messageCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                this.showMessageDetail(card, index);
            });
        });
    }

    showMessageDetail(card, index) {
        const messages = [
            "Every morning I wake up grateful to have you in my life. Your smile lights up my entire world and makes every challenge worth facing.",
            "Your beauty isn't just in your appearance, it radiates from your kind heart, your gentle soul, and the way you care for everyone around you.",
            "You guide me through life's journey with your wisdom and love. With you by my side, I feel like I can achieve anything.",
            "My love for you is infinite and eternal. Each day brings new reasons to fall in love with you all over again."
        ];

        // Create modal-like overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1500;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
        `;

        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 20px;
            max-width: 500px;
            margin: 20px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: modalAppear 0.3s ease-out;
        `;

        modal.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 20px;">${card.querySelector('.message-icon').textContent}</div>
            <h3 style="font-family: 'Playfair Display', serif; color: #c71585; margin-bottom: 20px; font-size: 1.8rem;">${card.querySelector('h3').textContent}</h3>
            <p style="line-height: 1.6; color: #5d4e37; font-size: 1.1rem; margin-bottom: 30px;">${messages[index]}</p>
            <button id="closeModal" style="background: linear-gradient(135deg, #ffc0cb, #c71585); border: none; padding: 12px 24px; border-radius: 25px; color: white; font-weight: bold; cursor: pointer;">Close</button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Add CSS for modal animation
        if (!document.getElementById('modal-style')) {
            const style = document.createElement('style');
            style.id = 'modal-style';
            style.textContent = `
                @keyframes modalAppear {
                    from { opacity: 0; transform: scale(0.8) translateY(-20px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }

        // Close modal functionality
        const closeModal = () => {
            document.body.removeChild(overlay);
        };

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });

        modal.querySelector('#closeModal').addEventListener('click', closeModal);
    }

    // Initialize photo interactions
    initPhotoInteraction() {
        const mainPhoto = document.getElementById('mainPhoto');
        if (mainPhoto) {
            let clickCount = 0;
            
            mainPhoto.addEventListener('click', () => {
                clickCount++;
                this.photoClickEffect(mainPhoto, clickCount);
            });
        }
    }

    photoClickEffect(photo, clickCount) {
        const compliments = [
            "Beautiful! ✨",
            "Gorgeous! 💖",
            "Stunning! 🌟",
            "Perfect! 💕",
            "Amazing! 🌹",
            "Breathtaking! 💫"
        ];

        const compliment = document.createElement('div');
        compliment.textContent = compliments[(clickCount - 1) % compliments.length];
        compliment.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.5rem;
            font-weight: bold;
            color: #ff69b4;
            pointer-events: none;
            z-index: 100;
            animation: complimentFloat 2s ease-out forwards;
        `;

        // Add CSS for compliment animation
        if (!document.getElementById('compliment-style')) {
            const style = document.createElement('style');
            style.id = 'compliment-style';
            style.textContent = `
                @keyframes complimentFloat {
                    0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -80px) scale(1.2); }
                }
            `;
            document.head.appendChild(style);
        }

        photo.parentElement.style.position = 'relative';
        photo.parentElement.appendChild(compliment);

        setTimeout(() => {
            if (compliment.parentNode) {
                compliment.parentNode.removeChild(compliment);
            }
        }, 2000);
    }

    // Initialize keyboard shortcuts
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    document.getElementById('heartButton')?.click();
                    break;
                case 'ArrowRight':
                    this.nextQuote();
                    break;
                case 'ArrowLeft':
                    this.prevQuote();
                    break;
                case 'KeyM':
                    document.getElementById('playBtn')?.click();
                    break;
            }
        });
    }

    // Add personal touches and Easter eggs
    addPersonalTouches() {
        // Special time-based messages
        const now = new Date();
        const hour = now.getHours();
        
        let timeMessage = "";
        if (hour >= 5 && hour < 12) {
            timeMessage = "Good morning, beautiful! 🌅";
        } else if (hour >= 12 && hour < 17) {
            timeMessage = "Good afternoon, my love! ☀️";
        } else if (hour >= 17 && hour < 21) {
            timeMessage = "Good evening, gorgeous! 🌆";
        } else {
            timeMessage = "Good night, my angel! 🌙";
        }

        // Add time-based greeting
        setTimeout(() => {
            this.showTimeGreeting(timeMessage);
        }, 2000);

        // Add secret message on Konami code
        this.initKonamiCode();
    }

    showTimeGreeting(message) {
        const greeting = document.createElement('div');
        greeting.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, rgba(255, 192, 203, 0.9), rgba(255, 204, 203, 0.9));
            color: #2c1810;
            padding: 15px 20px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 1000;
            animation: greetingSlide 4s ease-out forwards;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        `;
        greeting.textContent = message;

        // Add CSS for greeting animation
        if (!document.getElementById('greeting-style')) {
            const style = document.createElement('style');
            style.id = 'greeting-style';
            style.textContent = `
                @keyframes greetingSlide {
                    0% { transform: translateX(300px); opacity: 0; }
                    15% { transform: translateX(0); opacity: 1; }
                    85% { transform: translateX(0); opacity: 1; }
                    100% { transform: translateX(300px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(greeting);

        setTimeout(() => {
            if (greeting.parentNode) {
                greeting.parentNode.removeChild(greeting);
            }
        }, 4000);
    }

    // Konami code Easter egg
    initKonamiCode() {
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        let konamiIndex = 0;

        document.addEventListener('keydown', (e) => {
            if (e.code === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    this.activateSecretMode();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }

    activateSecretMode() {
        // Create massive heart rain
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                if (window.loveParticleSystem) {
                    window.loveParticleSystem.addParticle(
                        Math.random() * window.innerWidth,
                        -50,
                        'heart'
                    );
                }
            }, i * 50);
        }

        // Show secret message
        this.showMilestoneMessage("💖 SECRET MODE ACTIVATED! 💖\nYou found the hidden surprise!");
    }

    // Play love sound (visual feedback only)
    playLoveSound() {
        // Create visual sound wave effect
        const soundWave = document.createElement('div');
        soundWave.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            border: 2px solid #ff69b4;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 999;
            animation: soundWaveExpand 0.8s ease-out;
        `;

        // Add CSS for sound wave animation
        if (!document.getElementById('sound-style')) {
            const style = document.createElement('style');
            style.id = 'sound-style';
            style.textContent = `
                @keyframes soundWaveExpand {
                    0% { 
                        width: 10px; 
                        height: 10px; 
                        opacity: 1; 
                        border-width: 2px;
                    }
                    100% { 
                        width: 100px; 
                        height: 100px; 
                        opacity: 0; 
                        border-width: 1px;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(soundWave);

        setTimeout(() => {
            if (soundWave.parentNode) {
                soundWave.parentNode.removeChild(soundWave);
            }
        }, 800);
    }
}

// Initialize interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const loveInteractions = new LoveInteractions();
    
    // Make globally accessible
    window.loveInteractions = loveInteractions;
});

// Export for use in other scripts
window.LoveInteractions = LoveInteractions;