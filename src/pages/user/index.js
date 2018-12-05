import React, { Component } from 'react';
import { Card,Button,Modal,Form} from 'antd';
// 封装的工具类方法
import axios from './../../axios';
import Utils from '../../utils/utils';
//表格封装方法导入
import BaseForm from '../../components/baseForm';
import CTable from '../../components/cTable';
import CreateUser from './createUser';
const FormItem = Form.Item;
const Opiton = Form.Opiton;

export default class User extends Component {
	state = {
    list:[],
		selectedRowKeys: null,
    selectedItem: [],
    isCreateShow:false,
  };

	params = {
		page: 1,
	};

	formList = [
		{
			type: 'INPUT',
			label: '用户名',
			field: 'user_name',
			placeholder: '请输入用户名',
			width: 120,
		},
		{
			type: 'INPUT',
			label: '手机号',
			field: 'user_mobile',
			placeholder: '请输入手机号',
			width: 120,
		},
		{
			type: 'DATEPICKER',
			label: '入职日期',
			field: 'in_time',
			placeholder: '请选择入职日期',
			width: 140,
		},
	];
   
  componentDidMount() {
		this.request();
	}
	//筛选查询方法调用
	handleFilterSubmit = parmas => {
		this.params = parmas;
		console.log(this.params);
		this.request();
	};

	request = () => {
		axios.requestList(this, '/table/user_list', this.params, true);
	};

  handleOpenCreate=()=>{
     this.setState({
        isCreateShow:true
     })
  }
  handleOpenEdit=()=>{
    this.setState({
       isCreateShow:true
    })
 }

	render() {
		const columns = [
			{
        title: '员工ID',
        key:'id',
				dataIndex: 'id',
			},
			{
        title: '用户名',
        key:"user_name",
				dataIndex: 'user_name',
      },
      {
        title: '手机号',
        key:"user_mobile",
				dataIndex: 'user_mobile',
			},
			{
        title: '性别',
        key:"sex",
        dataIndex: 'sex',
        render(sex){
          return sex === 0 ? "女":"男"
        }
			},
			{
        title: '职位',
        key:"state",
        dataIndex: 'state',
        render(state){
           let config={
             "1":"实习生",
             "2":"普通原工",
             "3":"经理",
             "4":"董事长",
           }
           return config[state]
           
        }
			},
			{
        title: '爱好',
        key:"interest",
				dataIndex: 'interest',
      },
      {
        title: '入职时间',
        key:"in_time",
				dataIndex: 'in_time',
			},
		];
		return (
      
			<div>
				<Card>
					<BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />
				</Card>
      	<Card style={{ marginTop: 10 }} className="operate-warp">
					<Button icon="user-add" type="primary" onClick={this.handleOpenCreate}>
						创建员工
					</Button>
					<Button icon="edit" type="primary" onClick={this.handleOpenEdit}>
						编辑员工
					</Button>
          <Button icon="profile" type="primary" onClick={this.handleConfirm}>
						员工详情
					</Button>
          <Button icon="delete" type="danger" onClick={this.handleConfirm}>
						删除员工
					</Button>
				</Card>
					<div className="content-warp">
						<CTable
							columns={columns}
							dataSource={this.state.list}
							pagination={this.state.pagination}
							selectedRowKeys={this.state.selectedRowKeys}
							selectedItem={this.state.selectedItem}
							rowSelection={'radio'} //单选多选  类型配置
							updateSelectedItem={Utils.updateSelectedItem.bind(this)} //因为方法中有要更新的this.setstate 必须绑定this指向
						/>
					</div>
          <Modal
           title="创建员工"
           visible = {this.state.isCreateShow}
            onCancel = {()=>{
                this.setState({
                  isCreateShow:false
                })
            }}
            onOk = {this.handleCreateSubmit}
          >
          <CreateUser wrappedComponentRef={(inst)=>{
                 this.createUserInfo = inst
          }}/>
          </Modal>
			</div>
		);
	}
}
