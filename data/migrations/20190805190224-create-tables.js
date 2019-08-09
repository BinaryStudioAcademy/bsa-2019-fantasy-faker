module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS pgcrypto;')
      .then(() =>
        queryInterface.sequelize.transaction(transaction =>
          Promise.all([
            queryInterface.createTable(
              'games',
              {
                id: {
                  allowNull: false,
                  autoIncrement: false,
                  primaryKey: true,
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.literal('gen_random_uuid()')
                },
                start: {
                  type: Sequelize.DATE
                },
                end: {
                  type: Sequelize.DATE
                },
                hometeamScore: {
                  allowNull: false,
                  type: Sequelize.FLOAT
                },
                awayteamScore: {
                  allowNull: false,
                  type: Sequelize.FLOAT
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
              },
              { transaction }
            ),
            queryInterface.createTable(
              'playerStats',
              {
                id: {
                  allowNull: false,
                  autoIncrement: false,
                  primaryKey: true,
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.literal('gen_random_uuid()')
                },
                firstName: {
                  allowNull: false,
                  type: Sequelize.STRING
                },
                secondName: {
                  allowNull: false,
                  type: Sequelize.STRING
                },
                playerPrice: {
                  allowNull: false,
                  type: Sequelize.FLOAT
                },
                playerScore: {
                  allowNull: false,
                  type: Sequelize.FLOAT
                },
                position: {
                  allowNull: false,
                  type: Sequelize.ENUM('1', '2', '3', '4')
                },
                goals: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                assists: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                missedPasses: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                goalsConceded: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                saves: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                yellowCards: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                redCards: {
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
              'playerMatchStats',
              {
                id: {
                  allowNull: false,
                  autoIncrement: false,
                  primaryKey: true,
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.literal('gen_random_uuid()')
                },
                goals: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                assists: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                missedPasses: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                goalsConceded: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                saves: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                yellowCards: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                redCards: {
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
              },
              { transaction }
            ),
            queryInterface.createTable(
              'events',
              {
                id: {
                  allowNull: false,
                  autoIncrement: false,
                  primaryKey: true,
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.literal('gen_random_uuid()')
                },
                timeStamp: {
                  type: Sequelize.DATE
                },
                eventType: {
                  allowNull: false,
                  type: Sequelize.ENUM(
                    'goal',
                    'successful_pass',
                    'shoot',
                    'save',
                    'yellow_card',
                    'red_card'
                  )
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
              },
              { transaction }
            ),
            queryInterface.createTable(
              'gameweeks',
              {
                id: {
                  allowNull: false,
                  autoIncrement: false,
                  primaryKey: true,
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.literal('gen_random_uuid()')
                },
                name: {
                  allowNull: false,
                  type: Sequelize.STRING
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
              'gameweekHistories',
              {
                id: {
                  allowNull: false,
                  autoIncrement: false,
                  primaryKey: true,
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.literal('gen_random_uuid()')
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
              },
              { transaction }
            ),
            queryInterface.createTable(
              'footballClubs',
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
                shortName: {
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
        queryInterface.dropTable('users', { transaction }),
        queryInterface.dropTable('games', { transaction }),
        queryInterface.dropTable('playerStats', { transaction }),
        queryInterface.dropTable('playerMatchStats', { transaction }),
        queryInterface.dropTable('events', { transaction }),
        queryInterface.dropTable('gameweek', { transaction }),
        queryInterface.dropTable('gameweekHistories', { transaction }),
        queryInterface.dropTable('leagues', { transaction }),
        queryInterface.dropTable('leagueParticipants', { transaction }),
        queryInterface.dropTable('seasons', { transaction }),
        queryInterface.dropTable('footballClubs', { transaction })
      ])
    )
};
