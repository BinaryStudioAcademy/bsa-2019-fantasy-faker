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
      hometeamScore: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      awayteamScore: {
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
