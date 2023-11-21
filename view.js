"use strict";

// dom variables **try to see if there is a way to make this more global
const overlay = document.querySelector(".overlay");
const overlayTimers = document.querySelectorAll(".overlay-timer");
const playBtn = document.querySelector(".play-btn");

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
const gameCountdownStart = function () {
  overlay.style.display = "block";
  overlayTimers.forEach((s) => (s.style.display = "grid"));

  let temp = 0;
  const startTimer = setInterval(function () {
    counterStart--;
    countSlides(temp, counterStart);
    temp++;

    if (counterStart < 1) {
      clearInterval(startTimer);
      simonSays(simonsSelections);
      overlayTimers.forEach((s) => (s.style.display = "none"));
    }
  }, 1000);
};

// waits for user to hit play button, exported to controllers init function
export const playBtnDetector = function () {
  playBtn.addEventListener("click", gameCountdownStart);
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

const overlayEditor = function (message) {
  const text = `<p>${message}</p>`;
  overlay.style.display = "grid";
  overlay.classList.add("overlay-game--msg");
  overlay.insertAdjacentHTML("beforeend", text);
};

// game start count down
// function: set overlay for start timer to display
