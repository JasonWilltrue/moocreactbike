import React, { Component, Fragment } from "react";
import { Card, Table, Modal } from "antd";
import axios from "./../../axios";

export default class BasicTable extends Component {
  state = {
    dataSource: [],
    dataSource2: [],
    selectedRowKeys:null,
    selectedItem:[],
  };

  componentDidMount() {
    //类似与表头文件
    const dataSource = [
      {
        id: "1",
        name: "jack",
        password: "123456",
        sex: 0,
        state: "1",
        datetime: "2018-08-11"
      },
      {
        id: "2",
        name: "jack",
        password: "123456",
        sex: 1,
        state: "1",
        datetime: "2018-08-11"
      },
      {
        id: "3",
        name: "jack",
        password: "123456",
        sex: 0,
        state: "3",
        datetime: "2018-08-11"
      },
      {
        id: "4",
        name: "jack",
        password: "123456",
        sex: 1,
        state: "4",
        datetime: "2018-08-11"
      }
    ];
    dataSource.map((item, index) => {
      item.key = index;
    });
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
    axios
      .ajax({
        url: "/table/list1",
        data: {
          params: {
            page: 1
          },
          isShowLoading: true
        }
      })
      .then(res => {
        if (res.code === 0) {
          res.result.list.map((item, index) => {
            item.key = index;
          });
          this.setState({
            dataSource2: res.result.list
          });
        }
      });
  };
  //每一行的点击事件
  onRowClick = (record,index)=>{
      let selectKey = [index];
      Modal.info({
        title:'信息',
        content:'ID: '+record.id+'  用户名：'+record.name+','
      })
      this.setState({
         selectedRowKeys:selectKey,
         selectedItem:record,
      })
  }
  render() {
    //表格头
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
        title: "性别",
        dataIndex: "sex",
        render(sex) {
          return sex === 1 ? "男" : "女";
        }
      },
      {
        title: "级别",
        dataIndex: "state",
        render(state) {
          let config = {
            "1": "咸鱼一条",
            "2": "风华浪子",
            "3": "北大才子",
            "4": "百度EF",
            "5": "老板"
          };
          return config[state];
        }
      },
      {
        title: "注册时间",
        dataIndex: "datetime"
      }
    ];

    //定义一个数组 用于onchange切换使用
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      type: "radio",
      //如果没有下面属性则点击没有选中效果
      selectedRowKeys,
    };
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
        <Card
          title="动态获取表格数据"
          className="card-warp"
          style={{ margin: "10px 0" }}
        >
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card
          title="嵌入单选多选列表"
          className="card-warp"
          style={{ margin: "10px 0" }}
        >
          <Table
            bordered
            rowSelection={rowSelection}   //单选多选  类型配置
            onRow={(record,index) => {
              return {
                onClick: () => {
                    this.onRowClick(record,index)
                },       //点击行
                onMouseEnter: () => {}     //鼠标移入行
              };
            }}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
      </Fragment>
    );
  }
}
