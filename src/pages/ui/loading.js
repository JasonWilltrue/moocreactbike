import React, { Component } from 'react'
import { Card, Spin, Icon, Alert } from 'antd';
import './ui.less';

export default class Loading extends Component {
    render() {
        const icon = <Icon type="loading" style={{ fontSize: 24 }} />
        return ([<Card title="加载动画" className="card-warp">
            <Spin size="small" />
            <Spin />
            <Spin size="large" />
            <Spin indicator={icon} style={{ marginLeft: 20 }} />
        </Card>,
        <Card title="内容遮罩" className="card-warp">
            <Alert
                message='react'
                description='宁确定这么做吗?'
                type="info"
            />
            <Spin >
                <Alert
                    message='react'
                    description='宁确定这么做吗?'
                    type="success"

                />
            </Spin>
            <Spin tip="拼命给老子加载...">
                <Alert
                    message='react'
                    description='宁确定这么做吗?'
                    type="success"
                />
            </Spin>

        </Card>
        ]





        )
    }
}
