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
        description varchar(1000)
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
    const queryText = 'SELECT (crowd) FROM status';

    const res = await this.client.query(queryText);
    let spliced = res.rows.slice(-10);
    let crowdVals = spliced.reduce((acc, elem) => elem.crowd !== null ? acc += elem.crowd : acc, 0);
    return Math.floor(crowdVals/spliced.length);
  }

  async numRows(){
    const queryText = 'SELECT COUNT(*) FROM status';
    const res = await this.client.query(queryText);
    return Number(res.rows[0].count);
  }

  async getAll(){
    const queryText = 'SELECT * FROM status';
    const res = await this.client.query(queryText);

    return res.rows;
  }

  async getAllDesc(){
    const queryText = 'SELECT * FROM status';
    const res = await this.client.query(queryText);

    return res.rows.map(x => x.description);
  }
}