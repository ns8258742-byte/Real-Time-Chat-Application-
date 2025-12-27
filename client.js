const socket = io();
const username = localStorage.getItem("username");

socket.emit("join", username);

const msgInput = document.getElementById("msg");
const messages = document.getElementById("messages");
const typing = document.getElementById("typing");

msgInput.addEventListener("input", () => {
  socket.emit("typing", username);
});

socket.on("typing", (user) => {
  typing.innerText = user + " is typing...";
  setTimeout(() => typing.innerText = "", 1000);
});

function sendMessage() {
  const msg = msgInput.value;
  if(msg.trim() !== "") {
    socket.emit("chatMessage", msg);
    msgInput.value = "";
  }
}

socket.on("chatMessage", (data) => {
  const div = document.createElement("div");
  div.innerHTML = <b>${data.user}</b>: ${data.message} <small>${data.time}</small>;
  messages.appendChild(div);
});

socket.on("userList", (users) => {
  const ul = document.getElementById("users");
  ul.innerHTML = "";
  users.forEach(u => {
    const li = document.createElement("li");
    li.innerText = u;
    ul.appendChild(li);
  });
});