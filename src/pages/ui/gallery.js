import React, { Component } from 'react'
import { Card,  Row,Col} from 'antd';
import './ui.less';

export default class Gallery extends Component {
    render() {
        const imgs = [
            ['1.png','2.png','3.png','4.png','5.png'],
            ['6.png','7.png','8.png','9.png','10.png'],
            ['1.png','2.png','3.png','4.png','5.png'],
            ['1.png','2.png','3.png','4.png','5.png'],
            ['1.png','2.png','3.png','4.png','5.png']
        ]
        const imgList = imgs.map((list)=>list.map((item)=>
            <Card cover={<img src={'./gallery/'+item} alt="一张图片" />}>
                <Card.Meta
                 title="这是一张照片"
                 description="这是一段描述！！！"
                />
             </Card>
        ))
        return (<Card title="全局提示框" className="card-warp">
                     <Row>
                        <Col md={5}>
                        {imgList[0]}
                        </Col>
                        <Col md={5}>
                        {imgList[1]}
                        </Col>
                        <Col md={5}>
                        {imgList[2]}
                        </Col>
                        <Col md={5}>
                        {imgList[3]}
                        </Col>
                        <Col md={4}>
                        {imgList[4]}
                        </Col>
                     </Row>
                </Card>)
    }
}
