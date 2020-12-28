const Router = require('koa-router');
const bodyParser = require('koa-body')();

const database = require('./../database/database');
const jwt = require('./../middlewares/jwt');
const authenticate = require('./../middlewares/authenticate');
const posts = require('./../functions/posts');

const router = Router();

router.get('/', async ctx => { ctx.status = 200; });

router.get('/letters', async ctx => {
    ctx.body = await database.query(
        `SELECT * FROM namegen.parts`)
    .then(c => c.rows)
    });

router.get('/letters/freq', async ctx => {
    ctx.body = await database.query(
        `SELECT part, frequency, property
        FROM namegen.parts
        JOIN namegen.collection_parts USING(part_id)
        JOIN namegen.collections USING(col_id)
        JOIN namegen.part_properties USING(cp_id)
        JOIN namegen.properties USING(prop_id)
        JOIN namegen.part_statistics USING(cp_id)
        WHERE collection='English Basic';`)
    .then(c => c.rows)
    });

// router.post('/login', async ctx => {
//     authenticate(this);
// })

module.exports = router;