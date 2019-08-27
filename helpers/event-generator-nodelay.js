import { eventGenerator } from "./event-generator";
const TIME_DURATION = 150; // in seconds
const EVENT_INTERVAL = 5; // in seconds
const TIME_EVENTS_COUNT = TIME_DURATION / EVENT_INTERVAL; // there is two times

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
      elapsed: 0
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
    const { name, team, player, update, elapsed } = data;
    const { first_name, second_name, id, position } = player || {};

    // if (player) {
    //   eventService.createEvent(name, id, this.gameId);
    // }

    const event = {
      name,
      player: player ? { first_name, second_name, id, position } : undefined,
      team,
      elapsed,
      text: this.generateText(data),
      ...update
    };

    console.log(event.text);
  }
}

export default eventGeneratorNoDelay;
