import { voting } from "./voting.js";
import { comments } from "./comments.js";

export async function kitten(count) {
  const thisCount = count;
  let url = localStorage.getItem(`kittenimg${thisCount}`);

  const kittenContainer = document.createElement("div");
  const header = document.createElement("h1");
  const img = document.createElement("img");
  const windowContainer = document.getElementById("window-container");

  kittenContainer.id = `kitten-container${thisCount}`;
  header.id = `header${thisCount}`;
  header.innerText = `Kitten Picture ${thisCount}!!!`;
  img.id = `kitten-img${thisCount}`;

  if (url) img.src = url;
  else {
    url = await fetchKitten();
    img.src = url;
  }

  kittenContainer.append(header, img);

  windowContainer.append(kittenContainer);
  await voting(thisCount);
  //   const points = document.getElementById(`score${thisCount}`);
  //   if (localStorage.getItem(`points${thisCount}`))
  //     points.innerText = `Popularity Points: ${localStorage.getItem`points${thisCount}()`}`;

  async function fetchKitten() {
    try {
      const kittenResponse = await fetch(
        "https://api.thecatapi.com/v1/images/search?size=small"
      );

      const kittenData = await kittenResponse.json();
      console.log("kitten data ", kittenData);
      const kittenImgUrl = kittenData[0].url;

      localStorage.setItem(`kittenimg${thisCount}`, kittenImgUrl);
      return kittenImgUrl;
    } catch (e) {
      console.log("Failed to fetch image", e);
    }
  }
}

export async function fetchKitten() {
  try {
    const kittenResponse = await fetch(
      "https://api.thecatapi.com/v1/images/search?size=small"
    );

    const kittenData = await kittenResponse.json();
    console.log("kitten data ", kittenData);
    const kittenImgUrl = kittenData[0].url;

    localStorage.setItem(`kittenimg${thisCount}`, kittenImgUrl);
    return kittenImgUrl;
  } catch (e) {
    console.log("Failed to fetch image", e);
  }
}
