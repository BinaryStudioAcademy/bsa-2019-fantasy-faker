import { eventGenerator } from "./event-generator";
import * as eventService from "./../api/services/event.service";

const TIME_EVENTS_COUNT = 30;

class eventGeneratorNoDelay extends eventGenerator {
  constructor() {
    super();
    this.events = [];
    this.timeCounter = 0;
  }

  startGame() {
    this.emit({ name: "startGame" });
    this.timesCount = 0;
    this.startTime();
    this.endTime();
    this.startTime();
    this.endTime();
    this.endGame();
  }

  startTime() {
    this.timesCount++;
    this.setTimestamp("startTime", this.timesCount);
    this.emit({
      name: "startTime",
      update: { time: this.timesCount },
      elapsed: this.elapsed()
    });
    let i = 0;
    while (i++ < TIME_EVENTS_COUNT) {
      this.timeCounter++;
      this.eventGenerator();
    }
  }

  endTime() {
    this.emit({
      name: "endTime",
      time: this.timesCount,
      elapsed: this.elapsed()
    });
  }

  elapsed() {
    return ((this.timeCounter * 45) / TIME_EVENTS_COUNT) * 60 * 1000;
  }

  emit(data) {
    const { name, team, player, update, elapsed = 0 } = data;
    const { first_name, second_name, id, position } = player || {};

    eventService.createEvent({
      event_type: name,
      player_id: id || null,
      game_id: this.gameId,
      time: elapsed
    });

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
  }
}

export default eventGeneratorNoDelay;
