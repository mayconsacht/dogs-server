import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import photoRoutes from './routes/photoRoutes';
import userRoutes from './routes/userRoutes';
import authorizationRoutes from './routes/authorizationRoutes';
import cors from 'cors';

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

if (`${process.env.NODE_ENV}` === 'development') {
  app.use(
    cors({
      origin: 'http://localhost:3001',
    })
  );
}

app.use('/api/photo', photoRoutes);
app.use('/api/user', userRoutes);
app.use('/api/token', authorizationRoutes);

export default app;
