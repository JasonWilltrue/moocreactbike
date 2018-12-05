import React, { Component, Fragment } from "react";
import { Card, Table, Modal, Button, message,Badge } from "antd";
import axios from "./../../axios";
import Utils from "../../utils/utils";


export default class HighTable extends Component {
  state = {
    dataSource: [],
    dataSource2: [],
    selectedRowKeys: null,
    selectedItem: [],
    selectedRows: []
  };
  //当前页
  params = {
    page: 1
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
      },
      {
        id: "5",
        name: "jack",
        password: "123456",
        sex: 0,
        state: "3",
        datetime: "2018-08-11"
      },
      {
        id: "6",
        name: "jack",
        password: "123456",
        sex: 1,
        state: "4",
        datetime: "2018-08-11"
      },
      {
        id: "7",
        name: "jack",
        password: "123456",
        sex: 0,
        state: "3",
        datetime: "2018-08-11"
      },
      {
        id: "8",
        name: "jack",
        password: "123456",
        sex: 1,
        state: "4",
        datetime: "2018-08-11"
      },
      {
        id: "9",
        name: "jack",
        password: "123456",
        sex: 1,
        state: "4",
        datetime: "2018-08-11"
      },
      {
        id: "10",
        name: "jack",
        password: "123456",
        sex: 1,
        state: "4",
        datetime: "2018-08-11"
      }
    ];
    const newDateSource =  dataSource.map((item, index) => {
          return item.key = index;
    });
    this.setState({
      dataSource:newDateSource
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
    const _this = this;
    axios
      .ajax({
        url: "/table/highlist",
        data: {
          params: {
            page: this.params.page
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
            dataSource2: res.result.list,
            selectedRowKeys: [],
            selectedRows: [],
            pagination: Utils.pagination(res, current => {
              //TODO:跳转分页
              _this.params.page = current; //重新赋值的页
              console.log("进来看看几次了");

              this.request();
            })
          });
        }
      });
  };
  //每一行的点击事件
  onRowClick = (record, index) => {
    let selectKey = [index];
    Modal.info({
      title: "信息",
      content: "ID: " + record.id + "  用户名：" + record.name + ","
    });
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    });
  };

  /**
   * 复选框删除
   */
  handleDelete = () => {
    let rows = this.state.selectedRows;
    let ids = [];
    rows.map(item => {
      ids.push(item.id);
    });

    Modal.confirm({
      title: "删除提示",
      content: `确定要删除吗？${ids}`,
      onOk: () => {
        message.success("删除成功！");
      }
    });
  };
  handleChange = (pagination,filters,sorter)=>{
     console.log(sorter);
     this.setState({
        sortOrder:sorter.order
     })

  }
  handleItemDelete = (item)=>{

    Modal.confirm({
          title:'提示',
          content:`你确定要删除${item.id}，${item.name}此条数据吗？`,
          onOk :()=>{
            message.info('删除成功');
          }

      })
  }
  render() {
    //表格头
    const columns = [
      {
        title: "id",
        key: "id",
        width: 80,
        dataIndex: "id"
      },
      {
        title: "用户名",
        key: "name",
        width: 80,
        dataIndex: "name"
      },
      {
        title: "密码",
        key: "password",
        width: 80,
        dataIndex: "password"
      },
      {
        title: "性别",
        dataIndex: "sex",
        width: 80,
        render(sex) {
          return sex === 1 ? "男" : "女";
        }
      },
      {
        title: "级别",
        dataIndex: "state",
        width: 180,
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
        width: 100,
        dataIndex: "datetime"
      }
    ];
    const columns2 = [
      {
        title: "id",
        key: "id",
        width: 100,
        fixed:'left',
        dataIndex: "id"
      },
      {
        title: "用户名",
        key: "name",
        width: 100,
        fixed:'left',
        dataIndex: "name"
      },
      {
        title: "密码",
        key: "password1",
        width: 100,
        dataIndex: "password"
      },
      {
        title: "密码",
        key: "password2",
        width: 100,
        dataIndex: "password"
      },
      {
        title: "密码",
        key: "password3",
        width: 100,
        dataIndex: "password"
      },
      {
        title: "密码",
        key: "password4",
        width: 100,
        dataIndex: "password"
      },
      {
        title: "密码",
        key: "password5",
        width: 100,
        dataIndex: "password"
      },
      {
        title: "密码",
        key: "password6",
        width: 100,
        dataIndex: "password"
      },
      {
        title: "密码",
        key: "password7",
        width: 100,
        dataIndex: "password"
      },
      {
        title: "密码",
        key: "password8",
        width: 100,
        dataIndex: "password"
      },
      {
        title: "密码",
        key: "password9",
        width: 100,
        dataIndex: "password"
      },
      {
        title: "密码",
        key: "password10",
        width: 100,
        dataIndex: "password"
      },
      {
        title: "密码",
        key: "password11",
        width: 100,
        dataIndex: "password"
      },
      {
        title: "密码",
        key: "password12",
        width: 100,
        dataIndex: "password"
      },
      {
        title: "密码",
        key: "password13",
        width: 100,
        dataIndex: "password"
      },
      {
        title: "密码",
        key: "password14",
        width: 100,
        dataIndex: "password"
      },
      {
        title: "性别",
        key: "sex1",
        dataIndex: "sex",
        width: 100,
        render(sex) {
          return sex === 1 ? "男" : "女";
        }
      },
      {
        title: "性别",
        key: "sex2",
        dataIndex: "sex",
        width: 100,
        render(sex) {
          return sex === 1 ? "男" : "女";
        }
      },
      {
        title: "性别",
        key: "sex3",
        dataIndex: "sex",
        width: 100,
        render(sex) {
          return sex === 1 ? "男" : "女";
        }
      },
      {
        title: "性别",
        key: "sex4",
        dataIndex: "sex",
        width: 100,
        render(sex) {
          return sex === 1 ? "男" : "女";
        }
      },
      {
        title: "性别",
        key: "sex5",
        dataIndex: "sex",
        width: 100,
        render(sex) {
          return sex === 1 ? "男" : "女";
        }
      },
      {
        title: "级别",
        dataIndex: "state",
        width: 100,
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
        width: 100,
        fixed:'right',
        dataIndex: "datetime"
      }
    ];
    const columns3 = [
        {
          title: "id",
          key: "id",
          width: 80,
          dataIndex: "id"
        },
        {
          title: "用户名",
          key: "name",
          width: 80,
          dataIndex: "name"
        },
        {
          title: "密码",
          key: "password",
          width: 80,
          dataIndex: "password"
        },
        {
            title: "年龄",
            key: "age",
            width: 80,
            dataIndex: "age",
            sorter:(a,b)=>{
              return a.age -b.age;
            },
            sortOrder:this.state.sortOrder

          },
        {
          title: "性别",
          dataIndex: "sex",
          key: "sex",
          width: 80,
          render(sex) {
            return sex === 1 ? "男" : "女";
          }
        },
        {
          title: "级别",
          dataIndex: "state",
          key: "state",
          width: 180,
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
          key: "datetime",
          width: 100,
          dataIndex: "datetime"
        }
      ];
      const columns4 = [
        {
          title: "id",
          key: "id",
          width: 80,
          dataIndex: "id"
        },
        {
          title: "用户名",
          key: "name",
          width: 80,
          dataIndex: "name"
        },
        {
          title: "密码",
          key: "password",
          width: 80,
          dataIndex: "password"
        },
        {
            title: "年龄",
            key: "age",
            width: 80,
            dataIndex: "age",
            sorter:(a,b)=>{
              return a.age -b.age;
            },
            sortOrder:this.state.sortOrder

          },
        {
          title: "性别",
          dataIndex: "sex",
          key: "sex",
          width: 80,
          render(sex) {
            return sex === 1 ? "男" : "女";
          }
        },
        {
          title: "级别",
          dataIndex: "state",
          key: "state",
          width: 180,
          render(state) {
            let config = {
              "1": <Badge status="success" text="咸鱼一条" />,
              "2":  <Badge status="processing" text="风华浪子" />,
              "3": <Badge status="warning" text="北大才子" />,
              "4": <Badge status="default" text="百度EF" />,
              "5": <Badge status="error" text="老板" />,
            };
            return config[state];
          }
        },
        {
          title: "注册时间",
          key: "datetime",
          width: 100,
          dataIndex: "datetime"
        },
        {
            title: "操作",
            width: 120,
            render:(text,item)=>{
               return (
                <Fragment>
                    <Button size="small" type="primary" icon="edit">编辑</Button>
                    <Button size="small"  type="danger" icon="delete" onClick={()=>{this.handleItemDelete(item)}}>删除</Button>
                </Fragment>
               )
            }
          }
      ];
    //定义一个数组 用于onchange切换使用
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type: "radio",
      //如果没有下面属性则点击没有选中效果
      selectedRowKeys
    };
    // const rowCheckSelection = {
    //   type: "checkbox",
    //   //如果没有下面属性则点击没有选中效果
    //   selectedRowKeys,
    //   /**
    //    * @selectedRowKeys 行
    //    * @selectedRows 行对象
    //    */
    //   onChange: (selectedRowKeys, selectedRows) => {
    //     console.log("selectedRowKeys:", selectedRowKeys);
    //     console.log("selectedRows: ", selectedRows);
    //     //  let ids = [];
    //     // // 遍历选中的每一个行中的id
    //     //  selectedRows.map((item)=>{
    //     //        ids.push(item.id)
    //     //  })
    //     this.setState({
    //       selectedRowKeys,
    //       //选中id值是一个数组
    //       // selectedId:ids
    //       selectedRows
    //     });
    //   }
    // };
    return (
      <Fragment>
        <Card title="表头固定" className="card-warp">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{ y: 240 }}
          />
        </Card>
        <Card
          title="左侧固定"
          className="card-warp"
          style={{ margin: "10px 0" }}
        >
          <Table
            bordered
            rowSelection={rowSelection} //单选多选  类型配置
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }, //点击行
                onMouseEnter: () => {} //鼠标移入行
              };
            }}
            columns={columns2}
            dataSource={this.state.dataSource2}
            pagination={false}
            scroll={{ x: 2226 }}
          />
        </Card>
        <Card
          title="表格排序"
          className="card-warp"
          style={{ margin: "10px 0" }}
        >
          <Table
            bordered
            columns={columns3}
            dataSource={this.state.dataSource2}
            pagination={false}
            onChange = {this.handleChange}
          />
        </Card>
        <Card
          title="操作按钮"
          className="card-warp"
          style={{ margin: "10px 0" }}
        >
          <Table
            bordered
            columns={columns4}
            dataSource={this.state.dataSource2}
            pagination={false}
            onChange = {this.handleChange}
          />
        </Card>
      </Fragment>
    );
  }
}
