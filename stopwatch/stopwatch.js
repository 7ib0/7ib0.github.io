let stopwatchInterval;
let elapsedTime = 0;
let running = false;

function formatTime(time) {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function updateStopwatch() {
    elapsedTime++;
    document.getElementById('stopwatch').innerText = formatTime(elapsedTime);
}

function startStopwatch() {
    if (!running) {
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        running = true;
    }
}

function stopStopwatch() {
    if (running) {
        clearInterval(stopwatchInterval);
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    document.getElementById('stopwatch').innerText = formatTime(elapsedTime);
    running = false;
}
