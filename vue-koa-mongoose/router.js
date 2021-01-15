/*
 * @Author: Adam Dang
 * @Description: 定义路由
 * @Date: 2021-01-13 11:20:02
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-01-13 20:32:36
 */
const Router = require('koa-router');
const router = new Router();

const { User } = require('./model');

router.get('/vue/table', async (ctx, next) => {
    const { name } = ctx.query;
    console.log('params-name', name);
    const list = await User.find(name ? { name } : {});
    // ctx.body = {
    //     status: true,
    //     data: list
    // };
    ctx.throw(500);
});

router.post('/vue/table', async (ctx, next) => {
    const { name, age, address } = ctx.request.body;
    console.log(ctx.request.body, 'add method');
    await User.create({ name, age, address });
    ctx.body = {
        status: true,
        data: [{ name, age, address }]
    };
});

router.put('/vue/table', async (ctx, next) => {
    const { _id, name, age, address } = ctx.request.body;
    console.log(ctx.request.body, 'put method');
    await User.findByIdAndUpdate(_id, { name, age, address });
    ctx.body = {
        status: true,
        data: [{ name, age, address }]
    };
});

router.delete('/vue/table', async (ctx, next) => {
    const { _id } = ctx.request.body;
    console.log(ctx.request.body, 'delete');
    await User.remove({ _id: { $in: _id } });
    ctx.body = {
        status: true,
        data: _id
    };
});

module.exports = router;
