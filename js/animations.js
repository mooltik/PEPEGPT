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
    // Конечная дата: 16 февраля 2025, 20:00:00 UTC
    const targetTime = {
        year: 2025,
        month: 2,  // февраль
        day: 16,
        hour: 20,
        minute: 0
    };

    const hoursElement = document.querySelector('.hours');
    const minutesElement = document.querySelector('.minutes');
    const secondsElement = document.querySelector('.seconds');
    const contractText = document.querySelector('.contract-text');
    
    function getCurrentUTCTime() {
        const now = new Date();
        return {
            year: now.getUTCFullYear(),
            month: now.getUTCMonth() + 1,
            day: now.getUTCDate(),
            hour: now.getUTCHours(),
            minute: now.getUTCMinutes(),
            second: now.getUTCSeconds()
        };
    }
    
    function calculateTimeLeft(current, target) {
        // Конвертируем всё в минуты для простоты расчетов
        const targetMinutes = (target.year * 525600) + // минут в году
                            (target.month * 43800) +   // минут в месяце (в среднем)
                            (target.day * 1440) +      // минут в дне
                            (target.hour * 60) +       // часы в минуты
                            target.minute;
        
        const currentMinutes = (current.year * 525600) +
                             (current.month * 43800) +
                             (current.day * 1440) +
                             (current.hour * 60) +
                             current.minute;
        
        const minutesLeft = targetMinutes - currentMinutes;
        const hoursLeft = Math.floor(minutesLeft / 60);
        const minsLeft = minutesLeft % 60;
        const secsLeft = current.second;
        
        return {
            hours: hoursLeft,
            minutes: minsLeft,
            seconds: 60 - secsLeft
        };
    }

    function updateDisplay() {
        const currentTime = getCurrentUTCTime();
        const timeLeft = calculateTimeLeft(currentTime, targetTime);

        if (timeLeft.hours <= 0 && timeLeft.minutes <= 0 && timeLeft.seconds <= 0) {
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

        hoursElement.textContent = Math.max(0, timeLeft.hours).toString().padStart(2, '0');
        minutesElement.textContent = Math.max(0, timeLeft.minutes).toString().padStart(2, '0');
        secondsElement.textContent = Math.max(0, timeLeft.seconds).toString().padStart(2, '0');
    }

    // Показываем локальное время окончания
    const localEndTime = new Date(Date.UTC(targetTime.year, targetTime.month - 1, targetTime.day, targetTime.hour, targetTime.minute));
    const endTimeString = localEndTime.toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });
    contractText.textContent = `Contract will appear here when timer ends (${endTimeString})`;

    // Обновляем время сразу при загрузке
    updateDisplay();
    
    const timer = setInterval(updateDisplay, 1000);
}

updateTimer(); 