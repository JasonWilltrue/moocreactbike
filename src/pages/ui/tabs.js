import React, { Component } from 'react'
import { Card, Tabs,message,Icon} from 'antd';
import './ui.less';

const TabPane = Tabs.TabPane;
export default class Tab extends Component {


    state = {
        panes:[]
    }
    componentDidMount(){
        const panes = [
            {
                title:'Tab 1',
                content:'内容1',
                key:'1',
            },
            {
                title:'Tab 2',
                content:'内容2',
                key:'2',
            },
            {
                title:'Tab 3',
                content:'内容3',
                key:'3',
            }
        ]

        this.setState({
            panes,
        })
    }



    handleCallback = (key)=>{
        console.log(key);
        message.info('成功了'+key+'标签')
    }
    render() {
        return ([
            <Card title="Tab标签" className="card-warp">
                 <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                    <TabPane tab="Tab 1" key="1">Component1</TabPane>
                    <TabPane tab="Tab 2" key="2">Component2</TabPane>
                    <TabPane tab="Tab 3" key="3">Component3</TabPane>
                 </Tabs>
           </Card>,
           <Card title="Tab标签带图标" className="card-warp">
           <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
              <TabPane tab={<span><Icon type="apple"/>Tab 1</span>} key="1">Component1</TabPane>
              <TabPane tab={<span><Icon type="android"/>Tab 2</span>} key="2">Component2</TabPane>
              <TabPane tab={<span><Icon type="windows"/>Tab 3</span>} key="3">Component3</TabPane>
           </Tabs>
           </Card>,
            <Card title="动态添加Tab标签带图标" className="card-warp">
            <Tabs defaultActiveKey="1" onChange={this.handleCallback} type="editable-card">
                {
                    this.state.panes.map((item)=>{
                        return (<TabPane
                            tab={<span><Icon type="apple"/>{item.title}</span>}
                            key={item.key}>{item.content}
                            </TabPane>)
                    })
                }
            </Tabs>
            </Card>,
        ])
    }
}
