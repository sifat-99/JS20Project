const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const titleInput = document.getElementById('title');
const dateInput = document.getElementById('date-picker');

const countdownContainer = document.getElementById('countdown-container');
const countdownElTitle = countdownContainer.querySelector('h1');
const resetBtn = document.getElementById('complete-btn');
const timeElements = document.querySelectorAll('#countdown span');

const completeElement = document.getElementById('complete');
const finishedTitle = document.getElementById('finished-title');
const finishedDate = document.getElementById('finished-date');
const newCountdownBtn = document.getElementById('new-countdown-btn');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // Hide Input
        inputContainer.hidden = true;

        // If the countdown has ended, show complete
        if (distance < 0) {
            countdownContainer.hidden = true;
            clearInterval(countdownActive);
            finishedTitle.textContent = `${countdownTitle}`;
            finishedDate.textContent = `${countdownDate}`;
            completeElement.hidden = false;
        } else {
            // Else, show the countdown in progress
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeElement.hidden = true;
            countdownContainer.hidden = false;
        }
    }, second);
}

// Take Values from Form Input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = titleInput.value;
    countdownDate = dateInput.value;

    // Check for valid date
    if (countdownDate === '') {
        alert('Please select a date for the countdown.');
    } else {
        savedCountdown = {
            title: countdownTitle,
            date: countdownDate,
        };
        localStorage.setItem('countdown', JSON.stringify(savedCountdown));

        // Get number version of current Date, updateDOM
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

function reset() {
    countdownContainer.hidden = true;
    completeElement.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countdownActive);
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
    titleInput.value = '';
    dateInput.value = '';
}

function restorePreviousCountdown() {
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}
countdownForm.addEventListener('submit', updateCountdown);
resetBtn.addEventListener('click', reset);
newCountdownBtn.addEventListener('click', reset);

restorePreviousCountdown();
