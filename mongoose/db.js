/*
 * @Author: Adam Dang
 * @Description: 使用 mongoose连接db
 * @Date: 2021-01-11 16:39:08
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-01-11 16:39:08
 */

const mongoose = require('mongoose');
const dbhost = 'mongodb://localhost:27017/';
const dbname = 'DATABASE_TEST';

module.exports = {
    connect() {
        mongoose.connect(dbhost + dbname, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        let db = mongoose.connection;
        db.on('error', () => {
            console.error('connection error:');
        });
        db.once('open', callback => {
            console.log('connect success!', callback);
        });
    }
};
