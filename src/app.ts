import express, { Application } from 'express';
import userRoutes from './routes/photoRoutes';
import * as dotenv from 'dotenv';

const app: Application = express();

app.use(express.json());

app.use('/api', userRoutes);

export default app;
