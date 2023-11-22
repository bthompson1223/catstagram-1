import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

export const initializeChat = () => {
  const socket = io();

  const form = document.createElement("form");
  const input = document.createElement("input");
  const button = document.createElement("button");
  const ul = document.createElement("ul");
  const chatContainer = document.createElement("div");
  const windowContainer = document.getElementById("window-container");
  const formContainer = document.createElement("div");
  const chatTitle = document.createElement("h2");
  const titleContainer = document.createElement("div");

  form.id = "chat-form";
  input.id = "chat-input";
  button.id = "chat-submit";
  ul.id = "chat-box";
  chatContainer.id = "chat-container";
  formContainer.id = "form-container";
  titleContainer.id = "title-container";
  chatTitle.innerText = "Chat It Up!!!";

  button.innerText = "Send";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
      socket.emit("chat message", input.value);
      input.value = "";
    }
  });

  socket.on("chat message", (msg) => {
    const item = document.createElement("li");
    item.setAttribute("class", "chat-message");
    item.textContent = msg;
    ul.appendChild(item);

    chatContainer.scrollTop = chatContainer.scrollHeight;
  });

  titleContainer.appendChild(chatTitle);
  form.append(input, button);
  formContainer.append(form);
  chatContainer.append(titleContainer, ul, formContainer);
  windowContainer.appendChild(chatContainer);
};
