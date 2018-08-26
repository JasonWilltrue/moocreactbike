import React, { Component, Fragment } from "react";
import { Card, Button, Modal, message } from "antd";
import axios from "./../../axios";
import Utils from "../../utils/utils";
import CreatePermission from "./createP";
import PermEditForm from "./permEditForm";
import UserAuth from "./userAuth";
import CTable from "../../components/cTable";

export default class PermissionUser extends Component {
  state = {
    list: [],
    pagination: null,
    selectedRowKeys: null,
    selectedItem: [],
    createVisble: false,
    isPermVisible: false,
    isUserVisible: false,
    detailInfo: {},
    selectedIds: [],
    menuInfo: [],
    //用户授权
    mockData: [],
    targetKeys: []
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
  // 创建权限
  handleOpenCreate = () => {
    this.setState({
      createVisble: true
    });
  };
  // 权限设置
  handleOpenEdit = () => {
    let item = this.state.selectedItem;
    console.log(item);

    if (item.length === 0) {
      Modal.error({
        title: "提醒",
        content: "请选中一个角色"
      });
      return;
    }

    this.setState({
      isPermVisible: true,
      detailInfo: item,
      menuInfo: item.menus
    });
  };

  //创建角色按钮
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

  //修改角色按钮
  handleEditSubmit = () => {
    let editInfo = this.editInfo.props.form.getFieldsValue();
    console.log("修改角色信息  ", editInfo);
    // 角色id
    editInfo.role_id = this.state.selectedItem.id;
    //角色权限区域
    editInfo.menus = this.state.menuInfo;
    axios
      .ajax({
        url: "/role/edit",
        data: {
          params: editInfo
        }
      })
      .then(res => {
        if (res.code === 0) {
          message.success("角色修改成功!");
          this.setState({
            isPermVisible: false,
            selectedRowKeys: null,
            selectedItem: []
          });
          this.editInfo.props.form.resetFields();
          this.request();
        }
      });
  };

  handleUseAuth = () => {
    let item = this.state.selectedItem;
    if (item.length === 0) {
      Modal.error({
        title: "提醒",
        content: "请选中一个角色"
      });
      return;
    }
    this.setState({
      isUserVisible: true,
      detailInfo: item
    });
    this.getRoleUserList(item);
  };
  //获取角色ID列表
  getRoleUserList = id => {
    axios
      .ajax({
        url: "role/user_list",
        data: {
          params: {
            id: id
          }
        }
      })
      .then(res => {
        if (res) {
          this.getAuthUserlist(res.result);
        }
      });
  };

  //分配不同列表用户
  getAuthUserlist = userList => {
    const mockData = [];
    const targetKeys = [];
    if (userList && userList.length > 0) {
      for (let i = 0; i < userList.length; i++) {
        const e = userList[i];
        const data = {
          key: e.user_id,
          title: e.user_name,
          status: e.status
        };
        if (e.status == 1) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
      this.setState({
        mockData,
        targetKeys
      });
    }
  };
  // 用户授权提交
  handleUserAuthSubmit=()=>{
    let data ={}
    data.user_ids = this.state.targetKeys;
    console.log('tarkes:'+data.user_ids);

    data.role_id = this.state.selectedItem.id;
    axios.ajax({
      url:'/city/open',
      data:{
         params:{...data}
      }
    }).then(res=>{
      if(res){
        this.setState({
          isUserVisible: false
        });
        message.success('权限修改成功！')
        this.request();
      }
    })
  }
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
            onClick={this.handleUseAuth}
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
        <Modal
          title="设置权限"
          visible={this.state.isPermVisible}
          width={600}
          onCancel={() => {
            //重置功能
            this.editInfo.props.form.resetFields();
            this.setState({
              isPermVisible: false
            });
          }}
          onOk={this.handleEditSubmit}
        >
          <PermEditForm
            detailInfo={this.state.detailInfo}
            menuInfo={this.state.menuInfo}
            wrappedComponentRef={inst => {
              this.editInfo = inst;
            }}
            patchMenuInfo={checkedKeys => {
              this.setState({
                menuInfo: checkedKeys
              });
            }}
          />
        </Modal>
        <Modal
          title="用户授权"
          visible={this.state.isUserVisible}
          width={600}
          onCancel={() => {
            //重置功能
            this.userAuthInfo.props.form.resetFields();
            this.setState({
              isUserVisible: false
            });
          }}
          onOk={this.handleUserAuthSubmit}
        >
          <UserAuth
            detailInfo={this.state.detailInfo}
            menuInfo={this.state.menuInfo}
            mockData={this.state.mockData}
            targetKeys={this.state.targetKeys}
            wrappedComponentRef={inst => {
              this.userAuthInfo = inst;
            }}
            patchMenuInfo={checkedKeys => {
              this.setState({
                menuInfo: checkedKeys
              });
            }}
            patchUserInfo={(targetKeys)=>{
              this.setState({
                targetKeys
              })
            }}
          />
        </Modal>
      </Fragment>
    );
  }
}
