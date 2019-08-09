export default (orm, DataTypes) => {
  const Event = orm.define(
    'event',
    {
      timeStamp: {
        type: 'TIMESTAMP',
        defaultValue: orm.literal('CURRENT_TIMESTAMP'),
      },
      eventType: {
        allowNull: false,
        type: DataTypes.ENUM(
          'goal',
          'successful_pass',
          'shoot',
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
