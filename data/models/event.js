export default (orm, DataTypes) => {
  const Event = orm.define(
    'event',
    {
      timeStamp: DataTypes.DATE,
      eventType: {
        allowNull: false,
        type: DataTypes.ENUM(
          'goal',
          'assist',
          'missed_pass',
          'goal_conceded',
          'save',
          'yellow_card',
          'red_card'
        )
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return Event;
};
