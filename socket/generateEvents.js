import {
  EventModel,
  PlayerStatModel,
  GameModel,
  PlayerMatchStatModel
} from '../data/models/index';

const events = [
  'goal',
  'assist',
  'missed_pass',
  'goal_conceded',
  'save',
  'yellow_card',
  'red_card'
];

function delay() {
  return new Promise(resolve => setTimeout(resolve, 5000));
}

const randomIndex = length => Math.floor(Math.random() * length);

export default async function generateEvents(socket) {
  try {
    // const team1 = await PlayerStatModel.findAll({ limit: 11 });
    // const team2 = await PlayerStatModel.findAll({ offset: 11, limit: 11 });
    // const players = [...team1, ...team2];
    const matchStats = await PlayerMatchStatModel.findAll();
    const game = await GameModel.findOne();

    // let randomPlayer = players[randomIndex(players.length)].id;

    for (let i = 0; i < 35; i++) {
      let randomEvent = events[randomIndex(events.length)];
      let randomMatchStats = matchStats[randomIndex(matchStats.length)].id;

      const recordToCreate = {
        event_type: randomEvent,
        player_id: randomMatchStats,
        game_id: game.id
      };
      await delay();
      const createdRecord = await EventModel.create(recordToCreate);
      socket.emit('someEvent', { createdRecord });
    }
  } catch (err) {
    console.log(err);
  }
}
