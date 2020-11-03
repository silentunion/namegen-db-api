const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

let users = [
    {
        name: 'Bob',
        email: 'bob@bob.com'
    },
    {
        name: 'Jane',
        email: 'iamalover@ap.com'
    },
    {
        name: 'Duke',
        email: 'allouttagum@forever.com'
    },
];

router.get('/', ctx => {
    ctx.body = users[ctx.params.id];
});

app.use(router.allowedMethods())
    .use(router.routes())
    .use(require('koa-body')());

app.listen(8000);
