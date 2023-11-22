import * as model from "./Model.js";
import * as view from "./view.js";

const transferSimonsSelections = function () {
  view.simonsSelections = model.randomSelectionResults.map((num) => num);
};

const startGame = function () {
  view.playBtnDetector();
  if (view.gameStart) {
    console.log("game start");
    model.startGame();
    transferSimonsSelections();
  }
};

const init = function () {
  startGame();
};

init();
