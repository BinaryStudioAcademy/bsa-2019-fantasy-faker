import eventGenerator from "../helpers/event-generator";
import gameweekGenerator from '../helpers/gameweek-generator.js';

export default socket => {
  console.log("Socket connection established");
  gameweekGenerator.setEvents(socket);

  // delete next block after test
  // const props = {
  // homeClubId: 2,
  // awayClubId: 3,
  // timeout: 10
  // };
  // eventGenerator.initGame(props, socket);

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
