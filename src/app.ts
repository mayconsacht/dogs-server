import express, { Application } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

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

const routesPath = path.join(__dirname, 'routes');

fs.readdirSync(routesPath).forEach((file) => {
  const route = require(path.join(routesPath, file)).default;

  app.use('/api', route);
});

export default app;
