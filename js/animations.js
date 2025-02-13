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
    
    let hours = 74;
    let minutes = 0;
    let seconds = 0;
    
    const timer = setInterval(() => {
        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    clearInterval(timer);
                    return;
                }
            }
        }
        
        // Add glitch effect randomly
        if (Math.random() < 0.1) {
            hoursElement.style.animation = 'none';
            hoursElement.offsetHeight; // Trigger reflow
            hoursElement.style.animation = 'timer-glitch 0.3s infinite';
            setTimeout(() => {
                hoursElement.style.animation = 'timer-glitch 3s infinite';
            }, 300);
        }
        
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

updateTimer(); 