import { comments } from "./comments.js";

export const voting = async (count) => {
  const thisCount = count;
  let points;

  const scoreContainer = document.createElement("div");
  const score = document.createElement("p");
  const popScoreContainer = document.createElement("div");
  const upVoteButton = document.createElement("button");
  const downVoteButton = document.createElement("button");

  scoreContainer.className = "score-container";
  popScoreContainer.id = `popularity${thisCount}`;
  score.id = `score${thisCount}`;

  if (!localStorage.getItem(`points${thisCount}`)) {
    points = 0;
    localStorage.setItem(`points${thisCount}`, points);
  } else {
    const catcher = localStorage.getItem(`points${thisCount}`);
    points = parseInt(catcher);
  }

  score.innerText = `Popularity Points: ${points}`;
  upVoteButton.className = "upvote";
  upVoteButton.innerText = "Upvote!";
  downVoteButton.innerText = "Next!";
  downVoteButton.className = "downvote";

  upVoteButton.addEventListener("click", addPoints);
  //   upVoteButton.addEventListener("click", () => {
  //     upVoteButton.removeEventListener("click", addPoints);
  //   });

  downVoteButton.addEventListener("click", async () => {
    const point = score.innerText.split(" ")[2];
    if (point > 0) {
      const data = await fetchKitten(thisCount);
      const img = document.querySelector(`#kitten-img${thisCount}`);
      // const url = await data[0].url;
      localStorage.setItem(`kittenimg${thisCount}`, data);
      img.setAttribute("src", data);
      const comments = document.querySelectorAll(`#comments${thisCount} > li`);
      const commentBox = document.querySelector(`#comments${thisCount}`);
      points = 0;
      score.innerText = `Popularity Points: ${points}`;
      comments.forEach((comment) => comment.remove());
      localStorage.setItem(`points${thisCount}`, 0);
      localStorage.setItem(`comments${thisCount}`, "");
    }
  });

  //   kittenContainer.forEach((kitten) => console.log("kitten ", kitten));
  scoreContainer.append(upVoteButton, downVoteButton);
  popScoreContainer.append(score, scoreContainer);

  const kittenContainer = document.getElementById(
    `kitten-container${thisCount}`
  );

  kittenContainer.append(popScoreContainer);

  function addPoints() {
    points += 1;
    localStorage.setItem(`points${thisCount}`, points);
    score.innerText = `Popularity Points: ${points}`;
    return points;
  }
  await comments(thisCount);
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
