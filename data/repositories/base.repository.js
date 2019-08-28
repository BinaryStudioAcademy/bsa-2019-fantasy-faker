import moment from "moment";
import { Op } from "sequelize";

export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  getAll() {
    return this.model.findAll();
  }

  getById(id) {
    return this.model.findByPk(id);
  }

  getAfter(timestamp) {
    if (timestamp === undefined) {
      return this.model.findAll();
    } else {
      return this.model.findAll({
        where: { updatedAt: { [Op.gte]: timestamp } }
      });
    }
  }

  create(data) {
    return this.model.create(data);
  }

  async updateById(id, data) {
    const result = await this.model.update(data, {
      where: { id },
      returning: true,
      plain: true
    });

    return result;
  }

  deleteById(id) {
    return this.model.destroy({
      where: { id }
    });
  }
}
