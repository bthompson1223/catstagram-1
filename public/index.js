import { kitten } from "./assets/kitten.js";
import { initializeChat } from "./assets/chat.js";

const initializePage = async () => {
  const windowContainer = document.createElement("div");
  windowContainer.id = "window-container";
  document.body.appendChild(windowContainer);
  let count = 1;
  await kitten(count);
  count++;
  await kitten(count);
  count++;
  await kitten(count);
  count++;
  await kitten(count);
  count++;
  await kitten(count);
  count++;
  await kitten(count);

  const upVoteButtons = document.querySelectorAll(".upvote");
  upVoteButtons.forEach((upVoteButton) => {
    let pokemon = document.querySelectorAll("#window-container > div");
    upVoteButton.addEventListener("click", async () => {
      for (let i = 1; i <= pokemon.length; i++) {
        const score = document.querySelector(`#score${i}`);
        console.log(i);
        const scoreArr = score.innerText.split(" ");
        console.log(`score${i}`, scoreArr[2]);
        if (parseInt(scoreArr[2]) < 1) {
          const image = document.querySelector(`#kitten-img${i}`);
          console.log(image);
          const url = await fetchKitten(i);
          image.setAttribute("src", url);
          localStorage.removeItem(`comments${i}`);
          const comments = document.querySelector(`#comments${i}`);
          comments.innerHTML = "<ul></ul>";
        }
      }
      // scores.forEach((score) => {
      //   if (score.innerText < 1) {
      //     const pokemon = document.querySelectorAll("div > img");
      //     pokemon.forEach((poke) => {});
      //   }
      // });
    });
  });
  initializeChat();
};

async function fetchKitten(num) {
  try {
    // const kittenResponse = await fetch(
    //   "https://api.thecatapi.com/v1/images/search?size=small"
    // );
    let id = Math.floor(Math.random() * 1021) + 1;
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await pokemon.json();
    console.log(data);
    const pokeURL = data.sprites["front_default"];
    console.log(pokeURL);

    // const kittenData = await kittenResponse.json();
    // console.log("kitten data ", kittenData);
    // const kittenImgUrl = kittenData[0].url;

    localStorage.setItem(`kittenimg${num}`, pokeURL);
    return pokeURL;
  } catch (e) {
    console.log("Failed to fetch image", e);
  }
}

window.onload = initializePage;
