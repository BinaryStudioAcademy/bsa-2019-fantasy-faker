import * as gameweekService from "../api/services/gameweek.service";
import * as footballClubService from "../api/services/footballClub.service";
import * as gameService from "../api/services/game.service";
import * as eventService from "../api/services/event.service";
import * as playerStatService from "../api/services/playerStat.service.js";

import eventGeneratorNoDelay from "./../helpers/event-generator-nodelay";

class gameweekGenerator {
  constructor() {
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

    for (let i = 0; i < this.gameweeks.length; i++) {
      await this.updateGames(this.gameweeks[i]);
    }

    return this.endGenerating();
  }

  async updateGames(gameweek) {
    const games = await gameService.getByGameweekId(gameweek.number);

    for (let i = 0; i < games.length; i++) {
      const { id, hometeam_id, awayteam_id, started, finished } = games[i];
      this.gameId = id;
      const eGenerator = new eventGeneratorNoDelay();
      const isAnyEvent = await this.checkEvents(id);
      if (!isAnyEvent) {
        const res = await eGenerator.initGame({
          homeClub: hometeam_id,
          awayClub: awayteam_id,
          id
        });
        console.log("genaration finished");
      }
      if (!started || !finished) {
        await gameService.updateGameToBeFinished(id);
      }
    }
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
    console.log(">>> Passed events generation fullfilled.");
  }
}

export default new gameweekGenerator();
