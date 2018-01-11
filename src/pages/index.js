import React, {Component} from 'react'
import Websocket from '../component/WebSocket'
import './common.less'
import InputBox from "../component/InputBox";
import DisplayBox from "../component/DisplayBox";
import formatDate from '../utils/date';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: []
        }
    }

    putRequest(req) {
        this.setState({
            history: [
                {
                    date: formatDate(new Date()),
                    req: req,
                },
                ...this.state.history,
            ]
        });
    }

    putResponse(resp) {
        this.setState({
            history: [
                {
                    date: formatDate(new Date()),
                    resp: resp
                },
                ...this.state.history,
            ]
        });
    }

    /**
     * 收到消息时触发的事件
     * @param data
     */
    handleReceiveMessage(data) {
        this.putResponse(data);
    }

    /**
     * 开始连接触发的事件
     */
    handleConnectionOpen() {
        this.setState(this.putRequest("connection open"))
    }

    /**
     * 关闭连接触发的事件
     */
    handleConnectionClose() {
        this.setState(this.putRequest("connection close"))
    }

    /**
     * 连接错误事件
     */
    handleConnectionError() {
        this.setState(this.putRequest("connection error"))
    }

    handleSendMessage(message) {
        if (message != "" && message != undefined && message != null){
            this.refWebSocket.sendMessage(message);
            this.putRequest(message);
        }
    }

    render() {
        return (
            <div>
                <Websocket url='ws://jinelei.cn:1201/jin'
                           ref={Websocket => {
                               this.refWebSocket = Websocket;
                           }}
                           debug={true}
                           reconnect={true}
                           onError={this.handleConnectionError.bind(this)}
                           onClose={this.handleConnectionClose.bind(this)}
                           onOpen={this.handleConnectionOpen.bind(this)}
                           onMessage={this.handleReceiveMessage.bind(this)}/>
                <InputBox handleSubmit={(message) => this.handleSendMessage(message)}/>
                {this.state.history.map((value => {
                    return <DisplayBox date={value.date} req={value.req} resp={value.resp}/>
                }))}
            </div>
        )
    }

}

