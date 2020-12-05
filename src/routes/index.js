const Router = require('koa-router');

const router = Router();
router.get('/', async ctx => {
    ctx.status = 200;
    console.log(ctx.status);
});

module.exports = router;