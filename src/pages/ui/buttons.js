import React, { Component } from 'react';
import { Card, Button,Radio } from 'antd';


const ButtonGroup = Button.Group;
export default class Buttons extends Component {

    state = {
        loadding: true,
        size:'default',
    }

    handleLoading = () => {
        this.setState({
            loadding: false
        })
    }

    onchangSize=(e)=>{
       this.setState({
        size:e.target.value,
       })
    }


    render() {

        return (
            <div>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">Imooc</Button>
                    <Button type="">Imooc</Button>
                    <Button type="dashed">Imooc</Button>
                    <Button type="danger">Imooc</Button>
                    <Button disabled>Imooc</Button>
                </Card>
                <Card title="图像按钮" className="card-wrap">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button type="delete">删除</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>
                <Card title="加载按钮" className="card-wrap">
                    <Button type="primary" loading={this.state.loadding}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loadding}></Button>
                    <Button loading={this.state.loadding}>点击加载</Button>
                    <Button shape="circle" loading={this.state.loadding}></Button>
                    <Button type="primary" icon="close" onClick={this.handleLoading}>关闭</Button>
                </Card>
                <Card title="按钮组" className="card-wrap">
                    <ButtonGroup>
                        <Button type="primary" icon="left">返回</Button>
                        <Button type="primary" icon="right">前进</Button>
                    </ButtonGroup>
                </Card>
                <Card title="按钮尺寸" className="card-wrap">
                     <Radio.Group onChange={this.onchangSize} vlaue={this.state.size}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                     </Radio.Group>
                    <Button type="primary" size={this.state.size}>imooc</Button>
                    <Button type="primary" size={this.state.size}>imooc</Button>
                    <Button type="primary" size={this.state.size}>imooc</Button>
                </Card>
            </div>
        )
    }

}