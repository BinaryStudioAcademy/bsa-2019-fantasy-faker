import sequelize from "sequelize";

import { PlayerMatchStatModel } from "../models/index";
import BaseRepository from "./base.repository";

class EventRepository extends BaseRepository {
  getById(id) {
    return this.model.findOne({ where: { id }, include: ["game"] });
  }

  getPlayerMatchStatsByGame(player_id, game_id) {
    return this.model.findOne({
      where: { player_id, game_id }
    });
  }
}

export default new EventRepository(PlayerMatchStatModel);
