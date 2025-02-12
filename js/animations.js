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

    let serverOffset = 0;
    let timerInterval = null;

    // Функция для получения точного времени с сервера и установки времени окончания
    function synchronizeTime() {
        fetch('https://worldtimeapi.org/api/timezone/Etc/UTC')
            .then(response => response.json())
            .then(data => {
                const serverTime = new Date(data.utc_datetime).getTime();
                const localTime = Date.now();
                serverOffset = serverTime - localTime;
                
                // Устанавливаем время окончания только при первой синхронизации
                if (!window.END_TIME) {
                    // 74 часа в миллисекундах от текущего серверного времени
                    window.END_TIME = serverTime + (74 * 60 * 60 * 1000);
                    console.log('Timer will end at:', new Date(window.END_TIME).toUTCString());
                }
                
                // Запускаем таймер после синхронизации
                updateDisplay();
                if (!timerInterval) {
                    timerInterval = setInterval(updateDisplay, 1000);
                }
            })
            .catch(error => {
                console.error("Time sync failed, using local time:", error);
                // Если API недоступно, используем локальное время
                if (!window.END_TIME) {
                    window.END_TIME = Date.now() + (74 * 60 * 60 * 1000);
                }
                updateDisplay();
                if (!timerInterval) {
                    timerInterval = setInterval(updateDisplay, 1000);
                }
            });
    }

    function updateDisplay() {
        const now = Date.now() + serverOffset;
        const timeLeft = Math.max(0, window.END_TIME - now);

        if (timeLeft === 0) {
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            contractText.textContent = '11111111111111111111';
            contractText.style.color = 'var(--neon-green)';
            contractText.style.fontSize = '1.2rem';
            contractText.style.fontWeight = 'bold';
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
            return;
        }

        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }

    // Запускаем синхронизацию времени
    synchronizeTime();

    // Периодически синхронизируем время (каждые 5 минут)
    const syncInterval = setInterval(synchronizeTime, 5 * 60 * 1000);

    // Возвращаем функцию очистки
    return () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        clearInterval(syncInterval);
    };
}

// Запускаем все анимации
createMatrixRain();
updatePrice();
const stopTimer = updateTimer();

// Очистка при закрытии страницы
window.addEventListener('unload', () => {
    if (stopTimer) stopTimer();
}); 