import express, { Application } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import photoRoutes from './routes/photoRoutes';
import loginRoutes from './routes/loginRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Application = express();

app.use(
  cors({
    origin: 'https://dogs.mayconsacht.com',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Authorization, Content-Type',
  })
);

app.use(express.json());

app.use('/api/photo', photoRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/user', userRoutes);

export default app;
