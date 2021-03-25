const webpack = require('webpack');
const path = require('path');

const devConfig = {
    mode: 'development', // * 当前的模式： dev模式还是prod模式
    devtool: 'eval-cheap-module-source-map',
    plugins: [new webpack.HotModuleReplacementPlugin()],
    // 本地服务启动， 会不生成实际的dist，只存在于缓存中， hot是热更新功能
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        open: true, // * 默认启动打开浏览器
        port: '8081',
        hot: true,
        hotOnly: true
        // proxy: {
        //   "/api": {
        //     target: "http://localhost:9092"
        //   }
        // }
    }
};

module.exports = devConfig;
