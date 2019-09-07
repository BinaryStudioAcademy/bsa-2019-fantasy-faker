/* eslint-disable no-console */
import moment from "moment";
import schedule from "node-schedule";
import gameRepository from "./../data/repositories/game.repository";
import eventGenerator from "./../helpers/event-generator";
import eventGeneratorNoDelay from "./../helpers/event-generator-nodelay";

const gameScheduler = async io => {
  const nextGame = await gameRepository.getNext(); //moment().add(5, "seconds")

  schedule.scheduleJob(
    "next-game",
    /*date.format()*/ nextGame.start,
    async fireDate => {
      console.log(`>>> Game time! ${fireDate}`);
      const { hometeam_id, awayteam_id, id } = nextGame;
      const callback = () => {
        io.emit("update");
      };
      eventGenerator.initGame(
        { homeClub: hometeam_id, awayClub: awayteam_id, id },
        io,
        callback
      );

      gameScheduler();
    }
  );
  console.log(`>>> Next game scheduled on: ${nextGame.start}`);
};

export default gameScheduler;
