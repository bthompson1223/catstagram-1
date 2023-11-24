import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

export const initializeChat = () => {
  let user;
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
  let userNameContainer = document.createElement("div");
  let userName = document.createElement("input");
  const userButton = document.createElement("button");

  form.id = "chat-form";
  input.id = "chat-input";
  button.id = "chat-submit";
  userNameContainer.id = "username-container";
  userName.id = "username";
  userName.setAttribute("placeholder", "Enter a user name...");
  ul.id = "chat-box";
  chatContainer.id = "chat-container";
  formContainer.id = "form-container";
  titleContainer.id = "title-container";
  chatTitle.innerText = "Chat It Up!!!";
  form.setAttribute("autocomplete", "off");
  form.setAttribute("action", "/api");
  form.setAttribute("method", "POST");

  button.innerText = "Send";
  userButton.innerText = "Submit";

  userButton.addEventListener("click", async (e) => {
    e.stopPropagation();

    if (!localStorage.getItem("username")) {
      localStorage.setItem("username", userName.value);
      user = userName.value;
      const welcome = `Welcome ${user}!!!`;
      userNameContainer.innerHTML = `<h3>Welcome ${user}!!</h3>`;
      userName.remove();
      let fetchOptions = {
        //HTTP method set to POST.
        method: "POST",
        //Set the headers that specify you're sending a JSON body request and accepting JSON response
        headers: {
          "Content-Type": "application/json",
        },
        // POST request body as JSON string.
        body: JSON.stringify({ user }),
      };
      let resData = await fetch("/api/user", fetchOptions);
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = input.value;
    if (input.value) {
      socket.emit("chat message", input.value);
      input.value = "";
    }

    let formItem = e.currentTarget;
    let url = formItem.action;
    // console.log(formItem);

    try {
      /**
       * Takes all the form fields and make the field values
       * available through a `FormData` instance.
       */
      let formData = {
        message,
        user,
      };
      console.log(formData);

      /**
       * The `postFormFieldsAsJson()` function in the next step.
       */
      let responseData = await postFormFieldsAsJson({ url, formData });

      //Destructure the response data
      let { serverDataResponse } = responseData;

      //Display the response data in the console (for debugging)
      console.log("res", responseData);
    } catch (error) {
      //If an error occurs display it in the console (for debugging)
      console.error(error);
    }
  });

  socket.on("chat message", (msg) => {
    if (user) {
      const item = document.createElement("li");
      item.setAttribute("class", "chat-message");
      item.textContent = `${user}: ${msg}`;
      ul.appendChild(item);
    }

    chatContainer.scrollTop = chatContainer.scrollHeight;
  });

  userNameContainer.append(userName, userButton);
  titleContainer.appendChild(chatTitle);
  form.append(input, button);
  formContainer.append(form);
  chatContainer.append(titleContainer, ul, formContainer);
  windowContainer.append(userNameContainer, chatContainer);

  if (localStorage.getItem("username")) {
    user = localStorage.getItem("username");
    userNameContainer.innerHTML = `<h3>Welcome ${user}!!</h3>`;
    userName.remove();
  }
};

async function postFormFieldsAsJson({ url, formData }) {
  //Create an object from the form data entries
  // let formData = Object.fromEntries(formData);
  // Format the plain form data as JSON
  let formDataJsonString = JSON.stringify(formData);
  // console.log(formDataJsonString);

  //Set the fetch options (headers, body)
  let fetchOptions = {
    //HTTP method set to POST.
    method: "POST",
    //Set the headers that specify you're sending a JSON body request and accepting JSON response
    headers: {
      "Content-Type": "application/json",
    },
    // POST request body as JSON string.
    body: formDataJsonString,
  };
  console.log("Options =>", fetchOptions.body);

  //Get the response body as JSON.
  //If the response was not OK, throw an error.
  let res = await fetch(url, fetchOptions);

  //If the response is not ok throw an error (for debugging)
  if (!res.ok) {
    let error = await res.text();
    throw new Error(error);
  }
  //If the response was OK, return the response body.
  return res.json();
}
