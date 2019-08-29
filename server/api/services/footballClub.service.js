import FootballClubRepository from '../../data/repositories/footballClub.repository';

export const getAllFootballClubs = async () => {
  const result = await FootballClubRepository.getWithPlayers();

  return result.map(r => r.toJSON());
};

export const getFootballClubById = async id =>
  await FootballClubRepository.getById(id);
