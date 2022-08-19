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
      create table if not exists status (
        time varchar(30),
        date varchar(30),
        floor integer,
        crowd integer,
        description varchar(30)
      ) 
    `;
    
    const res = await this.client.query(queryText);
  }

  async close() {
    this.client.release();
    await this.pool.end();
  }

  async saveStatus(time, date, floor, crowd, desc){
    const queryText = 
        'INSERT INTO status (time, date, floor, crowd, description) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    
    const res = await this.client.query(queryText, [time, date, floor, crowd, desc]);
    return res.rows;
  }

  async avgCrowd(){
    const queryText = 'SELECT AVG (crowd) FROM status';

    const res = await this.client.query(queryText);
    return res.rows;
  }

  async getAll(){
    const queryText = 'SELECT * FROM status LIMIT 10';
    const res = await this.client.query(queryText);

    return res.rows;
  }
}