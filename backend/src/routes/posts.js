import { Router } from 'express';
import { posts } from '../data/mockData.js';
import { requireAuth, errorHandler } from '../middleware/auth.js';

const router = Router();

router.get('/', (_req, res) => res.json(posts));

router.post('/', requireAuth, (req, res) => {
  const id = 'p' + (posts.length + 1);
  const post = { id, authorId: req.user.id, content: req.body.content, likes: 0, comments: 0, createdAt: new Date().toISOString() };
  posts.push(post);
  res.status(201).json(post);
});

router.use(errorHandler);
export default router;
