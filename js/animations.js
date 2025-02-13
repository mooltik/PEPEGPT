// Matrix rain effect
function createMatrixRain() {
    const rain = document.createElement('div');
    rain.className = 'matrix-rain';
    document.body.appendChild(rain);

    const characters = '01アイウエオカキクケコサシスセソ';
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    const maxDrops = Math.min(columns, 100); // Ограничиваем количество капель

    for (let i = 0; i < maxDrops; i++) {
        const drop = document.createElement('span');
        drop.innerHTML = characters.charAt(Math.floor(Math.random() * characters.length));
        drop.style.left = (Math.random() * window.innerWidth) + 'px';
        drop.style.animationDuration = Math.random() * 2 + 1 + 's';
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.style.opacity = Math.random() * 0.3 + 0.1; // Уменьшаем прозрачность
        rain.appendChild(drop);

        // Обновляем символы реже
        setInterval(() => {
            drop.innerHTML = characters.charAt(Math.floor(Math.random() * characters.length));
        }, Math.random() * 2000 + 1000);
    }
}

// Оптимизируем создание частиц
function createParticles() {
    if (document.querySelector('.particles')) return;
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    const maxParticles = Math.min(window.innerWidth / 20, 30); // Ограничиваем количество частиц

    for (let i = 0; i < maxParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Оптимизируем обработку ресайза
let resizeTimeout;
window.addEventListener('resize', () => {
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => {
        const oldRain = document.querySelector('.matrix-rain');
        const oldParticles = document.querySelector('.particles');
        if (oldRain) oldRain.remove();
        if (oldParticles) oldParticles.remove();
        createMatrixRain();
        createParticles();
    }, 250);
});

// Add timer functionality
function updateTimer() {
    const hoursElement = document.querySelector('.hours');
    const minutesElement = document.querySelector('.minutes');
    const secondsElement = document.querySelector('.seconds');
    const contractText = document.querySelector('.contract-text');

    // Устанавливаем фиксированное время старта (например, 27 февраля 2024, 20:00:00 UTC)
    const START_TIME = new Date('2024-03-01T20:00:00Z').getTime(); // 1 марта 2024, 20:00 UTC
    const DURATION = 74 * 60 * 60 * 1000; // 74 часа в миллисекундах
    const END_TIME = START_TIME + DURATION;

    function updateDisplay() {
        const currentTime = Date.now();
        const timeLeft = END_TIME - currentTime;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            contractText.textContent = '11111111111111111111';
            contractText.style.color = 'var(--neon-green)';
            contractText.style.fontSize = '1.2rem';
            contractText.style.fontWeight = 'bold';
            revealContract();
            return;
        }

        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }

    // Обновляем каждую секунду
    updateDisplay();
    const timerInterval = setInterval(updateDisplay, 1000);

    // Возвращаем функцию очистки
    return () => {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
    };
}

// Добавить анимацию для карточек roadmap
function initRoadmapCards() {
    const cards = document.querySelectorAll('.roadmap-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });
}

// Запускаем все анимации в правильном порядке
document.addEventListener('DOMContentLoaded', () => {
    // Скрываем прелоадер
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('hidden');
    }, 1000);
    
    createMatrixRain();
    const stopTimer = updateTimer();
    initRoadmapCards();
    
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        typeWriterEffect(subtitle, subtitle.textContent);
    }
    
    createParticles();

    // Очистка при закрытии страницы
    window.addEventListener('unload', () => {
        if (stopTimer) stopTimer();
    });
});

function typeWriterEffect(element, text, speed = 50) {
    if (!element || !text) return;
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

function revealContract() {
    const contractText = document.querySelector('.contract-text');
    if (!contractText) return;
    const finalText = '11111111111111111111';
    let currentText = '';
    const chars = '01';
    
    function scramble() {
        currentText = '';
        for (let i = 0; i < finalText.length; i++) {
            currentText += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        contractText.textContent = currentText;
    }

    let count = 0;
    const interval = setInterval(() => {
        scramble();
        count++;
        if (count > 20) {
            clearInterval(interval);
            contractText.textContent = finalText;
            contractText.classList.add('contract-reveal');
        }
    }, 50);
} 