("use strict");

// Model.js holds application data and runs the "business" part of the code
// in this case. simons selections and how he selects his colors

export let simonsSelections = [];
export let gameStart = false;

//global vars
export const squares = Array.from(document.querySelectorAll(".square-size"));
export const overlayTimers = document.querySelectorAll(".overlay-timer");
export const overlay = document.querySelector(".overlay");

// random number generator for simon's color selections
const RNG = function (max) {
  for (let i = 0; i < max; i++) {
    const randomNum = Math.floor(Math.random() * max);
    simonsSelections.push(randomNum + 1);
  }
};

export const startGame = function () {
  gameStart = true;
  RNG(4);
  gameCountdownStart();
};

export const gameOver = function () {
  if (!gameStart) return;
  gameStart = false;
  overlayEditor("Game Over!!!");
  squares.forEach((s) => (s.style.pointerEvents = "none"));
};

export const gameWon = function () {
  if (!gameStart) return;
  gameStart = false;
  overlayEditor("You Win!!!");
  squares.forEach((s) => (s.style.pointerEvents = "none"));
};

// timer for square highlight animation
const highlightTiming = {
  duration: 750,
  iterations: 1,
};

// function that highlights square based on simons squares
export const highlightColor = function (target) {
  const data = target.dataset.order;

  switch (+data) {
    case 1:
      const highlightSquareRed = [
        { backgroundColor: "rgb(255, 0, 0)" },
        { backgroundColor: "rgba(255, 0, 0, 0.5)" },
      ];

      target.animate(highlightSquareRed, highlightTiming);
      break;
    case 2:
      const highlightSquareBlue = [
        { backgroundColor: "rgb(0, 0, 255)" },
        { backgroundColor: "rgba(0, 0, 255, 0.5)" },
      ];

      target.animate(highlightSquareBlue, highlightTiming);
      break;
    case 3:
      const highlightSquareGreen = [
        { backgroundColor: "rgb(0, 128, 0)" },
        { backgroundColor: "rgba(0, 128, 0, 0.5)" },
      ];

      target.animate(highlightSquareGreen, highlightTiming);
      break;
    case 4:
      const highlightSquareYellow = [
        { backgroundColor: "rgb(255, 255, 0)" },
        { backgroundColor: "rgba(255, 255, 0, 0.5)" },
      ];

      target.animate(highlightSquareYellow, highlightTiming);
      break;
    default:
      return;
  }
};
