import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

export const initializeChat = () => {
  const socket = io();

  const form = document.createElement("form");
  const input = document.createElement("input");
  const button = document.createElement("button");
  const ul = document.createElement("ul");
};
