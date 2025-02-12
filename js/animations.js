// Matrix rain effect
function createMatrixRain() {
    const rain = document.createElement('div');
    rain.className = 'matrix-rain';
    document.body.appendChild(rain);

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);

    for (let i = 0; i < columns; i++) {
        const drop = document.createElement('span');
        drop.innerHTML = characters.charAt(Math.floor(Math.random() * characters.length));
        drop.style.left = i * fontSize + 'px';
        drop.style.animationDuration = Math.random() * 2 + 1 + 's';
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.style.opacity = Math.random() * 0.5 + 0.1;
        rain.appendChild(drop);

        // Обновляем символы периодически
        setInterval(() => {
            drop.innerHTML = characters.charAt(Math.floor(Math.random() * characters.length));
        }, Math.random() * 1000 + 500);
    }
}

// Обновляем матрицу при изменении размера окна
window.addEventListener('resize', () => {
    const oldRain = document.querySelector('.matrix-rain');
    if (oldRain) {
        oldRain.remove();
    }
    createMatrixRain();
});

// Add timer functionality
function updateTimer() {
    const hoursElement = document.querySelector('.hours');
    const minutesElement = document.querySelector('.minutes');
    const secondsElement = document.querySelector('.seconds');
    const contractText = document.querySelector('.contract-text');

    // Устанавливаем время старта на сегодня, 20:00:00 UTC
    const now = new Date();
    const START_TIME = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0, 0, 0).getTime();
    const DURATION = 74 * 60 * 60 * 1000; // 74 часа в миллисекундах
    const END_TIME = START_TIME + DURATION;

    function updateDisplay() {
        const currentTime = Date.now();
        const timeLeft = END_TIME - currentTime;

        if (timeLeft <= 0) {
            clearInterval(timer);
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            contractText.textContent = '11111111111111111111';
            contractText.style.color = 'var(--neon-green)';
            contractText.style.fontSize = '1.2rem';
            contractText.style.fontWeight = 'bold';
            return;
        }

        const totalHours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        hoursElement.textContent = totalHours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }

    // Обновляем каждую секунду
    const timer = setInterval(updateDisplay, 1000);
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

// Запускаем все анимации
createMatrixRain();
updateTimer();
initRoadmapCards();

function typeWriterEffect(element, text, speed = 50) {
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

// Применяем к subtitle
const subtitle = document.querySelector('.subtitle');
typeWriterEffect(subtitle, subtitle.textContent);

function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

function revealContract() {
    const contractText = document.querySelector('.contract-text');
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