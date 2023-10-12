"use strict";
//global vars
let counterStart = 3;

const counter = document.querySelector(".counter");

counter.textContent = counterStart;

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
  setInterval(() => {
    target.style.backgroundColor = "white";
  }, 500);
};

document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("square-size")) return;
  console.log(e.target.dataset.order);
  selectColor(e.target);
});

// reduceCounter();
