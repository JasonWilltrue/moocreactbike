import React, { Component, Fragment } from "react";
import { Card, Button, Table,Modal, Form } from "antd";
import axios from "./../../axios";
import Utils from "../../utils/utils";
import FilterForm from "./filterForm";


const FormItem = Form.Item;
export default class Order extends Component {
  state = {
    list: [],
    pagination: null,
    selectedRowKeys: null,
    selectedItem:[],
    orderConfirmVisble:false,
    orderInfo:{}
  };
  //当前页
  params = {
    page: 1
  };

  componentDidMount() {
    this.request();
  }

  request = () => {
    const _this = this;
    axios
      .ajax({
        url: "/orderlist",
        data: {
          params: {
            page: this.params.page
          },
          isShowLoading: true
        }
      })
      .then(res => {
        if (res.code === 0) {
          console.log(res.result.item_list);
          res.result.item_list.map((item, index) => {
            item.key = index;
          });
          this.setState({
            list: res.result.item_list,
            pagination: Utils.pagination(res, current => {
              _this.params.page = current;
              _this.request();
            })
          });
        }
      });
  };

  request_orderInfo = (id)=>{
    axios
      .ajax({
        url: "/order/bike_info",
        data: {
          params: {
            order_sn: id
          },
          isShowLoading: true
        }
      })
      .then(res => {
        if (res.code === 0) {
          console.log(res.result);
          this.setState({
            orderInfo: res.result
          });
        }
      });
  }
  onRowClick = (record, index) => {
    console.log(record, index);
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    });
  };

  handleConfirm =()=>{
    if(this.state.selectedItem && this.state.selectedItem.order_sn)
    {
      this.setState({
        orderConfirmVisble:true
      })
      this.request_orderInfo(this.state.selectedItem.order_sn);
    }else{
        Modal.error({
           title:'错误提醒',
           content:'请选中一个任务结束！'
        })
    }

  }
  handleOrderFinsh = ()=>{

  }

  handleOpenDetail = ()=>{

      if(this.state.selectedItem && this.state.selectedItem.order_sn){
        window.open(`#/common/order/detail/${this.state.selectedItem.bike_sn}`,'_blank')
      //  window.location.href = `#/common/order/detail/${this.state.selectedItem.bike_sn}`;

      }else{
        Modal.error({
          title:'错误提醒',
          content:'请选中一个任务结束！'
       })
      }

  }
  render() {
    //定义一个数组 用于onchange切换使用
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type: "radio",
      selectedRowKeys
    };
    //定义山格兰
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    };
    const columns = [
      {
        title: "订单编号",
        key: "order_sn",
        width: 80,
        dataIndex: "order_sn"
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
        dataIndex: "user_name"
      },
      {
        title: "手机号",
        key: "mobile",
        width: 80,
        dataIndex: "mobile"
      },
      {
        title: "里程",
        key: "distance",
        width: 80,
        dataIndex: "distance",
        render: distance => {
          return `${distance}公里`;
        }
      },
      {
        title: "行程时间",
        key: "total_time",
        width: 80,
        dataIndex: "total_time"
      },
      {
        title: "状态",
        key: "status",
        width: 80,
        dataIndex: "status",
        render: status => {
          let config = {
            "1": "进行中",
            "2": "进行中(暂时)",
            "3": "结束"
          };
          return config[status];
        }
      },
      {
        title: "开始时间",
        key: "start_time",
        width: 120,
        dataIndex: "start_time"
      },
      {
        title: "结束时间",
        key: "end_time",
        width: 120,
        dataIndex: "end_time"
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
        <Card style={{ marginTop: 10 }}>
          <Button icon="profile" type="primary" onClick={this.handleOpenDetail}>
            订单详情
          </Button>
          <Button icon="close-circle-o" type="primary" onClick={this.handleConfirm}>
            取消订单
          </Button>
        </Card>
        <div className="content-warp">
          <Table
            bordered
            rowSelection={rowSelection} //单选多选  类型配置
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }, //点击行
                onMouseEnter: () => {} //鼠标移入行
              };
            }}
          />
        </div>
        <Modal
           title="取消订单"
           visible = {this.state.orderConfirmVisble}
           onCancel={()=>{
             this.setState({
                orderConfirmVisble:false
             })
           }}
           onOk={this.handleOrderFinsh}
        >
      <Form layout="horizontal">
            <FormItem label="车辆编号" {...formItemLayout}>
                {this.state.orderInfo.bike_sn}
            </FormItem>
            <FormItem label="剩余电量" {...formItemLayout}>
            {this.state.orderInfo.battery}

            </FormItem>
            <FormItem label="行程开始时间" {...formItemLayout}>
            {this.state.orderInfo.start_time}

            </FormItem>
            <FormItem label="当前位置" {...formItemLayout}>
            {this.state.orderInfo.location}
            </FormItem>
        </Form>
        </Modal>
      </Fragment>
    );
  }
}
