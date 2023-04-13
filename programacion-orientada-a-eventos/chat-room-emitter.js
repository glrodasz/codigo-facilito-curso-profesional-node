const EventEmitter = require("events");

class ChatRoom extends EventEmitter {
  join(user) {
    console.log(`${user} joined the chat room`);
    this.emit("join", user);
  }

  sendMessage(user, message) {
    console.log(`${user} sent a message: ${message}`);
    this.emit("message", user, message);
  }
}

const chatRoom = new ChatRoom();

chatRoom.on("join", (user) => {
  console.log(`Welcome ${user}!`);
});

chatRoom.on("message", (user, message) => {
  console.log(`New message from ${user}: ${message}`);
});


chatRoom.join("John");
chatRoom.join("Jane");
chatRoom.sendMessage("John", "Hello World!");
chatRoom.sendMessage("Jane", "Hello John!");