module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(transaction =>
      Promise.all([
        queryInterface.addColumn(
          'playerStats',
          'clubId',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'footballClubs',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'games',
          'hometeamId',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'footballClubs',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'games',
          'awayteamId',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'footballClubs',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'games',
          'gameEventId',
          {
            type: Sequelize.UUID,
            references: {
              model: 'events',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'gameweeks',
          'gameId',
          {
            type: Sequelize.UUID,
            references: {
              model: 'games',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'gameweekHistories',
          'gameweekActiveId',
          {
            type: Sequelize.UUID,
            references: {
              model: 'gameweeks',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'gameweekHistories',
          'teamPlayerId',
          {
            type: Sequelize.UUID,
            references: {
              model: 'playerStats',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'gameweekHistories',
          'teamCaptainId',
          {
            type: Sequelize.UUID,
            references: {
              model: 'playerStats',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'events',
          'playerId',
          {
            type: Sequelize.UUID,
            references: {
              model: 'playerMatchStats',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        )
      ])
    ),

  down: queryInterface =>
    queryInterface.sequelize.transaction(transaction =>
      Promise.all([
        queryInterface.removeColumn('playerStats', 'clubId', { transaction }),
        queryInterface.removeColumn('games', 'hometeamId', { transaction }),
        queryInterface.removeColumn('games', 'awayteamId', { transaction }),
        queryInterface.removeColumn('games', 'gameEventId', { transaction }),
        queryInterface.removeColumn('gameweeks', 'gameId', { transaction }),
        queryInterface.removeColumn('gameweekHistories', 'gameweekActiveId', {
          transaction
        }),
        queryInterface.removeColumn('gameweekHistories', 'teamPlayerId', {
          transaction
        }),
        queryInterface.removeColumn('gameweekHistories', 'teamCaptainId', {
          transaction
        }),
        queryInterface.removeColumn('events', 'playerId', { transaction }),
      ])
    )
};
