const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerChoiceEl = document.getElementById('computerChoice');
const resultTextEl = document.getElementById('resultText');
const resetIcon = document.querySelector('.reset-icon');


const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcon = document.querySelectorAll('.far');
let playerScore = 0;
let computerScore = 0;

const winRules = {
    rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
    paper: { name: 'Paper', defeats: ['rock', 'spock'] },
    scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
    lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
    spock: { name: 'Spock', defeats: ['rock', 'scissors'] }
};

function resetSelected() {
    allGameIcon.forEach(icon => {
        icon.classList.remove('selected');
    });
}

let computerChoice = '';

function computerRandomChoice() {
    const computerChoiceNumber = Math.random()

    if (computerChoiceNumber < 0.2) {
        computerChoice = 'rock';
        computerRock.classList.add('selected');
        computerChoiceEl.textContent = ' --- Rock';
    } else if (computerChoiceNumber <= 0.4) {
        computerChoice = 'paper';
        computerPaper.classList.add('selected');
        computerChoiceEl.textContent = ' --- Paper';
    } else if (computerChoiceNumber <= 0.6) {
        computerChoice = 'scissors';
        computerScissors.classList.add('selected');
        computerChoiceEl.textContent = ' --- Scissors';
    } else if (computerChoiceNumber <= 0.8) {
        computerChoice = 'lizard';
        computerLizard.classList.add('selected');
        computerChoiceEl.textContent = ' --- Lizard';
    } else {
        computerChoice = 'spock';
        computerSpock.classList.add('selected');
        computerChoiceEl.textContent = ' --- Spock';
    }
}

function updateScore(playerChoice) {
    if (playerChoice === computerChoice) {
        resultTextEl.textContent = 'It\'s a Tie!';
    }
    else {
        const choice = winRules[playerChoice];
        if (choice.defeats.indexOf(computerChoice) === -1) {
            resultTextEl.textContent = 'You Lose!';
            computerScore++;
            computerScoreEl.textContent = computerScore;
        } else {
            resultTextEl.textContent = 'You Won!';
            playerScore++;
            playerScoreEl.textContent = playerScore;
        }
    }
}

function checkResult(playerChoice) {
    resetSelected();
    computerRandomChoice();
    updateScore(playerChoice);
}

function select(choice) {
    checkResult(choice);
    switch (choice) {
        case 'rock':
            playerRock.classList.add('selected');
            playerChoiceEl.textContent = ' --- Rock';
            break;
        case 'paper':
            playerPaper.classList.add('selected');
            playerChoiceEl.textContent = ' --- Paper';
            break;
        case 'scissors':
            playerScissors.classList.add('selected');
            playerChoiceEl.textContent = ' --- Scissors';
            break;
        case 'lizard':
            playerLizard.classList.add('selected');
            playerChoiceEl.textContent = ' --- Lizard';
            break;
        case 'spock':
            playerSpock.classList.add('selected');
            playerChoiceEl.textContent = ' --- Spock';
            break;
        default:
            break;
    }
}

resetIcon.addEventListener('click', () => {
    resetSelected();
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    playerChoiceEl.textContent = ' --- Choice';
    computerChoiceEl.textContent = ' --- Choice';
    resultTextEl.textContent = '';
});