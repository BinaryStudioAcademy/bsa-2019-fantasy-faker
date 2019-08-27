import { Op } from "sequelize";

import { GameModel } from "../models/index";
import BaseRepository from "./base.repository";

class GameRepository extends BaseRepository {
  getById(id) {
    return this.model.findOne({ where: { id } });
  }

  getByGameweekId(gameweek_id) {
    return this.model.findAll({
      where: { gameweek_id }
    });
  }

  getNext() {
    const now = new Date();
    return this.model.findOne({
      where: {
        start: {
          [Op.gte]: now
        }
      },
      order: [["start", "ASC"]]
    });
  }
}

export default new GameRepository(GameModel);
