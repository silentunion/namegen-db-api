const Router = require('koa-router');
const bodyParser = require('koa-body')();

const database = require('./../database/database');
const inserts = require('./../queries/inserts')

const router = Router();

router.get('/', async ctx => { ctx.status = 200; });

router.get('/letters', async ctx => {
    ctx.body = await database.query(
        `SELECT * FROM ng.letters`)
    .then(c => c.rows)
    });

router.get('/letters/freq', async ctx => {
    ctx.body = await database.query(
        `SELECT letter, frequency, is_vowel
        FROM ng.letters
        JOIN ng.statistics USING (part_id);`)
    .then(c => c.rows)
    });

router.post('/parts', bodyParser, async ctx => {
    const ack = await inserts.insert_parts(ctx.request.body);
    ctx.body = ack;
    });
        

module.exports = router;