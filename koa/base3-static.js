/*
 * @Author: Adam Dang
 * @Description: 实际开发中，页面当以模板的方式加载进来返回给浏览器
 * @Date: 2021-01-08 13:39:25
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-01-08 13:39:25
 */
const Koa = require('koa2');
const app = new Koa();
const static = require('koa-static');
const path = require('path');

const main = static(path.join(__dirname));

app.use(main);
app.listen(3000);
