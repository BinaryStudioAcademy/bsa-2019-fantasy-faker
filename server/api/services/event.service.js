import eventRepository from '../../data/repositories/event.repository';
import playerMatchStatRepository from '../../data/repositories/playerMatchStat.repository';


export const getAllEvents = async () => await eventRepository.getAll();

export const getEventById = async id => await eventRepository.getById(id);

export const getEventsByGameId = async (game_id) => {
	const response = await eventRepository.getByGameId(game_id);
	return response;
};

export const createEvent = async (event_type, player_id, game_id) => {
  const { id } = await playerMatchStatRepository.getPlayerMatchStatsByGame(
    player_id,
    game_id
  );

  return eventRepository.create({
    event_type,
    player_match_stat_id: id,
    game_id
  });
};
