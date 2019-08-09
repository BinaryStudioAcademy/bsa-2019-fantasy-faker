import orm from '../db/connection';
import associate from '../db/associations';

const User = orm.import('./user');
const Season = orm.import('./season');
const PlayerStat = orm.import('./playerStat');
const PlayerMatchStat = orm.import('./playerMatchStat');
const League = orm.import('./league');
const LeagueParticipant = orm.import('./leagueParticipant');
const Gameweek = orm.import('./gameweek');
const GameweekHistory = orm.import('./gameweekHistory');
const Game = orm.import('./game');
const FootballClub = orm.import('./footballClub');
const Event = orm.import('./event');

associate({
    User,
    Season,
    PlayerStat,
    PlayerMatchStat,
    League,
    LeagueParticipant,
    Gameweek,
    GameweekHistory,
    Game,
    FootballClub,
    Event
});
