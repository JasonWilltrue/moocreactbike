import React, { Component, Fragment } from "react";
import { Card, Table, Modal, Button, message } from "antd";
import axios from "./../../axios";
import Utils from "../../utils/utils";
import FilterForm from './filterForm';
import OpenCity from './opencity';

export default class City extends Component {
  state = {
     list: [],
     isShowOpenCity:false,
  };
  //当前页
  params = {
    page: 1
  };

  componentDidMount() {
    this.request();
  }

  //===================默认请求数据====================
  request = () => {
    const _this = this;
    axios
      .ajax({
        url: "/open_city",
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
              //TODO:跳转分页
              _this.params.page = current; //重新赋值的页
              console.log("进来看看几次了");

              this.request();
            })
          });
        }
      });
  };
  handleOpenCity=()=>{
      this.setState({
          isShowOpenCity:true
      })
  }
  handleSubmit= ()=>{
      //get新技能
    let cityInfo = this.cityForm.props.form.getFieldsValue();
    console.log('cityInfo  ',cityInfo);
    axios.ajax({
        url:"/city/open",
        data:{
            params:cityInfo
        }
    }).then(res =>{
        console.log(res);

        if(res.code === 0){
            message.success('开通成功！')
            this.setState({
                isShowOpenCity:false
            })
            this.request();
        }
    })
  }

  render() {
    const columns = [
      {
        title: "城市ID",
        key: "id",
        width: 80,
        dataIndex: "id"
      },
      {
        title: "城市",
        key: "name",
        width: 80,
        dataIndex: "name"
      },
      {
        title: "用车模式",
        key: "mode",
        width: 80,
        dataIndex: "mode",
        render:(op_mode)=>{
            return op_mode === 1 ? "停车点" : "禁停区";
          }
      },
      {
        title: "运营模式",
        key: "op_mode",
        dataIndex: "op_mode",
        width: 80,
        render:(op_mode)=> {
            return op_mode === 1 ? "自营" : "加盟";
          }

      },

      {
        title: "授权加盟商",
        width: 100,
        key: "franchisee_name",
        dataIndex: "franchisee_name"
      },
      {
        title: "城市管理员",
        width: 100,
        key: "city_admins",
        dataIndex: "city_admins",
        render:(city_admins)=>{
            return city_admins.map((item)=>{
                return item.user_name
            }).join(",")
        }
      },
      {
        title: "城市开通时间",
        width: 100,
        key: "open_time",
        dataIndex: "open_time"
      },
      {
        title: "操作时间",
        width: 100,
        key: "update_time",
        dataIndex: "update_time"
      },
      {
        title: "操作人",
        width: 100,
        key: "sys_user_name",
        dataIndex: "sys_user_name"
      }
    ];

    return (
      <Fragment>
         <Card>
             <FilterForm />
         </Card>
         <Card style={{marginTop:10}}>
             <Button icon="plus" type="primary" onClick={this.handleOpenCity}>开通城市</Button>
         </Card>
         <div className="content-warp">
         <Table
         bordered
         columns = {columns}
         dataSource = {this.state.list}
         pagination = {this.state.pagination}
         />
         </div>
          <Modal
           title="开通城市"
           visible = {this.state.isShowOpenCity}
            onCancel = {()=>{
                this.setState({
                    isShowOpenCity:false
                })
            }}
            onOk = {this.handleSubmit}
          >
          <OpenCity wrappedComponentRef={(inst)=>{
                 this.cityForm = inst
          }}/>
          </Modal>
      </Fragment>
    );
  }
}
