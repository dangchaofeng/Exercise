import React from 'react';
import ReactDom from 'react-dom';
import './assets/less/index.less';
import Img from './component/Img';

ReactDom.render(
    <Img
        src="../public/headImg.jpg"
        onClick={() => {
            alert('click');
        }}
        age="12"
    ></Img>,
    document.querySelector('#root')
);

// 报错module.hot没有，需要npm i @types/webpack-env -D，并且在tsconfig 中的compilerOptions下添加 "types": ["webpack-env"]
if (module.hot) {
    module.hot.accept();
}
