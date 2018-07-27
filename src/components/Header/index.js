import React from 'react'
import { Row,Col } from 'antd';
import './index.less'

class Header extends React.Component {
    componentDidMount(){

    }
    render() {
        return (
            <div className="header">
                <Row className="header_top">
                    <Col span="24">
                      <span>你好，管理员</span>
                      <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="4">
                      <span className="breadcrumb_title">首页</span>
                    </Col>
                    <Col span="20" className="weather">
                      <span className="date">2018-5-5 17:22</span>
                      <span className="weather_detail">晴转多云</span>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Header