/*
 * @Author: Adam Dang
 * @Description: 实际开发中，页面当以模板的方式加载进来返回给浏览器
 * @Date: 2021-01-08 13:39:25
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-01-08 13:39:25
 */
const Koa = require('koa2');
const app = new Koa();
const fs = require('fs');

const main = (ctx, next) => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./index.html');
    next();
};

app.use(main);
app.listen(3000);
