import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

/** A class representing a database to store scores */
export class Database {
  constructor(dburl) {
    this.dburl = dburl;
  }

  async connect() {
    this.pool = new Pool({
      connectionString: this.dburl,
      ssl: {rejectUnauthorized: false}
    });

    this.client = await this.pool.connect();

    await this.init();
  }

  async init() {
    const queryText = `
      create table if not exists scores (
        name varchar(30),
        word varchar(30),
        score integer,
        type_of_score varchar(30)
      ) 
    `;
    
    const res = await this.client.query(queryText);
  }

  async close() {
    this.client.release();
    await this.pool.end();
  }
}