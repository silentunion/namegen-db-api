const Router = require('koa-router');
const database = require('./../database/database');

const router = Router();

router.post('/test')

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
        

module.exports = router;