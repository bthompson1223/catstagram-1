import { kitten } from "./assets/kitten.js";
import { voting } from "./assets/voting.js";
import { comments } from "./assets/comments.js";

const initializePage = async () => {
  const windowContainer = document.createElement("div");
  windowContainer.id = "window-container";
  document.body.appendChild(windowContainer);
  await kitten();
  await voting();
  comments();
};

window.onload = initializePage;
