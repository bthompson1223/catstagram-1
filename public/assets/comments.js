export const comments = async (count) => {
  const thisCount = count;
  let thatCount = count;
  const commentContainer = document.createElement("div");
  const addContainer = document.createElement("div");
  const commentsBucket = document.createElement("div");
  const addComment = document.createElement("input");
  const comments = document.createElement("ol");
  const addButton = document.createElement("button");
  const kittenContainer = document.querySelector(
    `#kitten-container${thisCount}`
  );

  addComment.type = "text";
  addComment.placeholder = "Add a comment...";
  addComment.className = "add-comment";
  addContainer.className = "add-container";
  addButton.innerText = "Add Comment";

  comments.id = `comments${thisCount}`;
  commentContainer.className = "comments";
  commentsBucket.appendChild(comments);
  commentContainer.append(addContainer, commentsBucket);
  kittenContainer.append(commentContainer);

  addButton.addEventListener("click", addButtonEvent);
  if (localStorage.getItem(`comments${thisCount}`)) {
    let oldComments = localStorage.getItem(`comments${thisCount}`);
    let oldCommentsArr = oldComments.split(",");
    oldCommentsArr.forEach((comment) => {
      if (comment) appendOldComments(comment);
    });
  } else localStorage.setItem(`comments${thisCount}`, "");

  addContainer.append(addComment, addButton);
  function addButtonEvent() {
    const li = document.createElement("li");
    const p = document.createElement("p");
    const deleteComment = document.createElement("button");
    deleteComment.innerText = "Delete Comment";
    deleteComment.id = `delete${thatCount}`;
    li.id = `comment${thatCount}`;
    li.className = "comment";
    p.innerText = addComment.value;
    li.appendChild(p);
    p.appendChild(deleteComment);
    // li.style.listStyle = "none";
    comments.appendChild(li);
    addComment.value = "";
    let com = p.innerText;
    let storage = localStorage.getItem(`comments${thisCount}`);
    let final;
    if (com) final = storage.concat(`,${com}`);
    localStorage.setItem(`comments${thisCount}`, final);
    deleteComment.addEventListener("click", () => {
      let deleted = document.getElementById(li.id);
      if (localStorage.getItem(`comments${thisCount}`)) {
        let newCom = localStorage.getItem(`comments${thisCount}`).split(",");
        for (let i = 0; i < newCom.length; i++) {
          console.log(newCom);
          if (newCom[i].id === li.id) {
            newCom.splice(i, 1);
          }
        }
      }
      deleted.remove();
    });
    thatCount++;
  }

  function appendOldComments(value) {
    const li = document.createElement("li");
    const p = document.createElement("p");
    const deleteComment = document.createElement("button");
    deleteComment.innerText = "Delete Comment";
    deleteComment.id = `delete${thatCount}`;
    li.id = `comment${thatCount}`;
    li.className = "comment";
    let valArr = value.split("D");
    console.log(valArr);
    for (let i = 0; i < valArr.length; i++) {
      if (valArr[i] !== "elete Comment") {
        p.innerText += `${valArr[i]} `;
        console.log(p.innerText);
        console.log(valArr[i]);
      }
    }
    li.appendChild(p);
    p.appendChild(deleteComment);
    // li.style.listStyle = "none";
    comments.appendChild(li);
    addComment.value = "";
    deleteComment.addEventListener("click", () => {
      let deleted = document.getElementById(li.id);
      if (localStorage.getItem(`comments${thisCount}`)) {
        let newCom = localStorage.getItem(`comments${thisCount}`).split(",");
        for (let i = 0; i < newCom.length; i++) {
          if (newCom[i].id === li.id) newCom.splice(i, 1);
        }
      }
      deleted.remove();
    });
    thatCount++;
  }
};
