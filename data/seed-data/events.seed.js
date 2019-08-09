const now = new Date();

export default [
    {
        eventType: 'goal'
    },
    {
        eventType: 'successful_pass'
    },
    {
        eventType: 'shoot'
    },
    {
        eventType: 'save'
    },
    {
        eventType: 'yellow_card'
    },
    {
        eventType: 'red_card'
    }
].map(ev => ({
    ...ev,
    timeStamp: now,
    createdAt: now,
    updatedAt: now
}));
