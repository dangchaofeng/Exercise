import React from 'react';
import ReactDom from 'react-dom';
import '../../assets/less/index.less';
import { a } from './a.js';
console.log(a);
console.log('login');
ReactDom.render(<div className="blue">登录界面</div>, document.querySelector('#root'));

// 报错module.hot没有，需要npm i @types/webpack-env -D，并且在tsconfig 中的compilerOptions下添加 "types": ["webpack-env"]
if (module.hot) {
    module.hot.accept();
}
