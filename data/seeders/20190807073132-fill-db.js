import playersSeed from '../seed-data/playerStats.seed';
import footballClubsSeed from '../seed-data/footballClubs.seed';
import playerMatchSeed from '../seed-data/playerMatchStats.seed';
import eventsSeed from '../seed-data/events.seed';
import gamesSeed from '../seed-data/games.seed';
import gameweeksSeed from '../seed-data/gameweeks.seed';
import gameweekHistoriesSeed from '../seed-data/gameweekHistories.seed';

const randomIndex = length => Math.floor(Math.random() * length);

export default {
  up: async (queryInterface, Sequelize) => {
    try {
      let seedsData;
      const options = {
        type: Sequelize.QueryTypes.SELECT
      };

      seedsData = await footballClubsSeed;
      await queryInterface.bulkInsert('footballClubs', seedsData, {});
      const footballClubs = await queryInterface.sequelize.query(
        'SELECT id FROM "footballClubs";',
        options
      );

      seedsData = await playersSeed;
      await queryInterface.bulkInsert('playerStats', seedsData, {});
      const playerStats = await queryInterface.sequelize.query(
        'SELECT id FROM "playerStats";',
        options
      );

      await queryInterface.bulkInsert(
        'playerMatchStats',
        playerMatchSeed,
        {}
      );
      const playerMatchStats = await queryInterface.sequelize.query(
        'SELECT id FROM "playerMatchStats";',
        options
      );

      const eventMappedSeeds = eventsSeed.map((event, i) => ({
        ...event,
        playerId:
          playerMatchStats[randomIndex(playerMatchStats.length)].id
      }));

      await queryInterface.bulkInsert('events', eventMappedSeeds, {});
      const events = await queryInterface.sequelize.query(
        'SELECT id FROM "events";',
        options
      );

      const gameMappedSeeds = gamesSeed.map((game, i) => ({
        ...game,
        hometeamId:
          footballClubs[randomIndex(footballClubs.length)].id,
        awayteamId:
          footballClubs[randomIndex(footballClubs.length)].id,
        gameEventId: events[randomIndex(events.length)].id
      }));

      await queryInterface.bulkInsert('games', gameMappedSeeds, {});
      const games = await queryInterface.sequelize.query(
        'SELECT id FROM "games";',
        options
      );

      const gameweekMappedSeeds = gameweeksSeed.map(gameweek => ({
        ...gameweek,
        gameId: games[randomIndex(games.length)].id
      }));

      await queryInterface.bulkInsert(
        'gameweeks',
        gameweekMappedSeeds,
        {}
      );
      const gameweeks = await queryInterface.sequelize.query(
        'SELECT id FROM "gameweeks";',
        options
      );

      const gameweekHistoryMappedSeeds = gameweekHistoriesSeed.map(
        history => ({
          ...history,
          gameweekActiveId:
            gameweeks[randomIndex(gameweeks.length)].id,
          teamPlayerId:
            playerStats[randomIndex(playerStats.length)].id,
          teamCaptainId:
            playerStats[randomIndex(playerStats.length)].id
        })
      );

      await queryInterface.bulkInsert(
        'gameweekHistories',
        gameweekHistoryMappedSeeds,
        {}
      );
    } catch (err) {
      console.log(`Seeding error: ${err}`);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('events', null, {});
      await queryInterface.bulkDelete('footballClubs', null, {});
      await queryInterface.bulkDelete('games', null, {});
      await queryInterface.bulkDelete('gameweekHistories', null, {});
      await queryInterface.bulkDelete('gameweeks', null, {});
      await queryInterface.bulkDelete('playerMatchStats', null, {});
      await queryInterface.bulkDelete('playerStats', null, {});
    } catch (err) {
      console.log(`Seeding error: ${err}`);
    }
  }
};
