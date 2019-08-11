export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(transaction =>
      Promise.all([
        queryInterface.addColumn(
          'player_stats',
          'club_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'football_clubs',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'games',
          'hometeam_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'football_clubs',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'games',
          'awayteam_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'football_clubs',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'games',
          'game_event_id',
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
          'games',
          'gameweek_id',
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
          'gameweek_histories',
          'gameweek_active_id',
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
          'gameweek_histories',
          'team_player_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'player_stats',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'gameweek_histories',
          'team_captain_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'player_stats',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'events',
          'player_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'player_match_stats',
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
        queryInterface.removeColumn('player_stats', 'club_id', { transaction }),
        queryInterface.removeColumn('games', 'hometeam_id', { transaction }),
        queryInterface.removeColumn('games', 'awayteam_id', { transaction }),
        queryInterface.removeColumn('games', 'game_event_id', { transaction }),
        queryInterface.removeColumn('gameweeks', 'game_id', { transaction }),
        queryInterface.removeColumn('gameweek_histories', 'gameweek_active_id', {
          transaction
        }),
        queryInterface.removeColumn('gameweek_histories', 'team_player_id', {
          transaction
        }),
        queryInterface.removeColumn('gameweek_histories', 'team_captain_id', {
          transaction
        }),
        queryInterface.removeColumn('events', 'player_id', { transaction })
      ])
    )
};
