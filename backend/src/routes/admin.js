import { Router } from 'express';
import { users, events, jobs } from '../data/mockData.js';
import { requireAuth, requireRole, errorHandler } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth, requireRole('admin'));

router.get('/stats', (_req, res) => {
  res.json({
    users: users.length,
    alumni: users.filter(u=>u.role==='alumni').length,
    students: users.filter(u=>u.role==='student').length,
    employers: users.filter(u=>u.role==='employer').length,
    institutes: users.filter(u=>u.role==='institute').length,
    jobs: jobs.length,
    events: events.length
  });
});

router.get('/users', (_req, res) => res.json(users));

router.post('/events', (req, res) => {
  const id = 'e' + (events.length + 1);
  const event = { id, title: req.body.title, date: req.body.date, image: '', location: req.body.location, status: 'upcoming' };
  events.push(event);
  res.status(201).json(event);
});

router.delete('/users/:id', (req, res, next) => {
  const idx = users.findIndex(u => u.id === req.params.id)
  if (idx === -1) return next({ status: 404, message: 'User not found' })
  const role = users[idx].role
  if (!['alumni','student','employer'].includes(role)) return next({ status: 400, message: 'Cannot delete this role' })
  const removed = users.splice(idx, 1)[0]
  res.json({ removed })
});

router.use(errorHandler);
export default router;
