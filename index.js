/*
 * @Author: Adam Dang
 * @Description:
 * @Date: 2021-01-07 17:32:58
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-01-07 17:40:19
 */
const Koa = require('koa2');
const Router = require('koa-router');
const static = require('koa-static');

const router = new Router();
const app = new Koa();

app.use(static(__dirname + '/'));
// app.use(router.routes());
app.listen(3000);
