/*
 * @Author: Adam Dang
 * @Description: 遍历文件目录
 * @Date: 2021-03-24 16:54:35
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-03-24 16:54:58
 */

const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html文件

/**
 * 【遍历某文件下的文件目录】
 *
 * @param {String} path 路径
 * @returns {Array} ["about","index"]
 */
function getFilePath(path) {
    let fileArr = [];
    let existpath = fs.existsSync(path); //是否存在目录
    if (existpath) {
        let readdirSync = fs.readdirSync(path); //获取目录下所有文件
        readdirSync.map(item => {
            let currentPath = path + '/' + item;
            let isDirector = fs.statSync(currentPath).isDirectory(); //判断是不是一个文件夹
            if (isDirector && item !== 'component') {
                // component目录下为组件 需要排除
                fileArr.push(item);
            }
        });
        return fileArr;
    }
}

/**
 * 【获取entry文件入口】
 *
 * @param {String} path 引入根路径
 * @returns {Object} 返回的entry { "about/aoubt":"./src/about/about.js",...}
 */
function getEntry(path) {
    let entry = {};
    getFilePath(path).map(item => {
        /**
         * 下面输出格式为{"about/about":"./src/aobout/index.js"}
         * 这样目的是为了将js打包到对应的文件夹下
         */
        entry[`${item}/${item}`] = `${path}/${item}/index.js`;
    });
    return entry;
}

function getHtmlPlugin(filePath) {
    const htmlPlugins = getFilePath(filePath).map(item => {
        return new HtmlWebpackPlugin({
            template: `${filePath}/${item}/index.html`,
            title: `${item}`, // * 同时，在模板中的title标签中配置模板语法
            chunks: [`${item}/${item}`],
            favicon: path.resolve(__dirname, './webapp/public/favicon.ico'),
            filename: item == 'index' ? 'index.html' : `${item}/index.html`, //html位置
            minify: {
                //压缩html
                collapseWhitespace: true,
                preserveLineBreaks: true
            }
        });
    });
    return htmlPlugins;
}
module.exports = {
    getEntry,
    getHtmlPlugin
};
