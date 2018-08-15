import  React, { Component,Fragment } from 'react';
import { Form, Select, Card,Button, Table} from "antd";
import axios from "./../../axios";
import Utils from "../../utils/utils";
import FilterForm from './filterForm';

export default class Order extends Component {
    state={}
 //当前页
 params = {
  page: 1
};

    componentDidMount(){
       this.request()
    }

   request = ()=>{
    const _this = this;
    // axios
    //   .ajax({
    //     url: "/open_city",
    //     data: {
    //       params: {
    //         page: this.params.page
    //       },
    //       isShowLoading: true
    //     }
    //   })
   }



  render() {
    const columns = [
      {
        title: "订单编号",
        key: "order_snd",
        width: 80,
        dataIndex: "order_snd"
      },
      {
        title: "车辆编号",
        key: "bike_sn",
        width: 80,
        dataIndex: "bike_sn"
      },
      {
        title: "用户名",
        key: "user_name",
        width: 80,
        dataIndex: "user_name",

      },
      {
        title: "手机号",
        key: "mobile",
        width: 80,
        dataIndex: "mobile",

      },
      {
        title: "里程",
        key: "distance",
        width: 80,
        dataIndex: "distance",

      },
      {
        title: "行程时间",
        key: "total_time",
        width: 80,
        dataIndex: "total_time",

      },
      {
        title: "状态",
        key: "status",
        width: 80,
        dataIndex: "status",

      },
      {
        title: "开始时间",
        key: "start_time",
        width: 120,
        dataIndex: "start_time",

      },
      {
        title: "结束时间",
        key: "end_time",
        width: 120,
        dataIndex: "end_time",

      },
      {
        title: "订单金额",
        width: 80,
        key: "total_fee",
        dataIndex: "total_fee"
      },
      {
        title: "实付金额",
        width: 80,
        key: "user_pay",
        dataIndex: "user_pay"
      }

    ];
    return (
      <Fragment>
          <Card>
             <FilterForm />
         </Card>
         <Card style={{marginTop:10}}>
             <Button icon="profile" type="primary" >订单详情</Button>
             <Button icon="close-circle-o" type="primary" >取消订单</Button>
         </Card>
         <div className="content-warp">
             <Table
               bordered
               columns={columns}
               dataSource = {this.state.dataSource}
               pagination = {this.state.pagination}
             />
         </div>
      </Fragment>
    )
  }
}
