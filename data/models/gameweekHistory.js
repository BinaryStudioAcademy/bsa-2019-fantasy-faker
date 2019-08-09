export default (orm, DataTypes) => {
  const GameweekHistory = orm.define(
    'gameweekHistory',
    {
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return GameweekHistory;
};
