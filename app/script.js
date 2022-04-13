const messageInput = document.querySelector("#message-input");
const roomInput = document.querySelector("#room-input");
const form = document.querySelector("#form");

const socket = io("http://localhost:3000/comminity/12/livechat");

socket.on("connect", () => {
  displayMessage(`"You connected with: ${socket.id}`);
});
socket.on("pass-message", (message) => {
  displayMessage(message);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = 12;

  if (message === "") return;
  displayMessage(message);
  socket.emit("send-message", message, room);

  messageInput.value = "";
});

joinRoomButton.addEventListener("click", () => {
  const room = 12;
  socket.emit("join-chat", room, (message) => {
    displayMessage(message);
  });
});

function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.querySelector("#message-container").append(div);
}

let count = 0;
setInterval(() => {
  socket.volatile.emit("test-connection", count++);
}, 1000);
