/*
 * @Author: Adam Dang
 * @Description: 后台代码, Koa实现
 * @Date: 2021-01-13 11:15:53
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-01-13 11:15:53
 */
const Koa = require('koa2');
const app = new Koa();

// 加载静态资源
const path = require('path');
const static = require('koa-static');
const staticSource = static(path.join(__dirname, 'webapp'));

// 加载路由
const router = require('./router');

// 引入db 连接
const db = require('./db');
db.connect();

// 引入解析body中间件(post,put请求会用到)
const koaBody = require('koa-body');

// 错误监听
app.on('error', (err, ctx) => {
    console.error(err);
    ctx.body = {
        status: false
    };
});

// 启用中间件
app.use(koaBody({ strict: false }));
app.use(staticSource);
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);
