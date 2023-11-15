("use strict");

export let simonsSelections = [];
//global vars
const squares = Array.from(document.querySelectorAll(".square-size"));
const overlayTimers = document.querySelectorAll(".overlay-timer");
const playBtn = document.querySelector(".play-btn");
const overlay = document.querySelector(".overlay");

const startGame = function () {
  gameStart = true;
  RNG(4);
  gameCountdownStart();
};

const gameOver = function () {
  if (!gameStart) return;
  gameStart = false;
  overlayEditor("Game Over!!!");
  squares.forEach((s) => (s.style.pointerEvents = "none"));
};

const gameWon = function () {
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
const highlightColor = function (target) {
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
