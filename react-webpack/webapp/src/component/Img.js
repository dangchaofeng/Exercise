import React, { Component } from 'react';
import Loading from './Loading';
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
        this.state = {
            src: null
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                src: this.props.src
            });
        }, 5000);
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
                <div>蚂蚁雅黑： {this.props.age}</div>
                <div className="color">456</div>
                <div className="divImg"></div>
                <div className="imgContainer">
                    {this.state.src === null ? (
                        <Loading></Loading>
                    ) : (
                        <img src={this.state.src} alt="" />
                    )}
                </div>
            </div>
        );
    }
}
export default Img;
