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
        `SELECT part, frequency, property, location
        FROM namegen.parts
        JOIN namegen.collection_parts USING(part_id)
        JOIN namegen.collections USING(col_id)
        JOIN namegen.languages USING(lang_id)
        JOIN namegen.themes USING(theme_id)
        JOIN namegen.part_properties USING(cp_id)
        JOIN namegen.properties USING(prop_id)
        WHERE category='letters'
          AND language='English US'
          AND theme='Top 3000 Words';`)
    .then(c => c.rows)
    });

router.get('/clusters/freq', async ctx => {
    ctx.body = await database.query(
        `SELECT part, frequency, property, location
        FROM namegen.parts
        JOIN namegen.collection_parts USING(part_id)
        JOIN namegen.collections USING(col_id)
        JOIN namegen.languages USING(lang_id)
        JOIN namegen.themes USING(theme_id)
        JOIN namegen.part_properties USING(cp_id)
        JOIN namegen.properties USING(prop_id)
        WHERE category='clusters'
          AND language='English US'
          AND theme='Top 3000 Words';`)
    .then(c => c.rows)
    });

// router.post('/login', async ctx => {
//     authenticate(this);
// })

module.exports = router;