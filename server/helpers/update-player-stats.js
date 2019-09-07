import * as playerMatchStatServices from "../api/services/playerMatchStat.service";
import * as playerStatService from "../api/services/playerStat.service";

export default async function updatePlayerStats(player_id, data) {
  // player match stat id
  const { id, ...events } = data;
  const updatedPlayerStats = await playerStatService.updatePlayerStats(
    player_id,
    events
  );

  return updatedPlayerStats;
}
