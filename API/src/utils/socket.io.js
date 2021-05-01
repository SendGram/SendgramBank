const socketio = require("socket.io");
const io = socketio();
io.listen(8080);
let users = {};

module.exports = {
  sendToUser: (userEmail, event, message) => {
    io.to(users[userEmail]).emit(event, message);
  },
  on: (event, callback) => {
    io.on(event, callback);
  },
  addUser: (userEmail, socketId) => {
    console.log(userEmail);
    users[userEmail] = socketId;
  },
};
