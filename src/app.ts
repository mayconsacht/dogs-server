import express, { Application } from 'express';
import userRoutes from './routes/photoRoutes';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(
  cors({
    origin: 'https://dogs.mayconsacht.com',
    methods: 'POST, GET, PUT, DELETE',
    allowedHeaders: 'Authorization, Content-Type',
  }),
  express.json()
);

app.use('/api', userRoutes);

export default app;
