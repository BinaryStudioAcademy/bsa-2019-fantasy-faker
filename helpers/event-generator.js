import { events, probabilities } from "../config/event-generator.config";
import { mainApp } from "../helpers/api.helper";

const TIME_DURATION = 150; // in seconds
const EVENT_INTERVAL = 5; // in seconds
const GAME_EVENTS_COUNT = (TIME_DURATION / EVENT_INTERVAL) * 2; // there is two times

class eventGenerator {
  constructor() {
    this.timesCount;
    this.timeouts = {};
    this.timestamps = {};
    this.eventCycleInterval = undefined;
    this.gameStarted = false;
    this.score = [0, 0];
    this.possibleNextEvent = undefined;
    this.prevEvent = undefined;

    this.eventHandlers = {
      goal: event => {
        const [home, away] = this.score;
        this.score = [
          event.team === "home" && home + 1,
          event.team === "away" && away + 1
        ];
        return { score: this.score };
      }
    };
  }

  async fetchPlayers(club_id) {
    try {
      const response = await mainApp.get("/players", { params: { club_id } });
      //console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  async initGame(data, socket) {
    if (this.gameStarted) return "game is already started";
    this.gameStarted = true;
    this.setTimestamp("initGame");

    const { homeClubId, awayClubId, timeout } = data;
    this.socket = socket;
    this.homeClubId = homeClubId;
    this.awayClubId = awayClubId;
    this.homePlayers = await this.fetchPlayers(this.homeClubId);
    this.awayPlayers = await this.fetchPlayers(this.awayClubId);
    // TODO: parallel requests above

    this.eventCycle = this.eventCycleGenerator();

    this.timeouts.startGame = setTimeout(
      () => this.startGame(),
      timeout * 1000
    );
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
    this.setTimestamp("startGame");
    this.emit({ name: "start-game" });
    this.timesCount = 0;
    this.timeouts.startTime = setTimeout(
      () => this.startTime(),
      (TIME_DURATION / 45) * 1 * 1000
    );
  }

  startTime() {
    this.timesCount++;
    this.setTimestamp("startTime", { update: { time: this.timesCount } });
    this.emit({ name: "start-time", time: this.timesCount, elapsed: 0 });
    this.timeouts.endTime = setTimeout(
      () => this.endTime(),
      TIME_DURATION * 1000
    );
    this.eventCycleInterval = setInterval(
      () => this.eventGenerator(),
      EVENT_INTERVAL * 1000
    );
  }

  endTime() {
    clearInterval(this.eventCycleInterval);
    this.setTimestamp("endTime", this.timesCount);
    this.emit({
      name: "end-time",
      time: this.timesCount,
      elapsed: this.elapsed(now)
    });
    if (this.timesCount === 2) return this.endGame();
    this.timeouts.startTime = setTimeout(
      () => this.startTime(),
      (TIME_DURATION / 45) * 15
    );
  }

  endGame() {
    this.gameStarted = false;
    this.setTimestamp("endGame");
  }

  stopGame() {
    this.setTimestamp("stopGame");
    this.gameStarted = false;

    clearInterval(this.eventCycleInterval);
    clearInterval(this.timeouts.endTime);
    clearInterval(this.timeouts.endGame);
    this.emit({ name: "stop-game", elapsed: this.elapsed(now) });
  }

  elapsed(now) {
    return Math.round(
      ((now - this.timestamps.startTime[1]) / TIME_DURATION) * 45 * 60
    );
  }

  eventGenerator() {
    const event = this.eventCycle.next().value;
    this.prevEvent = event;
    this.possibleNextEvent = probabilities[event.after] || probabilities.game;

    const update = this.handleEvent(event);

    const now = Date.now();
    this.emit({ ...event, update, elapsed: this.elapsed(now) });
  }

  *eventCycleGenerator() {
    this.possibleNextEvent = probabilities.game;

    while (true) {
      const eventType = this.getProbableKey(this.possibleNextEvent);
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
      case "samePlayer": {
        return { team: this.prevEvent.team, player: this.prevEvent.player };
      }
      case "sameTeam": {
        const { team } = this.prevEvent;
        return {
          team,
          player: this.getProbablePlayer(subject, team)
        };
      }
      case "otherTeam": {
        const team = this.prevEvent.team === "home" ? "away" : "home";
        return {
          team,
          player: this.getProbablePlayer(subject, team)
        };
      }
      default: {
        const team = this.getRandomInt(2) ? "home" : "away";
        const player = subject
          ? this.getProbablePlayer(subject, team)
          : undefined;
        return { team, player };
      }
    }
  }

  getProbablePlayer(subject, team) {
    return this.getRandomPlayer(this.getProbableKey(subject), team);
  }

  getRandomPlayer(position, team) {
    const players = team === "home" ? this.homePlayers : this.awayPlayers;
    const positionPlayers = players.filter(
      player => player.position === position
    );
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
      if (key === "_normalize") continue;
      const value = obj[key] || 0;
      const probability = obj._normalize ? value / GAME_EVENTS_COUNT : value;
      topLimit += probability;
      if (random < topLimit) return key;
    }
    const defaultKey = Object.keys(obj).find(key => obj[key] === undefined);
    return defaultKey;
  }

  generateText(data) {
    let text = `Event '${data.name}' `;
    data.player &&
      (text += `from team '${data.team}' by '${data.player &&
        data.player.position}' ${data.player.first_name} ${
        data.player.second_name
      }`);
    return text;
  }

  emit(data) {
    const { name, team, player, update, elapsed } = data;
    const { first_name, last_name, id, position } = player || {};

    const event = {
      name,
      player: player ? { first_name, last_name, id, position } : undefined,
      team,
      update,
      elapsed,
      text: this.generateText(data)
    };

    console.log(data);
    this.socket.emit("event", event);
  }
}

export default new eventGenerator();
