# webapck + 自定义loader

1. 实现自己的cf-less-loader, cf-css-loader, cf-style-loader   【简易版】

2. 只在common配置中引用自己的loader， 效果只有在dev下可以看到。 prod会覆盖common中的配置

3. 自定义loader文件中，module.exports = function(){} 这个函数不可以使用箭头函数， 因为loader内部的api均通过this来调用。

```js
// 直接使用
return string or buffer;
// 同步使用
this.callback(
  err: Error | null,
  content: string | Buffer,
  sourceMap?: SourceMap,
  meta?: any
);

// 异步使用
const callback = this.async();
callback(
  err: Error | null,
  content: string | Buffer,
  sourceMap?: SourceMap,
  meta?: any
);
```

