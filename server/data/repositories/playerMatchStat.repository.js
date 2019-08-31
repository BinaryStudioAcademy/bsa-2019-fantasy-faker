import sequelize from "sequelize";

import { PlayerMatchStatModel } from "../models/index";
import BaseRepository from "./base.repository";

class EventRepository extends BaseRepository {
  getById(id) {
    return this.model.findOne({ where: { id }, include: ["game"] });
  }

  getByPk(id) {
    return this.model.findByPk(id);
  }

  getPlayerMatchStatsByGame(player_id, game_id) {
    return this.model.findOne({
      where: { player_id, game_id }
    });
  }

  getPlayerById(id) {
    return this.model.findOne({ where: { id }, include: ['player'] });
  }
}

export default new EventRepository(PlayerMatchStatModel);