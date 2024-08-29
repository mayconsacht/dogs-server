import express, { Application } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import photoRoutes from './routes/photoRoutes';
import loginRoutes from './routes/loginRoutes';
import userRoutes from './routes/userRoutes';
import authorizationRoutes from './routes/authorizationRoutes';

dotenv.config();

const app: Application = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Authorization, Content-Type',
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());

app.use('/api/photo', photoRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/user', userRoutes);
app.use('/api/token', authorizationRoutes);

export default app;
