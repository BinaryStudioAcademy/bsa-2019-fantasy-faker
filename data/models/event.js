export default (orm, DataTypes) => {
  const Event = orm.define(
    "event",
    {
      event_type: {
        allowNull: false,
        type: DataTypes.STRING
      },
      time: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return Event;
};
