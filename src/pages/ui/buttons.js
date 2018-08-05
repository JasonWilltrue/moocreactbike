import React,{Component} from 'react';
import {Card,Button} from 'antd';
export default class Buttons extends Component{

     render(){
         return(
            <div>
                 <Card title="基础按钮">
                     <Button type="primary">Imooc</Button>
                     <Button type="">Imooc</Button>
                     <Button type="dashed">Imooc</Button>
                     <Button type="danger">Imooc</Button>
                     <Button  disabled>Imooc</Button>
                 </Card>
                 <Card title="图像按钮">
                     <Button type="primary">Imooc</Button>
                     <Button type="">Imooc</Button>
                     <Button type="dashed">Imooc</Button>
                     <Button type="danger">Imooc</Button>
                     <Button  disabled>Imooc</Button>
                 </Card>
             </div>
         )
     }

}