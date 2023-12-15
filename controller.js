import * as model from "./Model.js";
import * as view from "./view.js";

const sendSelection = function () {
  view.simonSays(model.randomSelectionResults);
};

const InitModel = function () {
  console.log("control starting model");
  model.startGame();
  view.gameCountdownStart(sendSelection);
};

const init = function () {
  view.playEvent(InitModel);
};

init();
