"use strict";
//global vars
let counterStart = 3;

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

const selectColor = function (target) {
  const data = target.dataset.order;

  switch (data) {
    case data === 1:
      console.log(data);
      target.style.backgroundColor = "rgb(255, 0, 0)";
      setInterval(() => {
        target.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
      }, 250);
      break;
    default:
      console.log("done");
  }
};

document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("square-size")) return;
  selectColor(e.target);
});

// reduceCounter();
