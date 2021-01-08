/*
 * @Author: Adam Dang
 * @Description: Koa的基本用法，启动和中间件的使用
 * @Date: 2021-01-08 10:48:22
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-01-08 11:26:01
 */

const Koa = require('koa2');
const app = new Koa();

// 中间件， ctx=> context上下文
const main = (ctx, next) => {
    ctx.response.type = 'html';
    ctx.response.body = '<p style="color: red">Hello World</p>';

    // 只有使用了next()；中间件在use的时候，才会穿透走下一个中间件
    next();
};

const log = (ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    next();
};

app.use(log);
app.use(main);

app.listen(3000);
