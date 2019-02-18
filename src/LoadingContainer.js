import React, { Component } from "react";

export default class LoadingContainer extends Component {
    state = {
        content: '加载中...'
    }
    componentDidMount(){
        this.timer = setTimeout(() => {
            this.setState({content: '加载超时，请检查网络！'});
        }, timeout);
    }
    componentWillUnmount(){
        // 清除计时器
        clearTimeout(this.timer);
    }
    render(){
        return(<div>{this.state.content}</div>)
    }
}

export const timeout = 15000;