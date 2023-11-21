// slide overlay to next countdown number, make name more descriptive and adapt to MVC
const slides = function (slide, count) {
  console.log(`slide ${slide}`);
  overlayTimers.forEach((s, i) => {
    s.textContent = count;
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
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
export const gameCountdownStart = function () {
  overlay.style.display = "block";
  overlayTimers.forEach((s) => (s.style.display = "grid"));

  let temp = 0;
  const startTimer = setInterval(function () {
    counterStart--;
    slides(temp, counterStart);
    temp++;

    if (counterStart < 1) {
      clearInterval(startTimer);
      simonSays(simonsSelections);
      overlayTimers.forEach((s) => (s.style.display = "none"));
    }
  }, 1000);
};
