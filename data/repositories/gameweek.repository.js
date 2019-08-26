import Sequelize from 'sequelize';
import moment from 'moment';

import { GameweekModel } from '../models/index';
import BaseRepository from './base.repository';

const Op = Sequelize.Op;

class EventRepository extends BaseRepository {
  getById(id) {
    return this.model.findOne({ where: { id }, include: ['games'] });
  }

  getPreviousGameweeks() {
    return this.model.findAll({
      where: {
        end: {
          [Op.lt]: moment().format()
        }
      }
    });
  }
}

export default new EventRepository(GameweekModel);
