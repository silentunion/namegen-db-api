const Koa = require('koa');
const router = require('./../routes/routes');
const ResponseTime = require('koa-response-time');
const Morgan = require('koa-morgan');
const cors = require('@koa/cors');

const db = require('./../database/database');

const app = new Koa();

app.use(cors());
app.use(ResponseTime());
app.use(Morgan('combined'));
app.use(router.routes());

exports.start = async function () {
    try {
        await db.start();
        console.log('Database connected');
        this.server = await app.listen(8666);
        console.log('Listening on port 8666');
    } catch (error) {
        console.log(error);
    }
};

exports.close = async function () {
    console.log('Shutting down...');
    await this.server.close();
    await db.close();
    console.log('Shutdown complete');
};