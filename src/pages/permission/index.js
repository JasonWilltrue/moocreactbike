import React, { Component, Fragment } from "react";
import { Card, Button, Modal, message } from "antd";
import axios from "./../../axios";
import Utils from "../../utils/utils";
import CreatePermission from "./createP";

import CTable from "../../components/cTable";

export default class PermissionUser extends Component {
  state = {
    list: [],
    pagination: null,
    selectedRowKeys: null,
    selectedItem: [],
    createVisble: false,
    orderInfo: {},
    selectedIds: []
  };
  //当前页
  params = {
    page: 1
  };

  //组件化封装表单
  formList = [
    {
      type: "SELECT",
      label: "城市",
      field: "city_id",
      placeholder: "全部",
      initialValue: "1",
      list: [
        { id: "0", name: "全部" },
        { id: "1", name: "北京" },
        { id: "2", name: "上海" },
        { id: "3", name: "杭州" },
        { id: "4", name: "广州" }
      ],
      width: 100
    },
    {
      type: "时间查询",
      label: "时间查询",
      field: "time"
    },
    {
      type: "SELECT",
      label: "订单状态",
      field: "status",
      placeholder: "全部",
      initialValue: "0",
      list: [
        { id: "-1", name: "全部" },
        { id: "0", name: "进行中" },
        { id: "1", name: "进行中（暂时）" },
        { id: "2", name: "结束行程" }
      ],
      width: 120
    }
  ];

  componentDidMount() {
    this.request();
  }

  request = () => {
    axios.requestList(this, "/permission_list", this.params, true);
  };

  handleOpenCreate = () => {
    this.setState({
      createVisble: true
    });
  };

  handleCreateFinsh = () => {
    let createInfo = this.createInfo.props.form.getFieldsValue();
    console.log("创建角色信息  ", createInfo);
    axios
      .ajax({
        url: "/city/open",
        data: {
          params: createInfo
        }
      })
      .then(res => {
        console.log(res);

        if (res.code === 0) {
          message.success("创建角色成功!");
          this.setState({
            createVisble: false
          });
          this.createInfo.props.form.resetFields();
          this.request();
        }
      });
  };


  render() {
    //定义山格兰
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    };
    // 表头数据
    const columns = [
      {
        title: "角色ID",
        key: "id",
        dataIndex: "id"
      },
      {
        title: "角色名称",
        key: "role_name",
        dataIndex: "role_name"
      },
      {
        title: "创建时间",
        key: "create_time",
        dataIndex: "create_time"
      },
      {
        title: "使用状态",
        key: "status",
        dataIndex: "status",
        render(status) {
          return status === 1 ? "启用" : "停用";
        }
      },
      {
        title: "授权时间",
        key: "authorize_time",
        dataIndex: "authorize_time",
        render(authorize_time) {
          return Utils.formateDate(authorize_time);
        }
      },
      {
        title: "授权人",
        key: "authorize_user_name",
        dataIndex: "authorize_user_name"
      }
    ];

    return (
      <Fragment>
        <Card style={{ marginTop: 10 }}>
          <Button icon="plus" type="primary" onClick={this.handleOpenCreate}>
            创建角色
          </Button>
          <Button icon="profile" type="primary" onClick={this.handleOpenEdit}>
            设置权限
          </Button>
          <Button
            icon="close-circle-o"
            type="primary"
            onClick={this.handleConfirm}
          >
            用户授权
          </Button>
        </Card>
        <div className="content-warp">
          <CTable
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            selectedRowKeys={this.state.selectedRowKeys}
            selectedItem={this.state.selectedItem}
            rowSelection={"radio"} //单选多选  类型配置
            updateSelectedItem={Utils.updateSelectedItem.bind(this)} //因为方法中有要更新的this.setstate 必须绑定this指向
          />
        </div>
        <Modal
          title="创建角色"
          visible={this.state.createVisble}
          onCancel={() => {
            //重置功能
            this.createInfo.props.form.resetFields();
            this.setState({
              createVisble: false
            });
          }}
          onOk={this.handleCreateFinsh}
        >
          <CreatePermission
            wrappedComponentRef={inst => {
              this.createInfo = inst;
            }}
          />
        </Modal>
      </Fragment>
    );
  }
}
