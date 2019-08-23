import {
  EventModel,
  PlayerStatModel,
  GameModel,
  PlayerMatchStatModel
} from '../data/models/index';

const GAME_EVENTS_COUNT = 1;

const events = [
  'goal',
  'assist',
  'missed_pass',
  'goal_conceded',
  'save',
  'yellow_card',
  'red_card'
];

// function delay() {
//   return new Promise(resolve => setTimeout(resolve, 5000));
// }

const randomIndex = length => Math.floor(Math.random() * length);

export default async function generateEvents(socket, game, hometeam, awayteam) {
  try {
    const players = [...hometeam, ...awayteam];
    // find needed match stats
    // const matchStats = await PlayerMatchStatModel.findAll();

    let randomPlayer = players[randomIndex(players.length)].id;

    for (let i = 0; i < GAME_EVENTS_COUNT; i++) {
      let randomEvent = events[randomIndex(events.length)];
      let randomMatchStats = matchStats[randomIndex(matchStats.length)].id;

      const recordToCreate = {
        event: randomEvent,
        player_match_stats_id: randomMatchStats,
        game_id: game.id
      };
      // await delay();
      // const createdRecord = await EventModel.create(recordToCreate);
      socket.emit('someEvent', { createdRecord });
    }
  } catch (err) {
    console.log(err);
  }
}
