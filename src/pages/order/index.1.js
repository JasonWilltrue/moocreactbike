import React, { Component, Fragment } from "react";
import { Card, Button, Table, Modal, Form } from "antd";
import axios from "./../../axios";
import Utils from "../../utils/utils";
// import FilterForm from "./filterForm";
import BaseForm from '../../components/baseForm'
import CTable from '../../components/cTable'

const FormItem = Form.Item;
export default class Order extends Component {
  state = {
    list: [],
    pagination: null,
    selectedRowKeys: null,
    selectedItem: [],
    orderConfirmVisble: false,
    orderInfo: {}
  };
  //当前页
  params = {
    page: 1
  };

   //组件化封装表单
  formList = [{
    type:'SELECT',
    label:'城市',
    field:"city_id",
    placeholder:'全部',
    initialValue:'1',
    list:[{"id":"0","name":"全部"},{"id":"1","name":"北京"},{"id":"2","name":"上海"},{"id":"3","name":"杭州"},{"id":"4","name":"广州"}],
    width: 100,
  },
  {
    type:'时间查询',
    label:'时间查询',
    field:"time",
  },
  {
    type:'SELECT',
    label:'订单状态',
    field:"status",
    placeholder:'全部',
    initialValue:'0',
    list:[{"id":"-1","name":"全部"},{"id":"0","name":"进行中"},{"id":"1","name":"进行中（暂时）"},{"id":"2","name":"结束行程"}],
    width: 120,
  },
]

  componentDidMount() {
    this.request();
  }

  request = () => {

    axios.requestList(this,'/orderlist',this.params,true)

    // =======未封装前的写法===========
    // const _this = this;
    // axios
    //   .ajax({
    //     url: "/orderlist",
    //     data: {
    //       params: this.params,
    //       isShowLoading: true
    //     }
    //   })
    //   .then(res => {
    //     if (res.code === 0) {
    //       console.log(res.result.item_list);
    //       res.result.item_list.map((item, index) => {
    //         item.key = index;
    //       });
    //       this.setState({
    //         list: res.result.item_list,
    //         pagination: Utils.pagination(res, current => {
    //           _this.params.page = current;
    //           _this.request();
    //         })
    //       });
    //     }
    //   });
    // =======未封装前的写法===========
  };

  request_orderInfo = id => {
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
  };
  // onRowClick = (record, index) => {
  //   console.log(record, index);
  //   let selectKey = [index];
  //   this.setState({
  //     selectedRowKeys: selectKey,
  //     selectedItem: record
  //   });
  // };

  handleConfirm = () => {
    if (this.state.selectedItem && this.state.selectedItem.order_sn) {
      this.setState({
        orderConfirmVisble: true
      });
      this.request_orderInfo(this.state.selectedItem.order_sn);
    } else {
      Modal.error({
        title: "错误提醒",
        content: "请选中一个任务结束！"
      });
    }
  };
  /**
   * 完成订单方法
   */
  handleOrderFinsh = () => {};

  /**
   * 打开订单详情方法
   */
  handleOpenDetail = () => {
    if (this.state.selectedItem && this.state.selectedItem.order_sn) {
      window.open(
        `#/common/order/detail/${this.state.selectedItem.bike_sn}`,
        "_blank"
      );
      //  window.location.href = `#/common/order/detail/${this.state.selectedItem.bike_sn}`;
    } else {
      Modal.error({
        title: "错误提醒",
        content: "请选中一个任务结束！"
      });
    }
  };

  //筛选查询方法调用
  handleFilterSubmit=(parmas)=>{
      this.params = parmas;
      console.log(this.params);

      this.request();
  }
  render() {
    //定义一个数组 用于onchange切换使用
    // const { selectedRowKeys } = this.state;
    // const rowSelection = {
    //   type: "radio",
    //   selectedRowKeys
    // };
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
          <BaseForm formList = {this.formList} filterSubmit={this.handleFilterSubmit} />
          {/* <FilterForm  /> */}
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button icon="profile" type="primary" onClick={this.handleOpenDetail}>
            订单详情
          </Button>
          <Button
            icon="close-circle-o"
            type="primary"
            onClick={this.handleConfirm}
          >
            取消订单
          </Button>
        </Card>
        <div className="content-warp">
         <CTable
          columns={columns}
          dataSource={this.state.list}
          pagination={this.state.pagination}
          selectedRowKeys={this.state.selectedRowKeys}
          rowSelection={"radio"} //单选多选  类型配置
          updateSelectedItem={Utils.updateSelectedItem.bind(this)}  //因为方法中有要更新的this.setstate 必须绑定this指向

         />
          {/* <Table
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
          /> */}
        </div>
        <Modal
          title="取消订单"
          visible={this.state.orderConfirmVisble}
          onCancel={() => {
            this.setState({
              orderConfirmVisble: false
            });
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
