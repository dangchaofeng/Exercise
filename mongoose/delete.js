/*
 * @Author: Adam Dang
 * @Description: 连接mongodb
 * @Date: 2021-01-11 13:50:37
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-01-11 13:50:37
 */

const db = require('./db.js');

// mongoose 的操作都是promise，可以用then链式回调，也可以用async/await 来执行。
// 严格来说必须等待connect连接后，再执行真正的数据库操作
db.connect();

const mongoose = require('mongoose');
const { Schema } = mongoose;

// 定义数据模式
const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: [true, 'Why no age?'],
        max: 120,
        min: 0
    }
});

userSchema.methods.speak = function () {
    const greeting = this.name ? 'My name is ' + this.name : "I don't have a name";
    console.log(greeting);
};

// 生成数据模型【类】,数据库中表名为 users
const User = mongoose.model('users', userSchema);

// 根据条件批量删除
(async () => {
    try {
        const res = await User.remove({});
        console.log(res, 'remove success');
    } catch (e) {
        console.error(e, 'remove  error');
    }
})();

// 根据不同的id批量删除
(async () => {
    try {
        const res = await User.remove({
            _id: { $in: ['5ffd67da7d0fe87e8443bb01', '5ffd6743d279df390d0c093d'] }
        });
        console.log(res, 'remove success');
    } catch (e) {
        console.error(e, 'remove  error');
    }
})();

// 条件或的查询删除
(async () => {
    try {
        const res = await User.remove({
            $or: [{ _id: '5ffd6761badc0e719ce51cc0' }, { name: 'kiven11' }]
        });
        console.log(res, 'remove success');
    } catch (e) {
        console.error(e, 'remove  error');
    }
})();
