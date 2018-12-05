import React, { Component } from 'react'
import { Card,  Button,notification } from 'antd';
import './ui.less';

export default class Notice extends Component {

    /**
     *  @type 类型
     *  @dir   方向
     */
    openNoteication=(type,dir)=>{
        if(dir){
            notification.config({
                placement:dir
            })
        }
        notification[type]({
            message:'消息提醒',
            description:'丫的！你中奖了500w呢！！'
        })
    }
    render() {
        return ([<Card title="弹窗动画" className="card-warp">
                <Button type="primary" onClick={()=>{this.openNoteication('success')}}>成功</Button>
                <Button type="primary" onClick={()=>{this.openNoteication('info')}}>消息</Button>
                <Button type="primary" onClick={()=>{this.openNoteication('warning')}}>警告</Button>
                <Button type="primary" onClick={()=>{this.openNoteication('error')}}>错误</Button>
        </Card>,<Card title="弹窗位置" className="card-warp">
                <Button type="primary" onClick={()=>{this.openNoteication('success','topleft')}}>成功</Button>
                <Button type="primary" onClick={()=>{this.openNoteication('info','bottomright')}}>消息</Button>
                <Button type="primary" onClick={()=>{this.openNoteication('warning','bottomleft')}}>警告</Button>
                <Button type="primary" onClick={()=>{this.openNoteication('error','topright')}}>错误</Button>
        </Card>

        ]





        )
    }
}
