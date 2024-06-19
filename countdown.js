let countdown;

function startCountdown() {
    clearInterval(countdown);

    const seconds = parseInt(document.getElementById('secondsInput').value);

    if (isNaN(seconds) || seconds <= 0) {
        alert('Please enter a valid number of seconds.');
        return;
    }

    let timeLeft = seconds;
    countdown = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            document.getElementById('countdown').innerHTML = 'Countdown complete!';
        } else {
            document.getElementById('countdown').innerHTML = `Time left: ${timeLeft} seconds`;
            timeLeft--;
        }
    }, 1000);
}
