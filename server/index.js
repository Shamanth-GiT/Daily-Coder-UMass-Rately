import { Database } from './database.js';
import express from 'express';
import logger from 'morgan';

class StatusServer {
    constructor(dburl) {
        this.dburl = dburl;
        this.app = express();
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(logger('dev'));
        this.app.use('/', express.static('client'));
    }

    async initRoutes() {
        const self = this;

        this.app.post('/status', async (req, res) => {
            const { time, date, floor, crowd, description } = req.query;
            await self.db.saveStatus(time, date, floor, crowd, description);
            res.status(200).json({time: time, date: date, floor: floor, crowd: crowd, description: description});
        });
    }

    async initDb(){
        this.db = new Database(this.dburl);
        await this.db.connect();
    }

    async start(){
        await this.initRoutes();
        await this.initDb();
        const port = process.env.PORT || 3000;

        this.app.listen(port, () => {
            console.log(`StatusServer listening on port ${port}!`);
        });
    }
}

const server = new StatusServer(process.env.DATABASE_URL);
server.start();
