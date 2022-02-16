'use strict';

// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Start Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let updateScore = 0;
let activePlayer = 0;
let playing = true;
const playerScore = [0, 0];

// Rolling dice func
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Display the dice picture
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // Update current
    if (dice === 1) {
      //Switch player and 0 out score
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
      updateScore = 0;
    } else {
      // Add dice to current score
      updateScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        updateScore;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    playerScore[activePlayer] += updateScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      playerScore[activePlayer];

    // Check player score
    if (playerScore[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
      updateScore = 0;
    }
  }
});

// Reset the game and the game variables
btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  updateScore = 0;
  activePlayer = 0;
  playing = true;
  playerScore[0] = 0;
  playerScore[1] = 0;
});
