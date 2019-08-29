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

  Event.belongsTo(Game, { foreignKey: 'game_id', as: 'games' });
  Event.belongsTo(PlayerMatchStat, {
    foreignKey: 'player_match_stat_id',
    as: 'player'   
  });

  Game.belongsTo(FootballClub, { foreignKey: 'hometeam_id', as: 'hometeam' });
  Game.belongsTo(FootballClub, { foreignKey: 'awayteam_id', as: 'awayteam' });
  
  Gameweek.hasMany(Game, { foreignKey: 'gameweek_id', as: 'games' });

  FootballClub.hasMany(PlayerStat, {
    foreignKey: 'club_id',
    as: 'player_stats'
  })

  PlayerMatchStat.belongsTo(PlayerStat, { foreignKey: 'player_id', as: 'player' });
  PlayerMatchStat.belongsTo(Game, { foreignKey: 'game_id', as: 'game' });

  // You can use templates below to test associations (run npm start)

  // TeamMemberHistory.findOne({
  //   where: { is_captain: true },
  //   include: 'player_stats'
  // }).then(teamMember => {
  //   console.log(teamMember);
  // });
};
