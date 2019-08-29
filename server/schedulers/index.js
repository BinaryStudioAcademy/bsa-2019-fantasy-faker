import gameScheduler from "./game.scheduler";

const initSchedulers = io => {
  gameScheduler(io);
};

export default initSchedulers;
