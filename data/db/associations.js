export default models => {
  const {
    PlayerStat,
    PlayerMatchStat,
    Gameweek,
    GameweekHistory,
    Game,
    FootballClub,
    Event,
    TeamMemberHistory,
    Seasons
  } = models;

  TeamMemberHistory.belongsTo(PlayerStat, {
    foreignKey: 'player_id',
    as: 'player_stats'
  });

  // You can use templates below to test associations (run npm start)

  // TeamMemberHistory.findOne({
  //   where: { is_captain: true },
  //   include: 'player_stats'
  // }).then(teamMember => {
  //   console.log(teamMember);
  // });
};
