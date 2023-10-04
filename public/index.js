import { kitten } from "./assets/kitten.js";

const initializePage = async () => {
  const windowContainer = document.createElement("div");
  windowContainer.id = "window-container";
  document.body.appendChild(windowContainer);
  let count = 1;
  await kitten(count);
  count++;
  await kitten(count);
};

window.onload = initializePage;
