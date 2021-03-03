# typescript 练习

1. typescript 功能语法练习
    
> practice 目录下
    
2. 编译配置练习
    
> tsconfig.json
    
3. 本地调试运行可以直接使用ts-node 来运行ts文件
    
> 如果报错找不到声明文件中的namespace，则需要在tsconfig.json那一层调用命令： `ts-node --files *.ts`
    
4. webpack集成， ts编译， babel-polyfill的增加集成
    - base 环境
    
      ```js
      {
      // 入口， 推荐使用对象
          entry: { },
          // 输出配置
          output: { },
          // 模块处理
          module: {
              rules: [
                  // * 第一： 最重要的是给自己的js、ts、jsx等配置loader,babel,polyfill
      
                  // * 第二： 其次给自己的less/sass等样式等配置loader
      
                  // * 第三： 还有给自己默认的css配置loader处理解析
                  
                  // * 第四： 给img配置url-loader处理
                  
                  // * 最后： 给字体图标资源配置file-loader处理， 会分离出字体文件
                  
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
      ```
    
      
    
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
    
    - `tsconfig.json` 文件， webpack-env是为了解决一些变量不存在的报错引入的【module.hot】
    
      ```json
      {
          "compilerOptions": {
              "module": "es6",
              "target": "es5",
              "sourceMap": true,
              "noEmit": false,
              "downlevelIteration": true,
              "checkJs": false,
              "allowJs": true,
              "lib": ["dom", "es5", "es2016"],
              "allowSyntheticDefaultImports": true,
              "noImplicitAny": true,
              "types": ["webpack-env"]
          },
          "include": ["./webapp/**/*.ts", "./typings/**/*.ts"],
          "exclude": ["./node_modules/**/*"]
      }
      
      ```
    
    - `package.json` 文件， 此部分较重要的内容
    
      ```json
      {
          "scripts": {
              "build": "webpack --env production --config ./webpack.common.js",
              "dev": "webpack serve --config ./webpack.common.js"
          },
      	"sideEffects": [
              "*.css",
              "*.less",
              "@babel/polyfill"
          ],
      }
      ```
    
      
    

