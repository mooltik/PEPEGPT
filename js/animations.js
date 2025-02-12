// Matrix rain effect
function createMatrixRain() {
    const rain = document.createElement('div');
    rain.className = 'matrix-rain';
    document.body.appendChild(rain);

    const characters = '01';
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);

    for (let i = 0; i < columns; i++) {
        const drop = document.createElement('span');
        drop.innerHTML = characters.charAt(Math.floor(Math.random() * characters.length));
        drop.style.left = i * fontSize + 'px';
        drop.style.animationDuration = Math.random() * 2 + 1 + 's';
        drop.style.animationDelay = Math.random() * 2 + 's';
        rain.appendChild(drop);
    }
}

createMatrixRain();

// Price ticker animation
function updatePrice() {
    const price = document.querySelector('.price');
    const change = document.querySelector('.change');
    
    setInterval(() => {
        const newPrice = (Math.random() * (0.5 - 0.3) + 0.3).toFixed(3);
        const newChange = (Math.random() * (100 - (-50)) + (-50)).toFixed(1);
        
        price.textContent = `$${newPrice}`;
        change.textContent = `${newChange}%`;
        change.style.color = newChange > 0 ? 'var(--neon-green)' : 'var(--neon-pink)';
    }, 3000);
}

updatePrice();

// Add timer functionality
function updateTimer() {
    const hoursElement = document.querySelector('.hours');
    const minutesElement = document.querySelector('.minutes');
    const secondsElement = document.querySelector('.seconds');
    const contractText = document.querySelector('.contract-text');

    // Фиксированное время старта и окончания для всех пользователей
    const START_TIME = 1708975200000; // 26 февраля 2024, 19:20:00 UTC
    const DURATION = 74 * 60 * 60 * 1000; // 74 часа в миллисекундах
    const END_TIME = START_TIME + DURATION;

    let timerInterval = null; // Объявляем переменную в начале функции

    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    function updateDisplay() {
        const now = Date.now();
        
        // Если время еще не началось, показываем 74:00:00
        if (now < START_TIME) {
            hoursElement.textContent = '74';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            return;
        }

        const timeLeft = Math.max(0, END_TIME - now);

        if (timeLeft === 0) {
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            contractText.textContent = '11111111111111111111';
            contractText.style.color = 'var(--neon-green)';
            contractText.style.fontSize = '1.2rem';
            contractText.style.fontWeight = 'bold';
            stopTimer();
            return;
        }

        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }

    // Обновляем время сразу
    updateDisplay();
    
    // Обновляем каждую секунду
    timerInterval = setInterval(updateDisplay, 1000);

    // Возвращаем функцию очистки
    return stopTimer;
}

// Запускаем все анимации
createMatrixRain();
updatePrice();
const stopTimer = updateTimer();

// Очистка при закрытии страницы
window.addEventListener('unload', () => {
    if (stopTimer) stopTimer();
}); 