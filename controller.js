import * as model from "./Model.js";
import * as view from "./view.js";

const startGame = function () {
  view.playBtnDetector();
  model.gameStart = true;
};

const init = function () {
  startGame();
};

init();
