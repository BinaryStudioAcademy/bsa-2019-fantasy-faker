export default (models) => {
  const {
    PlayerStat,
    PlayerMatchStat,
    Gameweek,
    GameweekHistory,
    Game,
    FootballClub,
    Event: MyEvent
  } = models;

  // Game.hasMany(FootballClub)
  // Game.hasMany(Gameweek);

  // PlayerMatchStat.hasMany(MyEvent);
  // MyEvent.hasMany(Game);

  // PlayerStat.hasMany(GameweekHistory);

  // FootballClub.hasMany(PlayerStat);
  // FootballClub.hasMany(Game);

  // Gameweek.hasMany(GameweekHistory);
};
