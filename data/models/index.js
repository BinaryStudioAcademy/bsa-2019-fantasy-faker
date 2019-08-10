import orm from '../db/connection';
import associate from '../db/associations';

const PlayerStat = orm.import('./playerStat');
const PlayerMatchStat = orm.import('./playerMatchStat');
const Gameweek = orm.import('./gameweek');
const GameweekHistory = orm.import('./gameweekHistory');
const Game = orm.import('./game');
const FootballClub = orm.import('./footballClub');
const Event = orm.import('./event');

associate({
    PlayerStat,
    PlayerMatchStat,
    Gameweek,
    GameweekHistory,
    Game,
    FootballClub,
    Event
});

export {
    PlayerStat as PlayerStatModel,
    PlayerMatchStat as PlayerMatchStatModel,
    Gameweek as GameweekModel,
    GameweekHistory as GameweekHistory,
    Game as GameModel,
    FootballClub as FootballClubModel,
    Event as EventModel
};
