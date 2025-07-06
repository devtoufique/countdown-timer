const timerDisplay = document.querySelector(".time");
const homeWrapper = document.querySelector('.home-wrapper');
const actionBtn = document.querySelector('.action-btn');

let countdownInterval;
let originalTime;
let remainingTime = 0;
let isPaused = false;


function startCountdownFromInput() {
    const hours = Number(document.querySelector('.hours-input').value) || 0;
    const minutes = Number(document.querySelector('.minutes-input').value) || 0;
    const seconds = Number(document.querySelector('.seconds-input').value) || 0;

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    originalTime = totalSeconds;

    if (totalSeconds > 0) {
        homeWrapper.classList.add('hidden');
        actionBtn.classList.remove('hidden');
        startCountdown(totalSeconds);

    } else {
        document.querySelector('.error-message').textContent = "Enter a valid time!";
    }
}

function updateTimerDisplay(seconds) {

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    timerDisplay.textContent = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

}

function startCountdown(duration) {

    remainingTime = duration;

    updateTimerDisplay(remainingTime);
    clearInterval(countdownInterval); // prevent multiple intervals

    countdownInterval = setInterval(() => {

        if (!isPaused) {

            remainingTime--;

            updateTimerDisplay(remainingTime)

            if (remainingTime == 0) {
                clearInterval(countdownInterval);
                timerDisplay.textContent = "Time's up!";
            }
        }
    }, 1000);
}

function restartTimer() {
    if (originalTime > 0) {
        isPaused = false;  // reset pause
        togglePauseButton(false); // update button text/icon
        startCountdown(originalTime);
    }
}

// Helper function to update pause button UI
function togglePauseButton(paused) {
    document.querySelector('.pause-btn').innerHTML = paused
        ? '<i class="fa-solid fa-play"></i> Resume'
        : '<i class="fa-solid fa-pause"></i> Pause';
}

function togglePause() {
    isPaused = !isPaused;
    togglePauseButton(isPaused);
}

