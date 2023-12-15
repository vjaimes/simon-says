"use strict";

// dom variables **try to see if there is a way to make this more global
const overlay = document.querySelector(".overlay");
const overlayTimers = document.querySelectorAll(".overlay-timer");
const playBtn = document.querySelector(".play-btn");

export const coloredSquares = Array.from(
  document.querySelectorAll(".square-size")
);
export let gameStart = false;

// slide overlay to next countdown number,
const countSlides = function (slide, count) {
  console.log(`slide ${slide}`);
  overlayTimers.forEach((s, i) => {
    s.textContent = count;
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

// displays countdown too gamestart with screen overlays
let counterStart = 4;
export const gameCountdownStart = function (functionEvent) {
  overlay.style.display = "block";
  overlayTimers.forEach((s) => (s.style.display = "grid"));

  let temp = 0;
  const startTimer = setInterval(function () {
    counterStart--;
    countSlides(temp, counterStart);
    temp++;

    if (counterStart < 1) {
      clearInterval(startTimer);
      overlayTimers.forEach((s) => (s.style.display = "none"));
      functionEvent();
    }
  }, 1000);
};

// timer for square highlight animation
const highlightTiming = {
  duration: 750,
  iterations: 1,
};

// function that highlights square based on simons squares
export const highlightColor = function (target) {
  console.log(target);
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

// display selected colors
export const simonSays = function (simonsSelections) {
  //how we know that there are no more coloredSquares left for simon to select
  let selectionCounter = simonsSelections.length;
  //keeps track of which square to highlight next
  let currSquare = 0;

  playBtn.style.display = "none";
  const timer = setInterval(() => {
    const selection = coloredSquares.find(
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

const overlayEditor = function (message) {
  const text = `<p>${message}</p>`;
  overlay.style.display = "grid";
  overlay.classList.add("overlay-game--msg");
  overlay.insertAdjacentHTML("beforeend", text);
};

// waits for user to hit play button, exported to controllers init function
export const playEvent = function (functionEvent) {
  playBtn.addEventListener("click", () => {
    functionEvent();
  });
};
