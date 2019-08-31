import orm from '../db/connection';
import associate from '../db/associations';

const PlayerStat = orm.import('./playerStat');
const PlayerMatchStat = orm.import('./playerMatchStat');
const Gameweek = orm.import('./gameweek');
const GameweekHistory = orm.import('./gameweekHistory');
const Game = orm.import('./game');
const FootballClub = orm.import('./footballClub');
const Event = orm.import('./event');
const Season = orm.import('./season');
const TeamMemberHistory = orm.import('./teamMemberHistory');

associate({
  PlayerStat,
  PlayerMatchStat,
  Gameweek,
  GameweekHistory,
  Game,
  FootballClub,
  Event,
  Season,
  TeamMemberHistory
});

export {
  PlayerStat as PlayerStatModel,
  PlayerMatchStat as PlayerMatchStatModel,
  Gameweek as GameweekModel,
  GameweekHistory as GameweekHistoryModel,
  Game as GameModel,
  FootballClub as FootballClubModel,
  Event as EventModel,
  Season as SeasonModel,
  TeamMemberHistory as TeamMemberHistoryModel
};