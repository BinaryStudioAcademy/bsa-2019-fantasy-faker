import { events, probabilities } from '../config/event-generator.config';
import * as eventService from '../api/services/event.service';
import * as playerMatchStatServices from '../api/services/playerMatchStat.service';
import * as playerStatService from '../api/services/playerStat.service';
import * as gameService from '../api/services/game.service';

import updatePlayerStats from './update-player-stats.js';
import calculatePlayerScore from './calculate-player-score.helper';

const TIME_DURATION = 150; // in seconds
const EVENT_INTERVAL = 5; // in seconds
const GAME_EVENTS_COUNT = (TIME_DURATION / EVENT_INTERVAL) * 2; // there is two times

export class eventGenerator {
  constructor() {
    this.timesCount;
    this.timeouts = {};
    this.timestamps = {};
    this.eventCycleInterval = undefined;
    this.gameStarted = false;
    this.score = [0, 0];
    this.possibleNextEvent = undefined;
    this.prevEvent = undefined;
    this.playerMatchStats = [];
    this.eventsLog = [];

    this.eventHandlers = {
      goal: event => {
        const [home, away] = this.score;

        if (event.team === 'home') {
          this.score = [home + 1, away];
        } else if (event.team === 'away') {
          this.score = [home, away + 1];
        }

        this.isSimulation ||
          gameService.updateGameScore(this.gameId, this.score[0], this.score[1]);
        return { score: this.score };
      }
    };
  }

  async fetchPlayers(club_id) {
    return playerStatService.getAllPlayerStatsByClubId(club_id);
  }

  checkStatus() {
    const gameStarted = this.gameStarted;
    if (gameStarted)
      return {
        gameStarted,
        homeClubId: this.homeClubId,
        awayClubId: this.awayClubId,
        score: this.score,
        elapsed: this.elapsed()
      };
    return { gameStarted: this.gameStarted };
  }

  async initGame(data, socket) {
    this.score = [0, 0];
    this.timestamps = {};
    this.timesCount = 0;
    this.possibleNextEvent = undefined;

    this.gameStarted = true;
    this.setTimestamp('initGame');
    console.log('init game');

    const { homeClub, awayClub, timeout, id, start, isSimulation = false } = data;
    this.socket = socket;
    this.isSimulation = isSimulation;
    this.homeClubId = homeClub;
    this.awayClubId = awayClub;
    this.gameId = id;
    this.start = start;
    this.homePlayers = await this.fetchPlayers(this.homeClubId);
    this.awayPlayers = await this.fetchPlayers(this.awayClubId);
    // TODO: parallel requests above

    const playersArray = [...this.homePlayers, ...this.awayPlayers];

    if (!this.isSimulation) {
      for (let i = 0; i < playersArray.length; i++) {
        const player = playersArray[i];
        try {
          const data = await playerMatchStatServices.createPlayer(player.id, this.gameId);
          this.playerMatchStats.push(data.get({ plain: true }));
        } catch (err) {
          console.log(err);
        }
      }
    }

    this.eventCycle = this.eventCycleGenerator();
    if (timeout) {
      this.timeouts.startGame = setTimeout(() => this.startGame(), timeout * 1000);
    } else {
      return this.startGame();
    }
  }

  setTimestamp(name, index = undefined) {
    const now = Date.now();
    if (index) {
      if (this.timestamps[name] === undefined) {
        this.timestamps[name] = [];
      }
      this.timestamps[name][index] = now;
    } else {
      this.timestamps[name] = now;
    }
    return now;
  }

  startGame() {
    this.socket.emit('status', this.checkStatus());
    this.setTimestamp('startGame');
    this.emit({ name: 'startGame' });
    this.timesCount = 0;
    this.timeouts.startTime = setTimeout(
      () => this.startTime(),
      (TIME_DURATION / 45) * 1 * 1000
    );
  }

  startTime() {
    this.timesCount++;
    this.setTimestamp('startTime', this.timesCount);
    this.emit({
      name: 'startTime',
      update: { time: this.timesCount },
      elapsed: 0
    });
    this.timeouts.endTime = setTimeout(() => this.endTime(), TIME_DURATION * 1000);
    this.eventCycleInterval = setInterval(
      () => this.eventGenerator(),
      EVENT_INTERVAL * 1000
    );
  }

  endTime() {
    clearInterval(this.eventCycleInterval);
    this.setTimestamp('endTime', this.timesCount);
    this.emit({
      name: 'endTime',
      time: this.timesCount,
      elapsed: this.elapsed()
    });
    if (this.timesCount === 2) return this.endGame();
    this.timeouts.startTime = setTimeout(
      () => this.startTime(),
      (TIME_DURATION / 45) * 15
    );
  }

  async endGame() {
    this.gameStarted = false;
    this.setTimestamp('endGame');
    this.emit({ name: 'endGame', elapsed: this.elapsed() });
    const res = await this.updatePlayerMatchStats();
    if (this.socket) {
      this.socket.emit('update');
    }
    return res;
  }

  stopGame() {
    this.setTimestamp('stopGame');
    this.gameStarted = false;

    clearInterval(this.eventCycleInterval);
    clearInterval(this.timeouts.endTime);
    clearInterval(this.timeouts.endGame);
    this.emit({ name: 'stopGame', elapsed: this.elapsed() });
  }

