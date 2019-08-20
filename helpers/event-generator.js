import {
  determinedEvents,
  probableEvents
} from "../config/event-generator.config";
import { mainApp } from "../helpers/api.helper";

const TIME_DURATION = 150; // in seconds
const EVENT_INTERVAL = 5; // in seconds
const GAME_EVENTS_COUNT = (TIME_DURATION / EVENT_INTERVAL) * 2; // there is two times

class eventGenerator {
  constructor() {
    console.log("event generator constructor");
    this.timesCount = 0;
    this.timeouts = {};
    this.eventCycleInterval = undefined;
    this.gameStarted = false;
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

  startGame() {
    this.emit("start-game", {});
    this.timeouts.startTime = setTimeout(
      () => this.startTime(),
      (TIME_DURATION / 45) * 1 * 1000
    );
  }

  startTime() {
    this.timesCount++;
    this.emit("start-time", {});
    this.timeouts.endTime = setTimeout(
      () => this.endTime(),
      TIME_DURATION * 1000
    );
    this.eventCycleInterval = setInterval(
      () => this.emit("event", this.eventCycle.next().value),
      EVENT_INTERVAL * 1000
    );
  }

  endTime() {
    clearInterval(this.eventCycleInterval);
    this.emit("end-time", {});
    if (this.timesCount === 2) return this.endGame();
    this.timeouts.startTime = setTimeout(
      () => this.startTime(),
      (TIME_DURATION / 45) * 15
    );
  }

  endGame() {
    this.gameStarted = false;
    this.emit("end-game", {});
  }

  stopGame() {
    clearInterval(this.eventCycleInterval);
    clearInterval(this.timeouts.endTime);
    clearInterval(this.timeouts.endGame);
    this.emit("game stopped", {});
  }

  *eventCycleGenerator() {
    while (true) {
      const team = this.getRandomInt(1) ? "home" : "away";
      let event = { ...this.getProbableEvent(probableEvents), team };
      event = { ...event, player: this.getProbablePlayer(event) };
      yield event;

      if (event.after) {
        const event2 = this.getProbableEvent(event.after);
        switch (event2.direction) {
          case "same-player":
            event2.team = event.team;
            event2.player = event.player;
            yield event2;
            break;
          case "same-team":
            event2.team = event.team;
            yield { ...event2, player: this.getProbablePlayer(event2) };
            break;
          case "other-team":
            event2.team = event.team === "home" ? "away" : "home";
            yield { ...event2, player: this.getProbablePlayer(event2) };
            break;
          default:
            yield { ...event2, player: this.getProbablePlayer(event2) };
            break;
        }
      }
    }
  }

  getProbableEvent(events) {
    const random = Math.random();
    let topLimit = 0;
    const event = events.find(item => {
      topLimit = topLimit + this.normalize(item.probability);
      return random < topLimit;
    });
    if (event) return event;

    const defaultEvent = events.find(item => item.probability === undefined);
    if (defaultEvent) return defaultEvent;

    return { name: "nothing" };
  }

  normalize(probability) {
    return probability / GAME_EVENTS_COUNT;
  }

  getProbablePlayer(event) {
    if (event.name == "nothing") return undefined;
    const random = Math.random();
    // console.log(`Random ${random}`);
    let topLimit = 0;
    const position = Object.keys(event.subject).find(position => {
      topLimit = topLimit + event.subject[position];
      // console.log(`${position} - ${topLimit}`);
      return random < topLimit;
    });

    return this.getRandomPlayer(position, event.team);
  }

  getRandomPlayer(position, team) {
    // console.log("Position: " + position);
    const players = team === "home" ? this.homePlayers : this.awayPlayers;
    const positionPlayers = players.filter(
      player => player.position === position
    );
    // TODO: exclude bench players here
    const player = positionPlayers[this.getRandomInt(positionPlayers.length)];
    // console.log(player);
    return player;
  }

  getRandomInt(number) {
    return Math.floor(Math.random() * number);
  }

  emit(name, data) {
    let text = `Event '${name}'`;
    if (name == "event") {
      text = `Event '${data.name}' `;
      if (data.player) {
        text += `from team '${data.team}' by '${data.player &&
          data.player.position}' ${data.player.first_name} ${
          data.player.second_name
        }`;
      }
    }
    console.log(text);
    this.socket.emit("event", text);
  }
}

export default new eventGenerator();
