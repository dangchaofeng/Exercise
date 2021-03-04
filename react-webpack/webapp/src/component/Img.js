import React, { Component } from 'react';
function woof(Comp) {
    return props => {
        console.log(props);
        return (
            <div>
                <h1>woof</h1>
                <Comp
                    {...props}
                    onClick={() => {
                        props.onClick();
                    }}
                ></Comp>
            </div>
        );
    };
}

function dog(Comp) {
    return props => {
        console.log(props);
        return (
            <div>
                <h1>dog</h1>
                <Comp
                    {...props}
                    onClick={() => {
                        props.onClick();
                    }}
                ></Comp>
            </div>
        );
    };
}
// 自下而上
@dog
@woof
class Img extends Component {
    name = 'dcf';
    constructor() {
        super();
    }

    render() {
        const a = Object.assign({}, { a: 'aaa' });
        console.log(a);
        return (
            <div
                className="wrap"
                onClick={() => {
                    this.props.onClick();
                }}
            >
                <div className="color">456</div>
                <div className="divImg"></div>
                <img width="200" height="200" src="../public/headImg.jpg" alt="" />
            </div>
        );
    }
}
export default Img;
