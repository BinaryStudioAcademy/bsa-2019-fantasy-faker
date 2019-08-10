const now = new Date();

export default [
  {
    eventType: 'goal'
  },
  {
    eventType: 'assist'
  },
  {
    eventType: 'missed_pass'
  },
  {
    eventType: 'goal_conceded'
  },
  {
    eventType: 'save'
  },
  {
    eventType: 'yellow_card'
  },
  {
    eventType: 'red_card'
  }
].map(ev => ({
  ...ev,
  timeStamp: now,
  createdAt: now,
  updatedAt: now
}));
