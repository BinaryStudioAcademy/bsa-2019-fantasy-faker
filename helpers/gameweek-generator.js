import * as gameweekService from '../api/services/gameweek.service';
import * as footballClubService from '../api/services/footballClub.service';
import * as gameService from '../api/services/game.service';
import * as eventService from '../api/services/event.service';
import * as playerMatchStatServices from '../api/services/playerMatchStat.service';
import * as playerStatService from '../api/services/playerStat.service.js';

import generateEvents from '../socket/generateEvents.js';

class gameweekGenerator {
  constructor() {
    console.log('gameweek generator constructor');
    this.gameweeks = [];
  }

  async getTeams() {
    try {
      const response = await footballClubService.getAllFootballClubs();
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getPlayers(club_id) {
    try {
      const response = await playerStatService.getAllPlayerStatsByClubId(
        club_id
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getPreviousGameweeks() {
    try {
      const response = await gameweekService.getPreviousGameweeks();
      if (!response.length) {
        return this.endGenerating();
      }

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async setEvents() {
    this.gameweeks = await this.getPreviousGameweeks();
    this.teams = await this.getTeams();

    await Promise.all(
      this.gameweeks.map(async gameweek => await this.updateGames(gameweek))
    ); 

    return this.endGenerating();
  }

  async updateGames(gameweek) {
    const games = await gameService.getByGameweekId(gameweek.number);

    await Promise.all(
      games.map(async game => {
        console.log('game: ', game);
        const { id, hometeam_id, awayteam_id, started, finished } = game;
        this.gameId = id;

        const isAnyEvent = await this.checkEvents(id);
        // TODO check if events and player_match_stats already exist
        if (!isAnyEvent) {
          this.homePlayers = await this.getPlayers(hometeam_id);
          this.awayPlayers = await this.getPlayers(awayteam_id);

          await this.generatePlayersStats(this.homePlayers, game.id);
          await this.generatePlayersStats(this.awayPlayers, game.id);

          await generateEvents(game, this.homePlayers, this.awayPlayers);
        }

        if (!started || !finished) {
          await gameService.updateGameToBeFinished(id);
        }
      })
    );
  }

  async checkEvents(game_id) {
    try {
      const response = await eventService.getEventsByGameId(game_id);
      return response.length;
    } catch (err) {
      console.log(err);
    }
  }

  endGenerating() {
    console.log('fullfilled');
  }

  async generatePlayersStats(players, game_id) {
    return await Promise.all(
      players.map(async player => {
        try {
          const result = await playerMatchStatServices.createPlayer(
            player.id,
            game_id
          );
          return result;
        } catch (err) {
          console.log(err);
        }
      })
    );
  }
}

export default new gameweekGenerator();
