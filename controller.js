import * as model from "./Model.js";

const init = function () {
  model.playBtn.addEventListener("click", model.startGame);
};

init();
