import * as playerMatchStatServices from "../api/services/playerMatchStat.service";
import * as playerStatService from "../api/services/playerStat.service";

export default async function updatePlayerStats (data) {
	// player match stat id
	const { id, ...events } = data;

	const playerStats = await playerMatchStatServices.getPlayerByMatchStatId(id);
	const updatedPlayerStats = await playerStatService.updatePlayerStats(playerStats.player.id, events);
	
	return updatedPlayerStats;
};
