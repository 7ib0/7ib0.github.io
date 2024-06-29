// Hello!
let countdown;

function startCountdown() {
    clearInterval(countdown);
    document.getElementById('countdown').innerHTML = 'complete';
    const seconds = parseInt(document.getElementById('secondsInput').value);

    if (isNaN(seconds) || seconds <= 0) {
        alert('enter a valid number');
        return;
    }
    
    let timeLeft = seconds;
    countdown = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            document.getElementById('countdown').innerHTML = 'complete';
        } else {
            document.getElementById('countdown').innerHTML = `${timeLeft}`;
            timeLeft--;
        }
    }, 1000);
}
