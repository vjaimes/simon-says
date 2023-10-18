"use strict";
//global vars
let counterStart = 3;
const simonsColors = [];

const counter = document.querySelector(".counter");

// counter.textContent = counterStart;

// game start count down
const reduceCounter = function () {
  setInterval(function () {
    counterStart--;
    counter.textContent = counterStart;

    if (counterStart < 1) {
      clearInterval(reduceCounter);
      counter.style.display = "none";
    }
  }, 1000);
};

// random number generator for simon's color selections
const RNG = function (max) {
  for (let i = 0; i < max; i++) {
    const randomNum = Math.floor(Math.random() * max);
    simonsColors.push(randomNum + 1);
  }
  console.log(simonsColors);
};

const highlightTiming = {
  duration: 2000,
  iterations: 1,
};

const highlightColor = function (target) {
  const data = target.dataset.order;

  switch (+data) {
    case 1:
      const highlightSquareRed = [
        { backgroundColor: "rgb(255, 0, 0)" },
        { backgroundColor: "rgba(255, 0, 0, 0.5)" },
      ];
      break;
    case 2:
      const highlightSquareBlue = [
        { backgroundColor: "rgb(0, 0, 255)" },
        { backgroundColor: "rgba(0, 0, 255, 0.5)" },
      ];
      break;
    case 3:
      const highlightSquareGreen = [
        { backgroundColor: "rgb(0, 128, 0)" },
        { backgroundColor: "rgba(0, 128, 0, 0.5)" },
      ];
      break;
    case 4:
      const highlightSquareYellow = [
        { backgroundColor: "rgb(255, 255, 0)" },
        { backgroundColor: "rgba(255, 255, 0, 0.5)" },
      ];
      break;
    default:
      return;
  }
};

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

// event listener for when clicking on a colored square
document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("square-size")) return;
  // highlightColor(e.target);
  e.target.animate(() => {
    highlightColor(e.target);
  }, highlightTiming);
});

// reduceCounter();
