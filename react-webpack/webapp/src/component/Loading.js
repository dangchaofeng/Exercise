import React, { Component } from 'react';

class Loading extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="loadEffect">
                <span> 加载中</span>
            </div>
        );
    }
}

export default Loading;
