# grunt

- 使用include-all 来动态加载所有的grunt任务和命令

- 将命令集中划分到tasks目录中，config为配置， register为注册

## 主要命令如下：
> 查看tasks/register/build.js
- 'less' 编译
- 'autoprefixer' 自动补全兼容
- 'clean:build' 清除dist目录
- 'babel' 进行babel转义，语法、polyfill都在此处定义
- 'browserify' 浏览器兼容，浏览器不识别polyfill填充的require/import等语法，需要进行兼容
- 'copy:copyToDist' 复制迁移文件
- 'clean:cleanBabel' 清除中间生成的目录