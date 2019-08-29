import dotenv from "dotenv";
import express from "express";
import http from "http";
import socketIO from "socket.io";

import routes from "./api/routes/index";
import errorHandlerMiddleware from "./api/middlewares/error-handler.middleware";
import socketInjector from "./socket/injector";
import socketHandlers from "./socket/handlers";
import gameweekGenerator from "./helpers/gameweek-generator";
import initSchedulers from "./schedulers";

import sequelize from "./data/db/connection";

dotenv.config();

const app = express();
const socketServer = http.Server(app);
const io = socketIO(socketServer);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    initSchedulers(io);
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

io.on("connection", socketHandlers);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(socketInjector(io));

routes(app, io);

app.get("/", function(req, res) {
  res.sendFile(`${__dirname}/assets/index.html`);
});

app.use(errorHandlerMiddleware);
app.listen(process.env.APP_PORT, async () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${process.env.APP_PORT}!`);
  await gameweekGenerator.setEvents();
  console.log("Sending update socket event");
  io.emit("update");
});

socketServer.listen(process.env.SOCKET_PORT);
