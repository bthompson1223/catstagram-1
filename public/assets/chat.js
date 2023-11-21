import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

export const initializeChat = () => {
  const socket = io();

  const form = document.createElement("form");
  const input = document.createElement("input");
  const button = document.createElement("button");
  const ul = document.createElement("ul");
  const chatContainer = document.createElement("div");
  const windowContainer = document.getElementById("window-container");

  form.id = "chat-form";
  input.id = "chat-input";
  button.id = "chat-submit";
  ul.id = "chat-box";

  button.innerText = "Send";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
      socket.emit("chat message", input.value);
      input.value = "";
    }
  });

  form.append(input, button);
  chatContainer.append(ul, form);
  windowContainer.appendChild(chatContainer);
};
