"use strict";
//global vars
const counter = document.querySelector(".counter");
const squares = Array.from(document.querySelectorAll(".square-size"));
const overlayTimers = document.querySelectorAll(".overlay-timer");
const playBtn = document.querySelector(".play-btn");
const overlay = document.querySelector(".overlay");

let gameStart = false;
let counterStart = 3;
let simonsSelections = [];

const overlayEditor = function (message) {
  const text = `<p>${message}</p>`;
  overlay.style.display = "grid";
  overlay.classList.add("overlay-game--msg");
  overlay.insertAdjacentHTML("beforeend", text);
};

// game start count down
const gameCountdownStart = function () {
  overlay.style.display = "block";
  counter.style.display = "block";
  const text = ``;
  counter.textContent = counterStart;

  // for (let count = 0; count < counterStart; count++) {
  //   overlay.insertAdjacentHTML(`<div>${counterStart}</div>`);
  // }

  let temp = 0;
  const startTimer = setInterval(function () {
    counterStart--;
    counter.textContent = counterStart;
    slides(temp);
    console.log(`slide: ${temp}`);
    temp++;

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

//compares player selection against simons selections
let colorIndex = 0;
// event listener for when clicking on a colored square
document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("square-size")) return;
  highlightColor(e.target);

  if (+e.target.dataset.order === +simonsSelections[colorIndex]) {
    colorIndex++;
    if (colorIndex === simonsSelections.length) {
      gameWon();
    }
  } else {
    gameOver();
  }
});

const init = function () {
  playBtn.addEventListener("click", startGame);
};

const slides = function (slide) {
  console.log(`slide ${slide}`);
  overlayTimers.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

init();
