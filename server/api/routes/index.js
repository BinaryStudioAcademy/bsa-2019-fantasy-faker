import testRoutes from './test.routes';
import footballClubRoutes from './footballClub.routes';
import eventRoutes from './event.routes';
import gameRoutes from './game.routes';
import gameweekRoutes from './gameweek.routes';
import gameweekHistoryRoutes from './gameweekHistory.routes';
import playerMatchStatRoutes from './playerMatchStat.routes';
import playerStatRoutes from './playerStat.routes';

// register all routes
export default (app) => {
  app.use('/api/test', testRoutes);
  app.use('/api/clubs', footballClubRoutes);
  app.use('/api/events', eventRoutes);
  app.use('/api/games', gameRoutes);
  app.use('/api/gameweeks', gameweekRoutes);
  app.use('/api/gameweekhistory', gameweekHistoryRoutes);
  app.use('/api/playermatchstats', playerMatchStatRoutes);
  app.use('/api/playerstats', playerStatRoutes);
};
