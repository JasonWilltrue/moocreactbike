import React, { Component } from "react";
import {Button, Form, Select} from "antd";


const Option = Select.Option;
const FormItem = Form.Item;
class FilterForm extends Component{
     render(){
         const {getFieldDecorator} = this.props.form;
         return(
             <Form layout="inline">
                <FormItem label="城市">
                   {
                       getFieldDecorator('city_id')(
                             <Select placeholder="全部"
                              style={{width:80}}
                             >
                             <Option value="">全部</Option>
                            <Option value="1">北京</Option>
                            <Option value="2">上海</Option>
                            <Option value="3">杭州</Option>
                           </Select>
                       )
                   }
                </FormItem>
                <FormItem label="用车模式">
                   {
                       getFieldDecorator('mode')(
                           <Select placeholder="全部" style={{width:160}}>
                            <Option value="">全部</Option>
                            <Option value="1">指定停车点模式</Option>
                            <Option value="2">禁停区模式</Option>
                           </Select>
                       )
                   }
                </FormItem>
                <FormItem label="运营模式">
                   {
                       getFieldDecorator('op_mode')(
                           <Select placeholder="全部" style={{width:80}}>
                            <Option value="">全部</Option>
                            <Option value="0">自营</Option>
                            <Option value="1">加盟</Option>
                           </Select>
                       )
                   }
                </FormItem>
                <FormItem label="加盟商授权状态">
                   {
                       getFieldDecorator('auth_status')(
                           <Select placeholder="全部" style={{width:100}}>
                            <Option value="">全部</Option>
                            <Option value="1">已授权</Option>
                            <Option value="2">未授权</Option>
                           </Select>
                       )
                   }
                </FormItem>
                <FormItem >
                   <Button icon="search" type="primary" style={{margin:"0 20px"}}>查询</Button>
                   <Button icon="reload" type="default">重置</Button>
                </FormItem>
             </Form>
         )
     }
}
//用于表单的双向绑定
export default Form.create({})(FilterForm);