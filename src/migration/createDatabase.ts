import { Kysely, sql } from 'kysely';
import { Database } from '../models/types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('photo')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('author', 'varchar', (col) => col.notNull())
    .addColumn('date', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('src', 'varchar', (col) => col.notNull())
    .addColumn('weight', 'integer')
    .addColumn('age', 'integer')
    .addColumn('totalAccess', 'integer')
    .addColumn('totalComments', 'integer')
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('photo').execute();
}
