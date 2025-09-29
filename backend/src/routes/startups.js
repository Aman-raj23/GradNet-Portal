import { Router } from 'express';
import { startups } from '../data/mockData.js';
import { requireAuth, requireRole, errorHandler } from '../middleware/auth.js';

const router = Router();

router.get('/', (_req, res) => res.json(startups));

router.post('/', requireAuth, requireRole('alumni','admin'), (req, res) => {
  const id = 's' + (startups.length + 1);
  const item = { id, name: req.body.name, founders: [req.user.id], stage: req.body.stage||'Idea', city: req.body.city||'' };
  startups.push(item);
  res.status(201).json(item);
});

router.use(errorHandler);
export default router;
