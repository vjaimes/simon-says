import * as model from "./Model.js";
import * as view from "./view.js";

const transferSimonsSelections = function () {
  view.simonsSelections = model.randomSelectionResults.slice();
};

const InitModel = function () {
  console.log("control starting model");
  // model.startGame();
  // transferSimonsSelections();
};

const init = function () {
  view.playEvent(InitModel);
};

init();
