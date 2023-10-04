import { fetchKitten } from "./kitten.js";

export const voting = () => {
  let points = 0;
  const scoreContainer = document.createElement("div");
  const score = document.createElement("p");
  const popScoreContainer = document.createElement("div");
  const upVoteButton = document.createElement("button");
  const downVoteButton = document.createElement("button");

  scoreContainer.className = "score-container";
  popScoreContainer.id = "popularity";
  score.className = "score";
  score.innerText = `Popularity Points: ${points}`;
  upVoteButton.className = "upvote";
  upVoteButton.innerText = "Upvote!";
  downVoteButton.innerText = "Next!";
  downVoteButton.className = "downvote";

  upVoteButton.addEventListener("click", addPoints);
  upVoteButton.addEventListener("click", () => {
    upVoteButton.removeEventListener("click", addPoints);
  });

  downVoteButton.addEventListener("click", async () => {
    const data = await fetchKitten();
    const img = document.querySelector(".img");
    const url = data[0].url;
    img.setAttribute("src", url);
  });

  //   kittenContainer.forEach((kitten) => console.log("kitten ", kitten));
  scoreContainer.append(upVoteButton, downVoteButton);
  popScoreContainer.append(score, scoreContainer);
  document.body.appendChild(popScoreContainer);

  const kittenContainer = document.getElementById("kitten-container");
  console.log(kittenContainer);
  //   for (const kitten of kittenContainer) {
  //     kitten.appendChild(popScoreContainer);
  //   }
};

function addPoints() {
  points++;
  return points;
}
