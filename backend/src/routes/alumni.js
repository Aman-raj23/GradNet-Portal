import { Router } from 'express';
import { getAlumni } from '../data/mockData.js';
import { errorHandler } from '../middleware/auth.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(getAlumni());
});

router.get('/search', (req, res) => {
  const { q = '', year, major, industry, city } = req.query;
  const ql = q.toLowerCase();
  const filtered = getAlumni().filter(a =>
    (!q || a.name.toLowerCase().includes(ql)) &&
    (!year || String(a.year) === String(year)) &&
    (!major || (a.major||'').toLowerCase().includes(String(major).toLowerCase())) &&
    (!industry || (a.industry||'').toLowerCase().includes(String(industry).toLowerCase())) &&
    (!city || (a.city||'').toLowerCase().includes(String(city).toLowerCase()))
  );
  res.json(filtered);
});

router.get('/:id', (req, res, next) => {
  const item = getAlumni().find(a => a.id === req.params.id)
  if (!item) return next({ status: 404, message: 'Alumni not found' })
  res.json(item)
});

router.use(errorHandler);
export default router;
