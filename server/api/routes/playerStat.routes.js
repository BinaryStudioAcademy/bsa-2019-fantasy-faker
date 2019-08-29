import { Router } from 'express';
import * as playerStatService from '../services/playerStat.service';

const router = Router();

router
  .get('/', (req, res, next) =>
    playerStatService
      .getAllPlayerStats()
      .then(value => res.json(value))
      .catch(next)
  )
  .get('/after', (req, res, next) => 
    playerStatService.getPlayerStatsAfter(req.query.timestamp)
    .then(value => res.json(value))
    .catch(next)
  )
  .get('/:id', (req, res, next) =>
    playerStatService
      .getAllPlayerStatsById(req.params.id)
      .then(value => res.json(value))
      .catch(next)
  );

export default router;
