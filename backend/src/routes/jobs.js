import { Router } from 'express';
import { jobs } from '../data/mockData.js';
import { requireAuth, requireRole, errorHandler } from '../middleware/auth.js';

const router = Router();

router.get('/', (_req, res) => res.json(jobs));

router.post('/', requireAuth, requireRole('alumni','employer','admin'), (req, res) => {
  const { title, company, city, type } = req.body;
  const id = 'j' + (jobs.length + 1);
  const job = { id, title, company, city, type, postedBy: req.user.id, postedAt: new Date().toISOString().slice(0,10) };
  jobs.push(job);
  res.status(201).json(job);
});

router.use(errorHandler);
export default router;
