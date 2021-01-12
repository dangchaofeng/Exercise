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

// 查询所有的内容，跳过5个文档，最大查询10条数据
(async () => {
    try {
        const res = await User.find().skip(5).limit(10).updateMany({ age: 0 });
        console.log(res, 'result');
    } catch (e) {
        console.error(e.errors, 'error222');
    }
})();

// 定向查询： 根据唯一id查询
(async () => {
    try {
        const res = await User.findById('5ffd584f53e42f73703a7a34');
        console.log(res, '5ffd584f53e42f73703a7a34');
    } catch (e) {
        console.error(e.errors, 'error222');
    }
})();

// 定向查询： 根据条件只查询某一条数据
(async () => {
    try {
        const res = await User.findOne({ name: 'sarah' });
        console.log(res, 'sarah');
    } catch (e) {
        console.error(e.errors, 'error222');
    }
})();

// 定向查询并更改： 根据唯一id
(async () => {
    try {
        const res = await User.findByIdAndUpdate('5ffd584f53e42f73703a7a34', {
            name: 'grandfater',
            age: 60
        });
        console.log(res, 'update name');
    } catch (e) {
        console.error(e.errors, 'error222');
    }
})();
