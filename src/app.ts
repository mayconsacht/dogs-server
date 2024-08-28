import express, { Application } from 'express';
import userRoutes from './routes/photoRoutes';

const app: Application = express();

app.use(express.json());

app.use('/api', userRoutes);

export default app;
