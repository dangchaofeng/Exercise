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

// 根据User【类】创建一个user实例
const user = new User({ name: '党超峰' });

// then回调
// user.save()
//     .then(res => {
//         console.log(res, 'success');
//         res.speak();
//     })
//     .catch(e => {
//         console.error(e, 'error');
//     });

// async/await // 不是很推荐，.catch捕获一次错误，又要同时判断res是否存在，如果catch了，根本不用走到下面的代码才对
// (async () => {
//     const res = await user.save().catch(e => {
//         console.error(e, 'error');
//     });
//     if (res) {
//         console.log(res, 'success');
//         res.speak();
//     }
// })();

// * 推荐写法，try catch 捕获，async/await 同步写法
(async () => {
    try {
        const res = await user.save();
        console.log(res, 'success');
        res.speak();
    } catch (e) {
        console.error(e, 'error111');
    }
})();

(async () => {
    try {
        const res = await User.create({
            name: 'kiven',
            age: '30'
        });
        console.log(res, 'success');
        res.speak();
    } catch (e) {
        console.error(e.errors, 'error222');
    }
})();
