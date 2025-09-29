import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRouter from './src/routes/auth.js';
import alumniRouter from './src/routes/alumni.js';
import jobsRouter from './src/routes/jobs.js';
import eventsRouter from './src/routes/events.js';
import postsRouter from './src/routes/posts.js';
import startupsRouter from './src/routes/startups.js';
import adminRouter from './src/routes/admin.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ name: 'GradNet API', status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/alumni', alumniRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/startups', startupsRouter);
app.use('/api/admin', adminRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`GradNet API running at http://localhost:${PORT}`);
});
