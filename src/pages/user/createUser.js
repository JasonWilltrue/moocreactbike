import React, { Component } from "react";
import { Form, Select, Input,} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class CreateUser extends Component {
  render() {
   
    const { getFieldDecorator } = this.props.form;
    
    //栅格布局
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    };
    return (
      <Form layout="horizontal">
        <FormItem label="姓名" {...formItemLayout}>
          {getFieldDecorator("user_name", {})(
            <Input placeholder="请输入姓名" style={{width:120}}/>
          )}
        </FormItem>
        <FormItem label="手机号" {...formItemLayout}>
          {getFieldDecorator("user_mobile", {})(
            <Input placeholder="请输入手机号" style={{width:120}}/>
          )}
        </FormItem>
        <FormItem label="性别" {...formItemLayout}>
          {getFieldDecorator("sex", {
            initialValue: "0"
          })(
            <Select style={{ width: 120 }}>
              <Option value="1">男</Option>
              <Option value="0">女</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="公司职位" {...formItemLayout}>
          {getFieldDecorator("state", {
            initialValue: "1"
          })(
            <Select style={{ width: 120 }}>
              <Option value="1">实习生</Option>
              <Option value="2">普通员工</Option>
              <Option value="3">经理</Option>
              <Option value="4">董事长</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="备注" {...formItemLayout}>
          {getFieldDecorator("mark", {})(
            <TextArea rows={4} placeholder="请输入备注信息" />
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create({})(CreateUser);
