export const determinedEvents = [
  { name: "match-start" },
  { name: "match-end" },
  { name: "time-start" },
  { name: "time-end" },
  {
    name: "red-card",
    after: {
      name: "leaves-the-field",
      direction: "same-player",
      after: {
        name: "enters-the-field",
        direction: "bench"
      }
    }
  }
];

// Event probability is probability of an event during a match
// For example if probability of a goal is 2, then it is highly
// expected two goals to be scored during one match. Field without
// probability considered default event, or just takes all of the
// rest of probabilities

// Field 'subject' is probabilities of player on particular position
// to cause an event. It relates to only one event (not whole match),
// so it has to be normalized to 1 (summ of all probabilities must be
// equal 1)

// Field after - it is an array of events that could happen after
// particular event.

// Field direction - "same-player" | "same-team" | "other-team" - who is
// the subject of next event

// Field inherit -- to be implemented - inherits 'after' properties of other events

export const probableEvents = [
  {
    name: "shot",
    probability: 20,
    subject: {
      FWD: 0.5,
      MID: 0.3,
      DEF: 0.15,
      GKP: 0.05
    },
    after: [
      { name: "goal", direction: "same-player", probability: 2 },
      {
        name: "save",
        probability: 15,
        direction: "other-team",
        subject: {
          GKP: 1
        }
      },
      { name: "missed", direction: "same-player" }
    ]
  },
  {
    name: "yellow-card",
    probability: 10,
    subject: {
      FWD: 0.2,
      MID: 0.3,
      DEF: 0.4,
      GKP: 0.1
    },
    after: [{ name: "shot", direction: "same-team", probability: 10 }]
  }
];
