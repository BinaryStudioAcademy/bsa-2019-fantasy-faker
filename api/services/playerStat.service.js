import playerStatRepository from "../../data/repositories/playerStat.repository";

export const getAllPlayerStats = async () => await playerStatRepository.getAll();

export const getAllPlayerStatsById = async id => await playerStatRepository.getById(id);
