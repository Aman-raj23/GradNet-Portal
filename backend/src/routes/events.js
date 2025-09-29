import { Router } from 'express';
import { events } from '../data/mockData.js';
import { requireAuth, requireRole, errorHandler } from '../middleware/auth.js';

const router = Router();

router.get('/', (_req, res) => res.json(events));

router.post('/', requireAuth, requireRole('admin','institute'), (req, res) => {
  const { title, date, image, location } = req.body;
  const id = 'e' + (events.length + 1);
  const event = { id, title, date, image: image||'', location, status: 'upcoming' };
  events.push(event);
  res.status(201).json(event);
});

router.use(errorHandler);
export default router;
