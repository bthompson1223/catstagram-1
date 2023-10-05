import { comments } from "./comments.js";

export const voting = async (count) => {
  const thisCount = count;
  let points;
  window["points" + thisCount] = thisCount;
  if (!localStorage.getItem(`points${thisCount}`)) {
    points = 0;
    localStorage.setItem(`points${thisCount}`, points);
  } else points = localStorage.getItem(`points${thisCount}`);
  const scoreContainer = document.createElement("div");
  const score = document.createElement("p");
  const popScoreContainer = document.createElement("div");
  const upVoteButton = document.createElement("button");
  const downVoteButton = document.createElement("button");

  scoreContainer.className = "score-container";
  popScoreContainer.id = `popularity${thisCount}`;
  score.id = `score${thisCount}`;
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
    const data = await fetchKitten();
    const img = document.querySelector(`#kitten-img${thisCount}`);
    const url = await data[0].url;
    img.setAttribute("src", url);
    const comments = document.querySelectorAll(`#comments${thisCount} > li`);
    const commentBox = document.querySelector(`#comments${thisCount}`);
    points = 0;
    score.innerText = `Popularity Points: 0`;
    comments.forEach((comment) => comment.remove());
    localStorage.setItem(`points${thisCount}`, 0);
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

function fetchKitten() {
  return fetch("https://api.thecatapi.com/v1/images/search")
    .then((res) => res.json())
    .then((data) => data);
}
