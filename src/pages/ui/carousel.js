import React, { Component } from 'react'
import { Card, Carousel} from 'antd';
import './ui.less';

export default class Carousels extends Component {
    render() {
        return (
            [<Card title="背景字体轮播" className="card-warp">
               <Carousel autoplay effect="fade">
                   <div><h3>111111111111111112</h3></div>
                   <div><h3>22222222222222222</h3></div>
                   <div><h3>3333333333333333</h3></div>
               </Carousel>
           </Card>,
           <Card title="图片轮播" className="card-warp  slider-warp">
           <Carousel autoplay effect="fade" >
               <div><img src="/carousel-img/carousel-1.jpg" alt=""/></div>
               <div><img src="/carousel-img/carousel-2.jpg" alt=""/></div>
               <div><img src="/carousel-img/carousel-3.jpg" alt=""/></div>
           </Carousel>
          </Card>
          ]
        )

    }
}
