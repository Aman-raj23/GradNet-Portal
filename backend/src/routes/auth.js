import { Router } from 'express';
import { users } from '../data/mockData.js';
import { issueToken, errorHandler, requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/login', (req, res, next) => {
  try {
    const { email, role } = req.body;
    const found = users.find(u => u.email === email && (!role || u.role === role));
    if (!found) return next({ status: 401, message: 'Invalid credentials for prototype' });
    const token = issueToken(found);
    res.json({ token, user: found });
  } catch (e) {
    next(e);
  }
});

router.put('/me', requireAuth, (req, res, next) => {
  try {
    const idx = users.findIndex(u => u.id === req.user.id)
    if (idx === -1) return next({ status: 404, message: 'User not found' })
    const allowed = ['name','year','major','city','industry']
    for (const k of allowed) {
      if (k in req.body) users[idx][k] = req.body[k]
    }
    res.json(users[idx])
  } catch (e) { next(e) }
});

router.use(errorHandler);
export default router;
