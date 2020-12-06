const Router = require('koa-router');
const database = require('./../database/database');

const router = Router();

router.get('/', async ctx => { ctx.status = 200; });

router.get('/test', async ctx => {
    ctx.body = await database.query('SELECT letter FROM ng.letters')
        .then(c => c.rows)
        });

module.exports = router;