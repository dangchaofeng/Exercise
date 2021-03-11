/*
 * @Author: Adam Dang
 * @Description:
 * @Date: 2021-03-11 16:41:47
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-03-11 16:41:47
 */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const analyzeConfig = {
    plugins: [new BundleAnalyzerPlugin()]
};

module.exports = analyzeConfig;
