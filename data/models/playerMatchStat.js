export default  (orm, DataTypes) => {
  const PlayerMatchStat = orm.define(
    'playerMatchStat',
    {
      goals: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      assists: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      missedPasses: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      goalsConceded: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      saves: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      yellowCards: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      redCards: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return PlayerMatchStat;
};
