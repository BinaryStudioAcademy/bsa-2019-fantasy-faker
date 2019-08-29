export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize
      .query("CREATE EXTENSION IF NOT EXISTS pgcrypto;")
      .then(() =>
        queryInterface.sequelize.transaction(transaction =>
          Promise.all([
            queryInterface.createTable(
              "games",
              {
                id: {
                  allowNull: false,
                  autoIncrement: false,
                  primaryKey: true,
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.literal("gen_random_uuid()")
                },
                start: {
                  type: Sequelize.DATE
                },
                started: {
                  allowNull: false,
                  type: Sequelize.BOOLEAN
                },
                finished: {
                  allowNull: false,
                  type: Sequelize.BOOLEAN
                },
                minutes: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                hometeam_score: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                awayteam_score: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                gameweek_id: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },

                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
              },
              { transaction }
            ),
            queryInterface.createTable(
              "player_stats",
              {
                id: {
                  allowNull: false,
                  autoIncrement: false,
                  primaryKey: true,
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.literal("gen_random_uuid()")
                },
                first_name: {
                  allowNull: false,
                  type: Sequelize.STRING
                },
                second_name: {
                  allowNull: false,
                  type: Sequelize.STRING
                },
                player_price: {
                  allowNull: false,
                  type: Sequelize.FLOAT
                },
                player_score: {
                  allowNull: false,
                  type: Sequelize.FLOAT
                },
                position: {
                  allowNull: false,
                  type: Sequelize.ENUM("GKP", "DEF", "MID", "FWD")
                },
                goals: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                assists: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                missed_passes: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                goals_conceded: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                saves: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                yellow_cards: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                red_cards: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                code: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                injury: Sequelize.DATE,
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
              },
              { transaction }
            ),
            queryInterface.createTable(
              "player_match_stats",
              {
                id: {
                  allowNull: false,
                  autoIncrement: false,
                  primaryKey: true,
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.literal("gen_random_uuid()")
                },
                goals: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                assists: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                missed_passes: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                goals_conceded: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                saves: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                yellow_cards: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                red_cards: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                injury: Sequelize.DATE,
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
              },
              { transaction }
            ),
            queryInterface.createTable(
              "events",
              {
                id: {
                  allowNull: false,
                  autoIncrement: false,
                  primaryKey: true,
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.literal("gen_random_uuid()")
                },
                event_type: {
                  allowNull: false,
                  type: Sequelize.STRING
                },
                time: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
              },
              { transaction }
            ),
            queryInterface.createTable(
              "gameweeks",
              {
                id: {
                  allowNull: false,
                  autoIncrement: false,
                  primaryKey: true,
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.literal("gen_random_uuid()")
                },
                name: {
                  allowNull: false,
                  type: Sequelize.STRING
                },
                number: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                start: {
                  type: Sequelize.DATE
                },
                end: {
                  type: Sequelize.DATE
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
              },
              { transaction }
            ),
            queryInterface.createTable(
              "gameweek_histories",
              {
                id: {
                  allowNull: false,
                  autoIncrement: false,
                  primaryKey: true,
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.literal("gen_random_uuid()")
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
              },
              { transaction }
            ),
            queryInterface.createTable(
              "football_clubs",
              {
                id: {
                  allowNull: false,
                  autoIncrement: true,
                  primaryKey: true,
                  type: Sequelize.INTEGER
                },
                name: {
                  allowNull: false,
                  type: Sequelize.STRING
                },
                short_name: {
                  allowNull: false,
                  type: Sequelize.STRING
                },
                win: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                loss: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                played: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                code: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
              },
              { transaction }
            ),
            queryInterface.createTable(
              "team_member_histories",
              {
                id: {
                  allowNull: false,
                  autoIncrement: false,
                  primaryKey: true,
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.literal("gen_random_uuid()")
                },
                is_on_bench: {
                  allowNull: false,
                  type: Sequelize.BOOLEAN
                },
                is_captain: {
                  allowNull: false,
                  type: Sequelize.BOOLEAN
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
              },
              { transaction }
            ),
            queryInterface.createTable(
              "seasons",
              {
                id: {
                  allowNull: false,
                  autoIncrement: false,
                  primaryKey: true,
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.literal("gen_random_uuid()")
                },
                name: {
                  allowNull: false,
                  type: Sequelize.STRING
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
              },
              { transaction }
            )
          ])
        )
      ),

  down: queryInterface =>
    queryInterface.sequelize.transaction(transaction =>
      Promise.all([
        queryInterface.dropTable("games", { transaction }),
        queryInterface.dropTable("player_stats", { transaction }),
        queryInterface.dropTable("player_match_stats", { transaction }),
        queryInterface.dropTable("events", { transaction }),
        queryInterface.dropTable("gameweeks", { transaction }),
        queryInterface.dropTable("gameweek_histories", { transaction }),
        queryInterface.dropTable("football_clubs", { transaction }),
        queryInterface.dropTable("team_member_histories", { transaction }),
        queryInterface.dropTable("seasons", { transaction })
      ])
    )
};
