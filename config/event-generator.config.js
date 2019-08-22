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

export const probabilities = {
  game: {
    shot: 20,
    foul: 10,
    out: 10,
    nothing: undefined,
    _normalize: true
  },
  afterShot: {
    goal: 10,
    save: 5,
    missed: 5,
    interception: 5
  },
  afterMissed: {
    cornerKick: 0.3,
    goalKick: 0.3
  },
  afterCornerKick: {
    goal: 10,
    save: 5,
    missed: 5,
    interception: 5
  },
  afterFoul: {
    freeKick: 0.6,
    penaltyKick: 0.2,
    yellowCard: 0.2
  },
  afterYellowCard: {
    freeKick: 0.8,
    penaltyKick: 0.2
  },
  afterPenalty: {
    goal: 0.3,
    missed: 0.3,
    save: 0.3
  }
};

export const events = {
  shot: {
    name: "shot",
    subject: {
      FWD: 0.5,
      MID: 0.3,
      DEF: 0.15,
      GKP: 0.05
    },
    after: "afterShot"
  },

  foul: {
    name: "foul",
    subject: {
      FWD: 0.2,
      MID: 0.3,
      DEF: 0.4,
      GKP: 0.1
    },
    after: "afterFoul"
  },

  goal: { name: "goal", direction: "samePlayer" },

  save: {
    name: "save",
    subject: {
      GKP: 1
    },
    direction: "otherTeam"
  },

  missed: { name: "missed", direction: "samePlayer", after: "afterMissed" },

  yellowCard: {
    name: "yellowCard",
    direction: "samePlayer",
    after: "afterYellowCard"
  },

  goalKick: {
    name: "goalKick",
    subject: {
      GKP: 1
    },
    direction: "otherTeam"
  },

  cornerKick: {
    name: "cornerKick",
    subject: {
      FWD: 0.19,
      MID: 0.5,
      DEF: 0.3,
      GKP: 0.01
    },
    direction: "sameTeam",
    after: "afterCornerKick"
  },

  freeKick: {
    name: "freeKick",
    subject: {
      FWD: 0.3,
      MID: 0.3,
      DEF: 0.3,
      GKP: 0.1
    },
    direction: "otherTeam",
    after: "afterShot"
  },

  penaltyKick: {
    name: "penaltyKick",
    subject: {
      FWD: 0.5,
      MID: 0.4,
      DEF: 0.1,
      GKP: 0
    },
    direction: "otherTeam",
    after: "afterPenalty"
  },

  interception: {
    name: "interception",
    subject: {
      FWD: 0.2,
      MID: 0.3,
      DEF: 0.5,
      GKP: 0
    }
  },

  out: {
    name: "out",
    subject: {
      FWD: 0.1,
      MID: 0.3,
      DEF: 0.4,
      GKP: 0.2
    }
  },

  nothing: {
    name: "nothing"
  }
};
