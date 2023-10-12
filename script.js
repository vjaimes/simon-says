"use strict";
//global vars
let counterStart = 3;

const counter = document.querySelector(".counter");

counter.textContent = counterStart;

const reduceCounter = setInterval(function () {
  counterStart--;
  counter.textContent = counterStart;

  if (counterStart < 1) {
    clearInterval(reduceCounter);
    counter.style.display = "none";
  }
}, 1000);

document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("square-size")) return;
  console.log(e.target.dataset.order);
});

// reduceCounter();
