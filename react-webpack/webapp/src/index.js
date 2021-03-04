import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './assets/less/index.less';

class Img extends Component {
    constructor() {
        super();
    }

    render() {
        const a = Object.assign({}, { a: 'aaa' });
        console.log(a);
        return (
            <div className="wrap">
                <div className="color">456</div>
                <div className="divImg"></div>
                <img width="200" height="200" src="../public/headImg.jpg" alt="" />
            </div>
        );
    }
}

ReactDom.render(<Img></Img>, document.querySelector('#root'));

// 报错module.hot没有，需要npm i @types/webpack-env -D，并且在tsconfig 中的compilerOptions下添加 "types": ["webpack-env"]
if (module.hot) {
    module.hot.accept();
}
