export default (orm, DataTypes) => {
  const Player_stat = orm.define(
    'playerStat',
    {
      firstName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      secondName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      playerPrice: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      playerScore: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      position: {
        allowNull: false,
        type: DataTypes.ENUM('1', '2', '3', '4')
      },
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
      code: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return PlayerStat;
};
