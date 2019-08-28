import playerMatchStatRepository from "../../data/repositories/playerMatchStat.repository";

export const getAllPlayerMatchStat = async () =>
  await playerMatchStatRepository.getAll();

export const getPlayerMatchStatById = async id =>
  await playerMatchStatRepository.getById(id);

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

export const updatePlayer = async (player_id, game_id, event) => {
  const result = await playerMatchStatRepository.getPlayerMatchStatsByGame(
    player_id,
    game_id
  );
  await result.increment([event], { by: 1 });

  return result;
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
