import { kitten } from "./assets/kitten.js";
import { voting } from "./assets/voting.js";

const initializePage = () => {
  const windowContainer = document.createElement("div");
  windowContainer.id = "window-container";
  document.body.appendChild(windowContainer);
  let count = 1;
  kitten(count);
  count++;
  kitten(count);
  voting();
};

window.onload = initializePage;
