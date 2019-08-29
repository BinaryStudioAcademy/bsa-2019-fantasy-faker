import gameRepository from '../../data/repositories/game.repository';

export const getAllGames = async () => await gameRepository.getAll();

export const getGameById = async id => await gameRepository.getById(id);

export const getByGameweekId = async id => {
  const response = await gameRepository.getByGameweekId(id);
  return response;
};

export const updateGameToBeFinished = async id => {
  const result = await gameRepository.updateById(id, {
    started: true,
    finished: true,
    minutes: 90
  });

  return result;
};

export const updateGameScore = async (id, hometeam_score, awayteam_score) => {
  const result = await gameRepository.updateById(id, {
    hometeam_score,
    awayteam_score
  });

  return result;
};
