import React, { Component } from 'react'
import {Card} from "antd";
// import echartTheme from "./../echartTheme";
// 按需加载
import echarts from 'echarts/lib/echarts'

// 导入柱形图
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip"
import "echarts/lib/component/title"
import "echarts/lib/component/legend"
import "echarts/lib/component/markPoint"
import ReactEcharts from "echarts-for-react";
import echartTheme from '../echartTheme';


export default class Bar extends Component {

 componentDidMount(){
    echarts.registerTheme("Imooc",echartTheme);
 }


 getOption=()=>{
    let option={
      title:{
           text:'用户骑行订单'
      },
      xAxis:{
        data:["周一","周二","周三","周四","周五","周六","周日"]
      },
      yAxis:{
        type:"value"
      },
      series:[
        {
          name:"订单流量",
          type:"bar",
          data:[1000,2000,2500,3124,2654,1564,799]
        }
      ]
    }
    return option;
 }


  render() {
    return (
      <div>
          <Card title="柱形图表1">
            <ReactEcharts option={this.getOption()} theme="Imooc" style={{height: 500}}/>
          </Card>
          <Card title="柱形图表2">

</Card>
      </div>
    )
  }
}
