import { GameModel } from '../models/index';
import BaseRepository from './base.repository';

class EventRepository extends BaseRepository {
    getById(id) {
        return this.model.findOne({ where: { id } });
    }

    getByGameweekId(gameweek_id) {
        return this.model.findAll({
            where: { gameweek_id }
        })
    }
}

export default new EventRepository(GameModel);
