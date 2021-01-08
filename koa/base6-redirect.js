/*
 * @Author: Adam Dang
 * @Description: 重定向路由
 * @Date: 2021-01-08 14:25:38
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-01-08 14:25:38
 */

const Koa = require('koa2');
const Router = require('koa-router');
const static = require('koa-static');
const path = require('path');
const app = new Koa();
const router = new Router();

router.get('/getTokens', ctx => {
    ctx.body = {
        token: '123'
    };
});

router.post('/setTokens', ctx => {
    ctx.body = {
        success: true
    };
});

// 重定向到其他url上
router.get('/redirect', ctx => {
    ctx.redirect('getTokens');
});

app.use(static(path.join(__dirname)));

// 启用路由
app.use(router.routes());
// * 自动识别405等返回。
// * /noAPI , 只有post ，没有 delete方法，页面触发delete，就会直接405
app.use(router.allowedMethods());

app.listen(3000);
