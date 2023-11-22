("use strict");

// Model.js holds application data and runs the "business" part of the code
// in this case. simons selections and how he selects his colors
export let randomSelectionResults = [];
export let gameStatus = false;

//global vars
export const overlayTimers = document.querySelectorAll(".overlay-timer");
export const overlay = document.querySelector(".overlay");

// random number generator for simon's color selections
const RNG = function (max) {
  for (let i = 0; i < max; i++) {
    const randomNum = Math.floor(Math.random() * max);
    randomSelectionResults.push(randomNum + 1);
  }
};

export const startGame = function () {
  gameStatus = true;
  RNG(4);
};

export const gameOver = function () {
  if (!gameStatus) return;
  gameStatus = false;
  overlayEditor("Game Over!!!");
  squares.forEach((s) => (s.style.pointerEvents = "none"));
};

export const gameWon = function () {
  if (!gameStatus) return;
  gameStatus = false;
  overlayEditor("You Win!!!");
  squares.forEach((s) => (s.style.pointerEvents = "none"));
};

// timer for square highlight animation
const highlightTiming = {
  duration: 750,
  iterations: 1,
};
