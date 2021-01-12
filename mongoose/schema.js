/*
 * @Author: Adam Dang
 * @Description: 连接mongodb Cat table, 定义数据模式，并且使用updateOne API来更新数据，并且运行模式中定义的校验器
 * @Date: 2021-01-11 13:50:37
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-01-11 13:50:37
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

// 定义数据模式
const catSchema = Schema({
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

// 连接数据库
mongoose.connect('mongodb://localhost:27017/Cat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 定义model类
const Cat = mongoose.model('Cat', catSchema);

(async () => {
    // 失败， 因为name必填
    await Cat.updateOne(
        {},
        { name: '', age: 16 },
        { upsert: true, runValidators: true, strict: true, safe: true, context: 'query' }, // upsert： 当没有找到的时候，会insert一条数据； runValidators: 运行校验器
        err => {
            console.error(err, 'Invalid  name ');
        }
    );
})();

(async () => {
    // 失败，因为age必填
    await Cat.updateOne(
        {},
        { name: 'woman', age: null },
        { upsert: true, runValidators: true, strict: true, safe: true, context: 'query' }, // upsert： 当没有找到的时候，会insert一条数据； runValidators: 运行校验器
        err => {
            console.error(err, 'Invalid  age');
        }
    );
})();

(async () => {
    // 成功，name， age都有，并且符合Schema规则
    await Cat.updateOne(
        {},
        { name: 'woman', age: 16 },
        { upsert: true, runValidators: true, strict: true, safe: true, context: 'query' }, // upsert： 当没有找到的时候，会insert一条数据； runValidators: 运行校验器
        err => {
            console.error(err, 'Invalid');
        }
    );
})();

// const cat = new Cat();
// cat.save(function (error) {
//     console.log(error.errors['name'].message, 'Path `name` is required.');

//     error = cat.validateSync();
//     console.log(error.errors['name'].message, 'Path `name` is required.');
//     console.log(error.errors['age'].message, 'Path `name` is required.');
// });
