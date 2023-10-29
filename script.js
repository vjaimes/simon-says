"use strict";
//global vars
const counter = document.querySelector(".counter");
const squares = Array.from(document.querySelectorAll(".square-size"));
const playBtn = document.querySelector(".play-btn");
const overlay = document.querySelector(".overlay");
const gameOverScreen = document.querySelector(".overlay-gameOver");

let gameStart = false;
let counterStart = 3;
let simonsSelections = [];

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
  //how we know that there are no more squares left for simon to select
  let selectionCounter = simonsSelections.length;
  //keeps track of which square to highlight next
  let currSquare = 0;

  playBtn.style.display = "none";
  const timer = setInterval(() => {
    const selection = squares.find(
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
  gameStart = true;
  RNG(4);
  gameCountdownStart();
};

const gameOver = function () {
  if (!gameStart) return;
  gameOverScreen.style.display = "block";
  simonsSelections = [];
  gameStart = false;
};

const gameWon = function () {
  if (!gameStart) return;
  gameStart = false;
  console.log("won");
  // turn on game won protocol
};

//compares player selection against simons selections
let colorIndex = 0;
// event listener for when clicking on a colored square
document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("square-size")) return;
  highlightColor(e.target);

  if (+e.target.dataset.order === +simonsSelections[colorIndex]) {
    if (colorIndex >= simonsSelections.length) {
      console.log("game won");
      gameWon();
    }
    colorIndex++;
    console.log("color index: ", colorIndex, simonsSelections.length);
  } else {
    console.log("game over");
    console.log("color index: ", colorIndex, simonsSelections.length);
    gameOver();
  }
});

const init = function () {
  playBtn.addEventListener("click", startGame);
};

init();
