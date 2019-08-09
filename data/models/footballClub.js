export default (orm, DataTypes) => {
  const FootballClub = orm.define(
    'footballClub',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      shortName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      win: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      loss: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      played: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return FootballClub;
};
