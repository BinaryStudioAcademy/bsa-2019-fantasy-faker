import playerMatchStatRepository from "../../data/repositories/playerMatchStat.repository";

export const getAllPlayerMatchStat = async () => await playerMatchStatRepository.getAll();

export const getPlayerMatchStatById = async id => await playerMatchStatRepository.getById(id);
