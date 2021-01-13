/*
 * @Author: Adam Dang
 * @Description:
 * @Date: 2021-01-13 11:19:58
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-01-13 11:19:58
 */

const mongoose = require('mongoose');
const dbhost = 'mongodb://localhost:27017/';
const dbname = 'vue';
const connect = () => {
    mongoose.connect(dbhost + dbname, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;
    db.on('error', err => console.error(err));
    db.on('open', cb => console.log('mongodb connected'));
};

module.exports = {
    connect
};
