const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

/*
 * We've enabled MiniCssExtractPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 *
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

const devMode = process.env.NODE_ENV !== 'production';
module.exports = {
    mode: 'development',
    target: devMode ? 'web' : 'browserslist',
    entry: './webapp/index.ts',
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './webapp/index.html',
            title: 'typescript-webpack',
            cache: false
        }),
        new webpack.HotModuleReplacementPlugin()
        // new HardSourceWebpackPlugin(),
        // new HardSourceWebpackPlugin.ExcludeModulePlugin([MiniCssExtractPlugin])
    ],

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: false
                        }
                    }
                ],
                exclude: [path.resolve(__dirname, 'node_modules')]
            },
            {
                test: /\.css$/,
                use: [
                    devMode ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        contentBase: './dist',
        hot: true
    },
    optimization: {
        moduleIds: 'named'
    }
};
