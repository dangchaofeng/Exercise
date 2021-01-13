/*
 * @Author: Adam Dang
 * @Description: 定义数据模型
 * @Date: 2021-01-13 14:04:06
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-01-13 14:04:06
 */
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: String,
    age: Number,
    address: String
});

const User = model('users', userSchema);

exports.User = User;
