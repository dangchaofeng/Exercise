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
        // 组件加载好之后， 进行请求img， 使用timeout模拟请求异步 5S 返回
        setTimeout(() => {
            const img = document.createElement('img');
            img.src = this.props.src;
            img.onload = () => {
                // img请求回来后，将其转换为base64，直接塞进src中
                const data = this.getBase64Image(img);
                this.setState({
                    src: data
                });
            };
        }, 5000);
    }

    getBase64Image(img) {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var dataURL = canvas.toDataURL('image/png');
        return dataURL;
    }

    render() {
        return (
            <div className="wrap">
                <div>蚂蚁雅黑： {this.props.age}</div>
                <span className="iconfont icon-wxbzhanghu"></span>
                <div className="color">456</div>
                <div className="divImg"></div>
                <div className="imgContainer">
                    {this.state.src === null ? (
                        <Loading></Loading>
                    ) : (
                        <img
                            onClick={() => {
                                this.props.onClick();
                            }}
                            src={this.state.src}
                            alt=""
                        />
                    )}
                </div>
            </div>
        );
    }
}
export default Img;
