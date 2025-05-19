let countdown;
let timeLeft;

function startCountdown() {
    clearInterval(countdown);
    
    const seconds = parseInt(document.getElementById('secondsInput').value);

    if (isNaN(seconds) || seconds <= 0) {
        alert('Enter a valid number!');
        document.getElementById('countdown').innerHTML = '0';
        return;
    }
    
    timeLeft = seconds;
    document.getElementById('countdown').innerHTML = `${timeLeft}`;
    timeLeft--;
    countdown = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            document.getElementById('countdown').innerHTML = 'Countdown complete!';
        } else {
            document.getElementById('countdown').innerHTML = `${timeLeft}`;
            timeLeft--;
        }
    }, 1000);
}

function resetCountdown() {
    clearInterval(countdown);
    timeLeft = 0;
    document.getElementById('countdown').innerHTML = '0';
    document.getElementById('secondsInput').value = '';
}
    