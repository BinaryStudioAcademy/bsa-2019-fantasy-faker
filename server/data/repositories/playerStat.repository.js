import { PlayerStatModel } from "../models/index";
import BaseRepository from "./base.repository";

class EventRepository extends BaseRepository {
	getById(id) {
		return this.model.findOne({ where: { id } });
	}

	getByClubId(club_id) {
		return this.model.findAll({
			where: { club_id }
		})
	}
}

export default new EventRepository(PlayerStatModel);