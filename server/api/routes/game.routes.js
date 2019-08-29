import { Router } from "express";
import * as gameService from "../services/game.service";
import eventGenerator from "../../helpers/event-generator";

const router = Router();

router
  .get("/", (req, res, next) =>
    gameService
      .getAllGames()
      .then(value => res.json(value))
      .catch(next)
  )
  .get("/after", (req, res, next) =>
    gameService
      .getGamesAfter(req.query.timestamp)
      .then(value => res.json(value))
      .catch(next)
  )
  .get("/start", (req, res, next) => eventGenerator.startGame())
  .get("/:id", (req, res, next) =>
    gameService
      .getGameById(req.params.id)
      .then(value => res.json(value))
      .catch(next)
  );

export default router;
