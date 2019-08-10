const now = new Date();

export default [
  {
    home_team_score: 23,
    away_team_score: 12
  },
  {
    home_team_score: 21,
    away_team_score: 20
  },
  {
    home_team_score: 13,
    away_team_score: 19
  }
].map(game => ({
  ...game,
  start: now,
  end: now,
  createdAt: now,
  updatedAt: now
}));
