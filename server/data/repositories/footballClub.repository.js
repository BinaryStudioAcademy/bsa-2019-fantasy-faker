import { FootballClubModel } from '../models/index';
import BaseRepository from './base.repository';

class FootballClubRepository extends BaseRepository {
  getById(id) {
    return this.model.findOne({
      where: { id }
    });
  }

  getWithPlayers() {
    return this.model.findAll({
      include: ['player_stats']
    });
  }
}

export default new FootballClubRepository(FootballClubModel);
