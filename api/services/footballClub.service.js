import FootballClubRepository from '../../data/repositories/footballClub.repository';

export const getAllFootballClubs = async () =>
    await FootballClubRepository.getAll();

export const getFootballClubById = async id =>
    await FootballClubRepository.getById(id);
