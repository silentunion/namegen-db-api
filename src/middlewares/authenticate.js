const jwt = require('koa-jwt');

module.exports = function (ctx) {
    if (ctx.request.body.password === 'password123') {
        ctx.status = 200;
        ctx.body = {
            token: jwt.toString({ role: 'admin' }, 'Test key'),
            message: "Successfully logged in!"
        };
    } else {
        ctx.status = ctx.status = 401;
        ctx.body = {
            message: "Who are you? Get out of here!"
        };
    }
    return ctx;
}