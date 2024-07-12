let startTime;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
    const currentTime = Date.now();
    const timeElapsed = currentTime - startTime + elapsedTime;
    display.textContent = formatTime(timeElapsed);
}

function startStop() {
    if (isRunning) {
        clearInterval(intervalId);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now();
        intervalId = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(intervalId);
    elapsedTime = 0;
    display.textContent = '00:00:00.00';
    startStopBtn.textContent = 'Start';
    isRunning = false;
    lapsList.innerHTML = '';
}

function addLap() {
    if (isRunning) {
        const currentTime = Date.now();
        const timeElapsed = currentTime - startTime + elapsedTime;
        const lapTime = formatTime(timeElapsed);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', addLap);
