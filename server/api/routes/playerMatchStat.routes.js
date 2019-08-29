import { Router } from 'express';
import * as playerMatchStatService from '../services/playerMatchStat.service';

const router = Router();

router
  .get('/', (req, res, next) =>
    playerMatchStatService
      .getAllPlayerMatchStat()
      .then(value => res.json(value))
      .catch(next)
  )
  .get('/after', (req, res, next) => 
    playerMatchStatService.getPlayerMatchStatsAfter(req.query.timestamp)
    .then(value => res.json(value))
    .catch(next)
  )
  .get('/:id', (req, res, next) =>
    playerMatchStatService
      .getPlayerMatchStatById(req.params.id)
      .then(value => res.json(value))
      .catch(next)
  );

export default router;
