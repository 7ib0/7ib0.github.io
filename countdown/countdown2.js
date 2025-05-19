let countdown;
let timeLeft;

async function startCountdown() {
    clearInterval(countdown);
    document.getElementById('countdown').innerHTML = 'Fetching results.';
    await delay(3);
    document.getElementById('countdown').innerHTML = 'Fetching results..';
    await delay(3);
    document.getElementById('countdown').innerHTML = 'Fetching results...';
    const seconds = parseInt(document.getElementById('secondsInput').value);

    if (isNaN(seconds) || seconds <= 0) {
        alert('Enter a valid number!');
        document.getElementById('countdown').innerHTML = '0';
        return;
    }
    
    timeLeft = seconds;
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
