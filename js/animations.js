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
function initializeTimer() {
    const hoursElement = document.querySelector('.hours');
    const minutesElement = document.querySelector('.minutes');
    const secondsElement = document.querySelector('.seconds');
    const contractText = document.querySelector('.contract-text');

    // Устанавливаем время начала на текущий момент
    const now = luxon.DateTime.utc();
    const targetDate = now;
    const endDate = targetDate.plus({ hours: 74 });
    let timeoutId = null;

    function updateDisplay() {
        const currentTime = luxon.DateTime.utc();
        
        // Вычисляем оставшееся время
        const diff = endDate.diff(currentTime, ['hours', 'minutes', 'seconds']);
        
        if (diff.as('seconds') <= 0) {
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            contractText.textContent = '11111111111111111111';
            contractText.style.color = 'var(--neon-green)';
            contractText.style.fontSize = '1.2rem';
            contractText.style.fontWeight = 'bold';
            return;
        }

        const hours = Math.floor(diff.as('hours'));
        const minutes = Math.floor(diff.minutes);
        const seconds = Math.floor(diff.seconds);

        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');

        // Рекурсивно вызываем функцию через 1000 мс
        timeoutId = setTimeout(updateDisplay, 1000);
    }

    // Запускаем обновление
    updateDisplay();

    // Возвращаем функцию очистки
    return () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    };
}

// Запускаем все анимации
createMatrixRain();
updatePrice();
const stopTimer = initializeTimer();

// Очистка при закрытии страницы
window.addEventListener('unload', () => {
    if (stopTimer) stopTimer();
}); 