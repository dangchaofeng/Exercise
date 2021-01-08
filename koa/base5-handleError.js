/*
 * @Author: Adam Dang
 * @Description: 处理错误, app.on('error',()=>{});
 * @Date: 2021-01-08 13:52:48
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-01-08 13:52:48
 */
const Koa = require('koa2');
const Router = require('koa-router');
const static = require('koa-static');
const path = require('path');
const app = new Koa();
const router = new Router();

router.get('/getTokens', ctx => {
    ctx.throw(500);
    // ctx.body = {
    //     token: '123'
    // };
});

router.post('/setTokens', ctx => {
    ctx.body = {
        success: true
    };
});

app.use(static(path.join(__dirname)));

// 启用路由
app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err, ctx) => {
    console.error('server error', err);
});

app.listen(3000);
