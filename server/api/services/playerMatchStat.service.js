import playerMatchStatRepository from "../../data/repositories/playerMatchStat.repository";

export const getAllPlayerMatchStat = async () =>
  await playerMatchStatRepository.getAll();

export const getPlayerMatchStatById = async id =>
  await playerMatchStatRepository.getById(id);

export const getPlayerByMatchStatId = async (id) => {
  const result = await playerMatchStatRepository.getPlayerById(id);
  return result;
};

export const getPlayerMatchStatsAfter = async (timestamp) => {
  const result = await playerMatchStatRepository.getAfter(timestamp);
  return result;
}

export const createPlayer = (player_id, game_id) => {
  return playerMatchStatRepository.create({
    player_id,
    game_id,
    goals: 0,
    assists: 0,
    missed_passes: 0,
    goals_conceded: 0,
    saves: 0,
    yellow_cards: 0,
    red_cards: 0
  });
};

export const update = async playerMatchStats => {
  const { id, ...data } = playerMatchStats;
  return await playerMatchStatRepository.updateById(id, data);
};

export const getPlayerMatchStatsByGame = async (player_id, game_id) => {
  const result = await playerMatchStatRepository.getPlayerMatchStatsByGame(
    player_id,
    game_id
  );
  return result;
};