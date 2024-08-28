import { Database } from '../models/types'; // this is the Database interface we defined earlier
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import * as dotenv from 'dotenv';

dotenv.config();

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
