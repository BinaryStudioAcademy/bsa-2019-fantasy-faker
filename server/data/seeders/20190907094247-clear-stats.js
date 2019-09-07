"use strict";

export default {
  up: (queryInterface, Sequelize) => {
    const nulledData = {
      player_score: 0,
      goals: 0,
      assists: 0,
      missed_passes: 0,
      goals_conceded: 0,
      saves: 0,
      yellow_cards: 0,
      red_cards: 0,
      transfers_in: 0,
      transfers_out: 0
    };
    return queryInterface.bulkUpdate("player_stats", nulledData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("player_stats", null, {});
  }
};
