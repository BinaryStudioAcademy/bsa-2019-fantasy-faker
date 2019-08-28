import playerStatRepository from "../../data/repositories/playerStat.repository";

export const getAllPlayerStats = async () =>
	await playerStatRepository.getAll();

export const getAllPlayerStatsById = async id =>
	await playerStatRepository.getById(id);

export const getAllPlayerStatsByClubId = async club_id => {
	const response = await playerStatRepository.getByClubId(club_id);

	return response.map(r => r.toJSON());
};

export const updatePlayerStats = async (id, data) => {
	const player = await playerStatRepository.getById(id);

	return await Promise.all(
		Object.keys(data).map(async event => {
			await player.increment([event], { by: data[event] });
		})
	);
};