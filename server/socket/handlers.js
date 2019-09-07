import eventGenerator from "../helpers/event-generator";

export default socket => {
  console.log("Socket connection established");

  // Update db
  socket.emit("update");

  // Update status of game
  socket.emit("status", eventGenerator.checkStatus());

  socket.on("status", () => {
    socket.emit("status", eventGenerator.checkStatus());
  });

  socket.on("createRoom", roomId => {
    socket.join(roomId);
  });
  socket.on("leaveRoom", roomId => {
    socket.leave(roomId);
  });
  socket.on("simulate", props => {
    console.log("simulate request");
    eventGenerator.initGame({ ...props, isSimulation: true }, socket);
  });

  socket.on("stopSimulation", () => {
    console.log("stop simulation request");
    eventGenerator.stopGame();
  });
};
