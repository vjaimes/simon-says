import * as model from "./Model.js";
import * as view from "./View.js";

const init = function () {
  model.playBtn.addEventListener("click", model.startGame);
};

init();
