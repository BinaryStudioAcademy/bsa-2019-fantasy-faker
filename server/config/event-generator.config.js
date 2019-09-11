export const probabilities = {
  game: {
    attack: 70,
    foul: 5,
    out: 5,
    nothing: undefined,
    _normalize: true
  },
  afterAttack: {
    attack: 0.25,
    shot: 0.25,
    interception: 0.3,
    foul: 0.1,
    out: 0.1
  },
  afterShot: {
    goal: 0.2,
    save: 0.4,
    miss: 0.3,
    interception: 0.2
  },
  afterMiss: {
    cornerKick: 0.3,
    goalKick: 0.3,
    nothing: 0.4
  },
  afterCornerKick: {
    shot: 0.3,
    interception: 0.3,
    attack: 0.3,
    save: 0.1
  },
  afterFoul: {
    freeKick: 0.5,
    trauma: 0.2,
    penaltyKick: 0.1,
    yellowCard: 0.2
  },
  afterYellowCard: {
    freeKick: 0.8,
    penaltyKick: 0.2
  },
  afterPenalty: {
    goal: 0.3,
    miss: 0.3,
    save: 0.4
  },
  afterTrauma: {
    yellowCard: 0.8,
    freeKick: 0.2
  },
  afterFreeKick: {
    shot: 0.3,
    attack: 0.7
  }
};

export const events = {
  attack: {
    name: "attack",
    subject: {
      FWD: 0.2,
      MID: 0.7,
      DEF: 0.1,
      GKP: 0
    },
    after: "afterAttack",
    positive: "shot"
  },
  shot: {
    name: "shot",
    direction: "sameTeam",
    subject: {
      FWD: 0.5,
      MID: 0.4,
      DEF: 0.1,
      GKP: 0
    },
    after: "afterShot",
    positive: "goal"
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

  miss: { name: "miss", direction: "samePlayer", after: "afterMiss" },

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
    after: "afterFreeKick"
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
    after: "afterPenalty",
    positive: "goal"
  },

  interception: {
    name: "interception",
    direction: "otherTeam",
    subject: {
      FWD: 0.05,
      MID: 0.45,
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
  trauma: {
    name: "trauma",
    direction: "otherTeam",
    subject: {
      FWD: 0.4,
      MID: 0.3,
      DEF: 0.2,
      GKP: 0.1
    },
    after: "afterTrauma"
  },

  redCard: {
    name: "redCard",
    direction: "samePlayer"
  },

  nothing: {
    name: "nothing"
  }
};