  elapsed(now = Date.now()) {
    const startTime = this.timestamps.startTime ? this.timestamps.startTime[1] : 0;
    const elapsed = Math.round(((now - startTime) / TIME_DURATION) * 45 * 60);
    return elapsed;
  }

  eventGenerator() {
    const event = this.eventCycle.next().value;
    this.prevEvent = event;
    this.possibleNextEvent = probabilities[event.after] || probabilities.game;
    const update = this.handleEvent(event);
    this.emit({ ...event, update, elapsed: this.elapsed() });
  }

  *eventCycleGenerator() {
    this.possibleNextEvent = probabilities.game;

    while (true) {
      const eventType = this.getProbableKey(this.possibleNextEvent);
      //console.log(eventType);
      const eventObject = events[eventType];
      const { team, player } = this.handleDirection(eventObject);
      const event = { ...eventObject, team, player };
      yield event;
    }
  }

  handleEvent(event) {
    const eventHandler = this.eventHandlers[event.name];
    if (eventHandler) {
      return eventHandler(event);
    }
  }

  handleDirection(eventObject) {
    const { subject, direction } = eventObject;
    switch (direction) {
      case 'samePlayer': {
        return { team: this.prevEvent.team, player: this.prevEvent.player };
      }
      case 'sameTeam': {
        const { team } = this.prevEvent;
        return {
          team,
          player: this.getProbablePlayer(subject, team)
        };
      }
      case 'otherTeam': {
        const team = this.prevEvent.team === 'home' ? 'away' : 'home';
        return {
          team,
          player: this.getProbablePlayer(subject, team)
        };
      }
      default: {
        const team = this.getRandomInt(2) ? 'home' : 'away';
        const player = subject ? this.getProbablePlayer(subject, team) : undefined;
        return { team, player };
      }
    }
  }

  getProbablePlayer(subject, team) {
    return this.getRandomPlayer(this.getProbableKey(subject), team);
  }

  getRandomPlayer(position, team) {
    const players = team === 'home' ? this.homePlayers : this.awayPlayers;
    const positionPlayers = players.filter(player => player.position === position);
    // TODO: exclude bench players here
    const player = positionPlayers[this.getRandomInt(positionPlayers.length)];
    return player;
  }

  getRandomInt(number) {
    return Math.floor(Math.random() * number);
  }

  getProbableKey(obj) {
    const random = Math.random();
    let topLimit = 0;
    for (const key in obj) {
      if (key === '_normalize') continue;
      const value = obj[key] || 0;
      const probability = obj._normalize ? value / GAME_EVENTS_COUNT : value;
      topLimit += probability;
      if (random < topLimit) return key;
    }
    const defaultKey = Object.keys(obj).find(key => obj[key] === undefined);
    return defaultKey || 'nothing';
  }

  generateText(data) {
    let text = `Minute ${data.elapsed / 1000 / 60}, event '${data.name}' `;
    data.player &&
      (text += `from team '${data.team}' by '${data.player && data.player.position}' ${
        data.player.first_name
      } ${data.player.second_name}`);
    return text;
  }

  emit(data) {
    const { name, team, player, update, elapsed = 0 } = data;
    const { first_name, second_name, id, position } = player || {};

    if (!this.isSimulation) {
      eventService.createEvent({
        event_type: name,
        player_id: id || null,
        game_id: this.gameId,
        time: elapsed
      });
    }

    const event = {
      name,
      player: player ? { first_name, second_name, id, position } : undefined,
      team,
      elapsed,
      text: this.generateText(data),
      ...update
    };
    this.eventsLog.push(event);

    console.log(event.text);
    if (this.socket) this.socket.emit('event', event);
  }

  async updatePlayerMatchStats() {
    if (this.isSimulation) return true;

    for (let i = 0; i < this.playerMatchStats.length; i++) {
      const player = this.playerMatchStats[i];

      const goals = this.filterGeneral('goal', player);
      const saves = this.filterGeneral('save', player);
      const missed_passes = this.filterGeneral('interception', player); // Temporary solution. Negative event changed to positive
      const yellow_cards = this.filterGeneral('yellowCard', player);
      const assists = this.filterAssists('goal', player); // Workaround to fill assists
      const red_cards = 0; // to write later

      const isHomePlayer = this.homePlayers.find(item => item.id === player.player_id);
      const { position } = await playerStatService.getAllPlayerStatsById(
        player.player_id
      );

      let goals_conceded = 0;
      if (position === 'GKP' || position === 'DEF') {
        goals_conceded = isHomePlayer ? this.score[1] : this.score[0];
      }

      const injury = new Date();
      const player_score = calculatePlayerScore({
        goals,
        assists,
        missed_passes,
        goals_conceded,
        saves,
        yellow_cards,
        red_cards
      });
      const data = {
        id: player.id,
        goals,
        assists,
        missed_passes,
        goals_conceded,
        saves,
        yellow_cards,
        red_cards,
        injury,
        player_score
      };
      try {
        await playerMatchStatServices.update(data);
        await updatePlayerStats(data);
      } catch (err) {
        console.log(err);
      }
    }
  }

  filterGeneral(eventName, player) {
    return this.eventsLog.filter(
      event =>
        event.name === eventName && event.player && event.player.id === player.player_id
    ).length;
  }

  filterAssists(eventName, player) {
    return this.eventsLog.filter(
      (event, i) =>
        event.name === eventName &&
        this.eventsLog[i - 2].player &&
        this.eventsLog[i - 2].player.id === player.player_id
    ).length;
  }
}

export default new eventGenerator();
