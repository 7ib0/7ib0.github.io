let stopwatchInterval;
let startTime;
let elapsedTime = 0;
let running = false;

function formatTime(time) {
    const milliseconds = String(time % 1000).padStart(3, '0');
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
    const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, '0');
    const hours = String(Math.floor(time / (1000 * 60 * 60))).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateStopwatch() {
    elapsedTime = Date.now() - startTime;
    document.getElementById('stopwatch').innerText = formatTime(elapsedTime);
}

function startStopwatch() {
    if (!running) {
        startTime = Date.now() - elapsedTime; // Adjust start time to keep elapsed time when restarting
        stopwatchInterval = setInterval(updateStopwatch, 10); // Update every 10ms for milliseconds
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
