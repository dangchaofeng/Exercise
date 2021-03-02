# typescript 练习

1. typescript 功能语法练习
    
> practice 目录下
    
2. 编译配置练习
    
> tsconfig.json
    
3. 集成polyfill练习
    
> 默认tsc转换是转义语法了的，但是polyfill：得靠自己想办法填充垫片
    
4. webpack集成
    - base 环境
    
    - `.babelrc` 文件
    
  ```ASN.1
      // babel转义配置，此配置按需引入polyfill
      // npm i @babel/core @babel/polyfill @babel/preset-env core-js -D
      {
          "presets": [
              [
                  "@babel/preset-env",
                  {
                      "useBuiltIns": "usage",
                      "corejs": "3" // 如果要用3， 就必须安装core-js: 3 版本
                  }
              ]
          ],
          "plugins": [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }]
          ]
      }
      
      ```
    
    - `.browserslistrc` 文件
    
      ```ASN.1
      // babel转义需要此配置， post-css自动添加前缀也需要此配置
      last 2 versions
      > 1%
      iOS 7
      last 3 iOS versions
      ```
    
    - `postcss.config.js` 文件
    
      ```js
      // 为css自动添加前缀， 适配不同浏览器
      // npm i css-loader autoprefixer -D
      module.exports = {
          plugins: [require('autoprefixer')]
      };
      ```
    
      
    
    - `webpack.dev.js`文件
    
      ```js
      // webpack 开发配置文件
      const path = require('path');
      const webpack = require('webpack');
      const { CleanWebpackPlugin } = require('clean-webpack-plugin');
      const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
      const MiniCssExtractPlugin = require('mini-css-extract-plugin');
      const HtmlWebpackPlugin = require('html-webpack-plugin');
      
      const devMode = process.env.NODE_ENV !== 'production';
      module.exports = {
          mode: 'development',
          target: devMode ? 'web' : 'browserslist',
          entry: './webapp/index.ts',
          devtool: 'cheap-module-eval-source-map',
          output: {
              filename: '[name]_[hash:8].js',
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
              // new HardSourceWebpackPlugin(), webpack5 有问题
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
      
      ```
    
      
    
5. 本地调试运行可以直接使用ts-node 来运行ts文件
    
    > 如果报错找不到声明文件中的namespace，则需要在tsconfig.json那一层调用命令： `ts-node --files *.ts`

