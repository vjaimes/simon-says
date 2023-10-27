"use strict";
//global vars
const gameStart = false;
let counterStart = 3;
const playerSelections = [];
let simonsSelections = [];

const counter = document.querySelector(".counter");
const simonsSquares = Array.from(document.querySelectorAll(".square-size"));
const playBtn = document.querySelector(".play-btn");
const overlay = document.querySelector(".overlay");
const gameOverScreen = document.querySelector(".overlay-gameOver");

// game start count down
const gameCountdownStart = function () {
  overlay.style.display = "block";
  counter.style.display = "block";
  counter.textContent = counterStart;

  const startTimer = setInterval(function () {
    counterStart--;
    counter.textContent = counterStart;

    if (counterStart < 1) {
      clearInterval(startTimer);
      counter.style.display = "none";
      simonSays(simonsSelections);
    }
  }, 1000);
};

// random number generator for simon's color selections
const RNG = function (max) {
  for (let i = 0; i < max; i++) {
    const randomNum = Math.floor(Math.random() * max);
    simonsSelections.push(randomNum + 1);
  }
  console.log(simonsSelections);
};

// display selected colors
const simonSays = function (simonsSelections) {
  let selectionCounter = simonsSelections.length;
  let currSquare = 0;

  playBtn.style.display = "none";
  const timer = setInterval(() => {
    const selection = simonsSquares.find(
      (square) => +square.dataset.order === simonsSelections[currSquare]
    );

    highlightColor(selection);

    currSquare++;
    selectionCounter--;
    console.log("counter: ", selectionCounter);
    console.log("index: ", currSquare);
    console.log(simonsSelections);

    if (selectionCounter < 1) {
      clearInterval(timer);
      console.log("cleard");
      setTimeout(() => {
        overlay.style.display = "none";
      }, 1000);
    }
  }, 1000);
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

// old color selector for simon
// Highlights the colors simon selects.
// const highlightColor = function (target) {
//   const data = target.dataset.order;

//   switch (+data) {
//     case 1:
//       target.style.backgroundColor = "rgb(255, 0, 0)";
//       setInterval(() => {
//         target.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
//       }, 250);
//       break;
//     case 2:
//       target.style.backgroundColor = "rgb(0, 0, 255)";
//       setInterval(() => {
//         target.style.backgroundColor = "rgba(0, 0, 255, 0.5)";
//       }, 250);
//       break;
//     case 3:
//       target.style.backgroundColor = "rgb(0, 128, 0)";
//       setInterval(() => {
//         target.style.backgroundColor = "rgba(0, 128, 0, 0.5)";
//       }, 250);
//       break;
//     case 4:
//       target.style.backgroundColor = "rgb(255, 255, 0)";
//       setInterval(() => {
//         target.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
//       }, 250);
//       break;
//     default:
//       return;
//   }
// };

const startGame = function () {
  RNG(4);
  gameCountdownStart();
};

const gameOver = function () {
  gameOverScreen.style.display = "block";
  simonsSelections = [];
};

//keeps track of current players & simons selection
let colorIndex = 0;
// event listener for when clicking on a colored square
document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("square-size")) return;
  highlightColor(e.target);
  // playerSelections.push(e.target);

  if (+e.target.dataset.order === +simonsSelections[colorIndex]) {
    colorIndex++;
  } else {
    gameOver();
  }
});

const init = function () {
  playBtn.addEventListener("click", startGame);
};

init();
