import * as playerMatchStatService from '../api/services/playerMatchStat.service';
import * as eventService from '../api/services/event.service';

const GAME_EVENTS_COUNT = 35;

const EVENTS = [
  'goal',
  'assist',
  'missed_pass',
  'goal_conceded',
  'save',
  'yellow_card',
  'red_card'
];

const PLAYER_STATS = {
  goal: 'goals',
  assist: 'assists',
  missed_pass: 'missed_passes',
  goal_conceded: 'goals_conceded',
  save: 'saves',
  yellow_card: 'yellow_cards',
  red_card: 'red_cards'
};

const randomIndex = length => Math.floor(Math.random() * length);

export default async function generateEvents(game, hometeam, awayteam) {
  try {
    const players = [...hometeam, ...awayteam];

    for (let i = 0; i < GAME_EVENTS_COUNT; i++) {
      const randomEvent = EVENTS[randomIndex(EVENTS.length)];
      const randomPlayer = players[randomIndex(players.length)];

      // TODO add checking events connected with score
      const isGoalkeeperEvent =
        randomEvent === 'save' || randomEvent === 'goal_conceded';
      if (
        (randomPlayer.position === '1' && isGoalkeeperEvent) ||
        (randomPlayer.position !== '1' && !isGoalkeeperEvent)
      ) {
        await playerMatchStatService.updatePlayer(
          randomPlayer.id,
          game.id,
          PLAYER_STATS[randomEvent]
        );
 
        await eventService.createEvent(randomEvent, randomPlayer.id, game.id);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
