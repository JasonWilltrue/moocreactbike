import React, { Component } from 'react'
import { Card,  Button,message} from 'antd';
import './ui.less';

export default class Message extends Component {

    showMessage = (type)=>{
        message[type]('恭喜了，中奖了')
    }
    render() {
        return (<Card title="全局提示框" className="card-warp">
                <Button type="primary" onClick={()=>{this.showMessage('success')}}>成功</Button>
                <Button type="primary" onClick={()=>{this.showMessage('info')}} >消息</Button>
                <Button type="primary" onClick={()=>{this.showMessage('warning')}}>警告</Button>
                <Button type="primary" onClick={()=>{this.showMessage('error')}}>错误</Button>
                <Button type="primary" onClick={()=>{this.showMessage('loading')}}>拼命加载</Button>
        </Card>)
    }
}
