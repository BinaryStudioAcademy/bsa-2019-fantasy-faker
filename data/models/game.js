export default (orm, DataTypes) => {
  const Game = orm.define(
    "game",
    {
      start: {
        type: DataTypes.DATE
      },
      end: {
        type: DataTypes.DATE
      },
      home_team_score: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      away_team_score: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return Game;
};
