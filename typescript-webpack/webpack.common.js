const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const { merge } = require('webpack-merge');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');

const commonConfig = {
    // 入口， 推荐使用对象
    entry: {
        index: './webapp/src/index.ts'
        // practice: './webapp/practice/*.ts'
    },
    // 输出配置
    output: {
        filename: '[name].[contenthash:8].js',
        path: path.resolve(__dirname, 'dist') // * 必须是绝对路径
        // publicPath: 'www.baidu.com/' // * 一般在prod可能会根据所需设置此属性，它会在所有路径下添加前缀 www.baidu.com 来请求资源
    },
    // 模块处理
    module: {
        rules: [
            // * 第一： 最重要的是给自己的js、ts、jsx等配置loader,babel,polyfill
            {
                test: /\.(ts|tsx)$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: [path.resolve(__dirname, 'node_modules')]
            },

            // * 第二： 其次给自己的less/sass等样式等配置loader
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },

            // * 第三： 还有给自己默认的css配置loader处理解析
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },

            // * 第四： 给img配置loader处理
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]',
                        outputPath: 'static/images/',
                        limit: 1024 * 15
                    }
                }
            },

            // * 最后： 给字体图标资源配置loader处理
            {
                // 处理引入字体图标资源所需loader安装指令：npm install file-loader -D
                test: /(\.(ttf|woff|eot)$|iconfont\.svg)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[hash:10].[ext]',
                        outputPath: 'static/font/'
                    }
                }
            }
        ]
    },
    // webpack 插件
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        // copy 迁移静态资源
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'webapp', 'public'),
                    to: path.resolve(__dirname, 'dist', 'public')
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: './webapp/index.html',
            title: 'typescript-webpack', // * 同时，在模板中的title标签中配置模板语法
            cache: false,
            favicon: path.resolve(__dirname, './webapp/public/favicon.ico')
        })
        // new HardSourceWebpackPlugin() // * 优化，资源缓存，除了第一次，后续打包效率加快 【webpack5 当前有bug 2021-03-03】
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    // 优化属性
    optimization: {
        moduleIds: 'named',
        // treeshaking【树摇】， 将定义但是没有引用的export在打包的时候删除, 同时需要在package.json中提供sideEffects属性，false or ['*.css', '*.less']
        usedExports: true,
        // 提取公共代码出来
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                defaultVendors: {
                    filename: 'vendors.[hash:8].js'
                }
            }
        }
    }
};

module.exports = env => {
    console.log('mode:', env.production);
    // webpack5 target 默认不是web
    commonConfig.target = env.production ? 'browserslist' : 'web';
    if (env && env.production) {
        return merge(commonConfig, prodConfig);
    } else {
        return merge(commonConfig, devConfig);
    }
};
