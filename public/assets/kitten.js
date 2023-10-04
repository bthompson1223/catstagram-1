import { voting } from "./voting.js";
import { comments } from "./comments.js";

export async function kitten(count) {
  const thisCount = count;
  let url = await fetchKitten();
  url = url[0].url;

  const kittenContainer = document.createElement("div");
  const header = document.createElement("h1");
  const img = document.createElement("img");
  const windowContainer = document.getElementById("window-container");

  kittenContainer.id = `kitten-container${thisCount}`;
  header.id = `header${thisCount}`;
  header.innerText = `Kitten Picture ${thisCount}!!!`;
  img.id = `kitten-img${thisCount}`;
  img.setAttribute("src", url);

  kittenContainer.append(header, img);

  setTimeout(voting, 500, thisCount);
  setTimeout(comments, 500, thisCount);

  windowContainer.append(kittenContainer);
}

export async function fetchKitten() {
  return fetch("https://api.thecatapi.com/v1/images/search")
    .then((res) => res.json())
    .then((data) => data);
}
