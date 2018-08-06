import React, { Component } from 'react';
import { Card, Button,Modal } from 'antd';


export default class Modals extends Component {

   state ={
       showModal1 :false,
       showModal2 :false,
       showModal3 :false,
       showModal4 :false,
   }


    handleOpen = (type)=>{
      //小技巧tpye变量直接使用 [type]实现
      this.setState({
        [type] :true
      })
    }

    render() {

        return (
            <div>
                <Card title="基础模态框">
                    <Button type="primary" onClick={()=>{this.handleOpen('showModal1')}}>open</Button>
                    <Button type="primary" onClick={()=>{this.handleOpen('showModal2')}}>自定义页脚</Button>
                    <Button type="primary" onClick={()=>{this.handleOpen('showModal3')}}>顶部20px弹框</Button>
                    <Button type="primary" onClick={()=>{this.handleOpen('showModal4')}}>水平垂直居中弹框</Button>
                </Card>
                <Modal
                  title="React"
                  visible= {this.state.showModal1}
                  onCancel = {()=>{this.setState({
                    showModal1 :false
                  })}}
                >
                  <p>欢迎学习react教程</p>
                </Modal>
            </div>
        )
    }

}