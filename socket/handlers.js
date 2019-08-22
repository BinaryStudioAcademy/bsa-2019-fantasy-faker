import eventGenerator from "../helpers/event-generator";

export default socket => {
  console.log("Socket connection established");

  // delete next block after test

  const props = {
    homeClubId: 2,
    awayClubId: 3,
    timeout: 3
  };
  eventGenerator.initGame(props, socket);

  socket.on("createRoom", roomId => {
    socket.join(roomId);
  });
  socket.on("leaveRoom", roomId => {
    socket.leave(roomId);
  });
  socket.on("simulate", props => {
    console.log("simulate request");
    eventGenerator.initGame(props, socket);
  });

  socket.on("stop-simulation", () => {
    console.log("stop simulation request");
    eventGenerator.stopGame();
  });
};
