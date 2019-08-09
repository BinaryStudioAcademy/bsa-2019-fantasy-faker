const now = new Date();

export default [
    {
        hometeamScore: 23,
        awayteamScore: 12
    },
    {
        hometeamScore: 21,
        awayteamScore: 20
    },
    {
        hometeamScore: 13,
        awayteamScore: 19
    }
].map(game => ({
    ...game,
    start: now,
    end: now,
    createdAt: now,
    updatedAt: now
}));
