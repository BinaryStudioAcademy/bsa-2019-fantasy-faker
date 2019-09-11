/* eslint-disable no-console */
import moment from "moment";
import schedule from "node-schedule";
import gameRepository from "./../data/repositories/game.repository";
import eventGenerator from "./../helpers/event-generator";
import eventGeneratorNoDelay from "./../helpers/event-generator-nodelay";

const gameScheduler = async io => {
  const nextGame = await gameRepository.getNext();

  // // for test purposes
  //
  // const nextGame = {
  //   hometeam_id: 1,
  //   awayteam_id: 2,
  //   id: 3,
  //   isSimulation: true,
  //   start: moment()
  //     .add(5, "seconds")
  //     .format()
  // };

  schedule.scheduleJob("next-game", nextGame.start, async fireDate => {
    console.log(`>>> Game time! ${fireDate}`);
    const { hometeam_id, awayteam_id, id, isSimulation } = nextGame;
    const callback = () => {
      io.emit("update");
    };
    eventGenerator.initGame(
      { homeClub: hometeam_id, awayClub: awayteam_id, id, isSimulation },
      io,
      callback
    );

    gameScheduler(io);
  });
  console.log(`>>> Next game scheduled on: ${nextGame.start}`);
};

export default gameScheduler;
