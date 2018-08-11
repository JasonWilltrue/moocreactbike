import React, { Component, Fragment } from "react";
import { Card, Table } from "antd";
import axios from "./../../axios";

export default class BasicTable extends Component {
  state = {
    dataSource: [],
    dataSource2: []
  };

  componentDidMount() {
    //类似与表头文件
    const dataSource = [
      {
        id: "1",
        name: "jack",
        password: "123456",
        datetime: "2018-08-11"
      },
      {
        id: "2",
        name: "jack",
        password: "123456",
        datetime: "2018-08-11"
      },
      {
        id: "3",
        name: "jack",
        password: "123456",
        datetime: "2018-08-11"
      },
      {
        id: "4",
        name: "jack",
        password: "123456",
        datetime: "2018-08-11"
      }
    ];
    this.setState({
      dataSource
    });
    this.request();
  }
  /**
   * 动态获取默认表格数据
   */
  // request = ()=>{
  //    axios.get('https://www.easy-mock.com/mock/59b09f37e0dc6633419fb9eb/antdbike/table/list1')
  //    .then(res =>{
  //      console.log(JSON.stringify(res));
  //      if(res.data.result && res.data.code === 0){
  //         this.setState({
  //           dataSource2:res.data.result.list
  //         })
  //      }
  //    })
  // }
  //===================封装后的新写法====================
  request = () => {
    axios.ajax({
      url: "/table/list1",
      data: {
        params: {
          page: 1
        }
      }
    }).then(res=>{
      if(res.code === 0){
         this.setState({
          dataSource2:res.list
         })
      }
    });
  };

  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id"
      },
      {
        title: "用户名",
        dataIndex: "name"
      },
      {
        title: "密码",
        dataIndex: "password"
      },
      {
        title: "注册时间",
        dataIndex: "datetime"
      }
    ];
    return (
      <Fragment>
        <Card title="基础表格" className="card-warp">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
          />
        </Card>
        <Card title="动态获取表格数据" className="card-warp">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
      </Fragment>
    );
  }
}
