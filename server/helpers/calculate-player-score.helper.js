const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const calculatePlayerScore = ({
  goals,
  assists,
  missed_passes,
  goals_conceded,
  saves,
  yellow_cards,
  red_cards
}) => {
  let score = 0;
  score += goals * 8;
  score += assists * 6;
  score += saves * 6;
  score += missed_passes * 4;
  score -= yellow_cards * 3;
  score -= red_cards * 6;
  score -= goals_conceded * 2;
  return score > 0 ? score : randomNumber(0, 1);
};

export default calculatePlayerScore;
