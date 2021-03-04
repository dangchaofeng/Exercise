// * prod 的时候， css，less需要重新配置压缩单独提取
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            // * 第二： 其次给自己的less/sass等样式等配置loader
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },

            // * 第三： 还有给自己默认的css配置loader处理解析
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css'
        })
    ]
};

module.exports = prodConfig;
