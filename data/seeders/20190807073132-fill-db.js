import playersSeed from '../seed-data/playerStats.seed';
import footballClubsSeed from '../seed-data/footballClubs.seed';
import playerMatchSeed from '../seed-data/playerMatchStats.seed';
import eventsSeed from '../seed-data/events.seed';
import gamesSeed from '../seed-data/games.seed';
import gameweeksSeed from '../seed-data/gameweeks.seed';
import gameweekHistoriesSeed from '../seed-data/gameweekHistories.seed';
import seasonsSeed from '../seed-data/seasons.seed';
import teamMemberHistoriesSeed from '../seed-data/teamMemberHistories.seed';

const randomIndex = length => Math.floor(Math.random() * length);

export default {
  up: async (queryInterface, Sequelize) => {
    try {
      let seedsData;
      const options = {
        type: Sequelize.QueryTypes.SELECT
      };

      seedsData = await footballClubsSeed;
      await queryInterface.bulkInsert('football_clubs', seedsData, {});
      const footballClubs = await queryInterface.sequelize.query(
        'SELECT id FROM "football_clubs";',
        options
      );

      seedsData = await playersSeed;
      await queryInterface.bulkInsert('player_stats', seedsData, {});
      const playerStats = await queryInterface.sequelize.query(
        'SELECT id FROM "player_stats";',
        options
      );

      await queryInterface.bulkInsert('player_match_stats', playerMatchSeed, {});
      const playerMatchStats = await queryInterface.sequelize.query(
        'SELECT id FROM "player_match_stats";',
        options
      );

      await queryInterface.bulkInsert('seasons', seasonsSeed, {});
      const seasons = await queryInterface.sequelize.query(
        'SELECT id FROM "seasons";',
        options
      );

      const gameweeksMapSeeds = gameweeksSeed.map(week => ({
        ...week,
        season_id: seasons[randomIndex(seasons.length)].id
      }));

      await queryInterface.bulkInsert('gameweeks', gameweeksMapSeeds);
      const gameweeks = await queryInterface.sequelize.query(
        'SELECT id FROM "gameweeks";',
        options
      );

      const gameMappedSeeds = gamesSeed.map(game => ({
        ...game,
        hometeam_id: footballClubs[randomIndex(footballClubs.length)].id,
        awayteam_id: footballClubs[randomIndex(footballClubs.length)].id,
        gameweek_id: gameweeks[randomIndex(gameweeks.length)].id
      }));

      await queryInterface.bulkInsert('games', gameMappedSeeds, {});
      const games = await queryInterface.sequelize.query(
        'SELECT id FROM "games";',
        options
      );

      const eventMappedSeeds = eventsSeed.map(event => ({
        ...event,
        player_id: playerMatchStats[randomIndex(playerMatchStats.length)].id,
        game_id: games[randomIndex(games.length)].id
      }));

      await queryInterface.bulkInsert('events', eventMappedSeeds, {});

      const gameweekHistoryMappedSeeds = gameweekHistoriesSeed.map(history => ({
        ...history,
        gameweek_id: gameweeks[randomIndex(gameweeks.length)].id
      }));

      await queryInterface.bulkInsert(
        'gameweek_histories',
        gameweekHistoryMappedSeeds,
        {}
      );
      const gameweekHistories = await queryInterface.sequelize.query(
        'SELECT id FROM "gameweek_histories";',
        options
      );

      const teamMemberHistoriesMappedSeeds = teamMemberHistoriesSeed.map(member => ({
        ...member,
        player_id: playerStats[randomIndex(playerStats.length)].id,
        gameweek_history_id: gameweekHistories[randomIndex(gameweekHistories.length)].id
      }));

      await queryInterface.bulkInsert(
        'team_member_histories',
        teamMemberHistoriesMappedSeeds,
        {}
      );
    } catch (err) {
      console.log(`Seeding error: ${err}`);
    }
  },

  down: async queryInterface => {
    try {
      await queryInterface.bulkDelete('events', null, {});
      await queryInterface.bulkDelete('football_clubs', null, {});
      await queryInterface.bulkDelete('games', null, {});
      await queryInterface.bulkDelete('gameweek_histories', null, {});
      await queryInterface.bulkDelete('gameweeks', null, {});
      await queryInterface.bulkDelete('player_match_stats', null, {});
      await queryInterface.bulkDelete('player_stats', null, {});
      await queryInterface.bulkDelete('team_member_histories', null, {});
      await queryInterface.bulkDelete('seasons', null, {});
    } catch (err) {
      console.log(`Seeding error: ${err}`);
    }
  }
};
