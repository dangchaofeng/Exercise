# webapck + react 搭建

1. webpack基础搭建

2. 针对jsx进行loader配置
    > npm i @babel/preset-react -D 并且在.babelrc中引入
    ```ASN.1
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    ```

3. 此处使用的垫片填充没有用@bable-polyfill, 而使用的@babel/plugin-transform-runtime，就不会污染全局。
    > npm i @babel/plugin-transform-runtime -D;  npm i @babel/runtime-corejs3 -S
    ```ASN.1
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                // 配置corejs为3，需要预先安装@babel/runtime-corejs3
                // 配置corejs为2，需要预先安装@babel/runtime-corejs2
                // 配置corejs为false，需要预先安装@babel/runtime
                "corejs": 3
            }
        ]
    ]
    ```
4. @babel/plugin-proposal-decorators 用来编译解析装饰器

5. @babel/plugin-proposal-class-properties 用来编译解析class中的静态属性。从Babel v7开始，所有的stage预设都已经弃用了。想要转换预设提案语法，就得安装必要的plugin

6. Img 组件中，使用了【代理模式】，没有直接调用img标签，而是交给Img组件，它自己会在图片加载完成之前，先展示loading组件，当img请求加载好了, 转换为base64， 赋值给src，展示img标签。

7. iconfont 引入：
    - 如果使用Font class引入，则可以在less中直接引入iconfont.css 或者 当成静态资源，在html中引入
    - 如果使用Symbol方式引入， 则可以将iconfont.js 当成静态资源，在html中引入。
    - 如果在index.js 中引入iconfont.js 并且开启了treeshaking功能，则一定要在package.json中sideEffects中配置， 标明iconfont.js有副作用，不能进行treeshaking
