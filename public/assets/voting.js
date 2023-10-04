import { fetchKitten } from "./kitten.js";

export const voting = async () => {
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
    const img = document.querySelector(".kitten-img");
    const url = await data[0].url;
    img.setAttribute("src", url);
    const comments = document.querySelectorAll(".comment");
    points = 0;
    score.innerText = `Popularity Points: ${points}`;
    comments.forEach((comment) => comment.remove());
  });

  //   kittenContainer.forEach((kitten) => console.log("kitten ", kitten));
  scoreContainer.append(upVoteButton, downVoteButton);
  popScoreContainer.append(score, scoreContainer);

  const kittenContainer = Array.from(
    document.getElementsByClassName("kitten-container")
  );

  kittenContainer.forEach((kitten) => kitten.append(popScoreContainer));

  function addPoints() {
    if (points < 1) points += 1;

    score.innerText = `Popularity Points: ${points}`;
    return points;
  }
};
