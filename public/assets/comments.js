export const comments = async (count) => {
  const thisCount = count;
  const commentContainer = document.createElement("div");
  const addContainer = document.createElement("div");
  const commentsBucket = document.createElement("div");
  const addComment = document.createElement("input");
  const comments = document.createElement("ol");
  const addButton = document.createElement("button");
  const kittenContainer = document.querySelector(
    `#kitten-container${thisCount}`
  );
  const first = document.createElement("li");

  addComment.type = "text";
  addComment.placeholder = "Add a comment...";
  addComment.className = "add-comment";
  addContainer.className = "add-container";
  addButton.innerText = "Add Comment";
  first.innerText = "FIRST!";
  commentContainer.className = "comments";
  comments.append(first);
  commentsBucket.appendChild(comments);
  commentContainer.append(addContainer, commentsBucket);
  kittenContainer.append(commentContainer);

  addButton.addEventListener("click", () => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    li.className = "comment";
    p.innerText = addComment.value;
    li.appendChild(p);
    console.log(addComment.value);
    // li.style.listStyle = "none";
    comments.appendChild(li);
    addComment.value = "";
  });
  addContainer.append(addComment, addButton);
};
