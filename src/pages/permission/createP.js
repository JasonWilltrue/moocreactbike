import React, { Component } from "react";
import { Form, Select, Input } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
class CreatePermission extends Component {
  render() {
    //栅格布局
    const { getFieldDecorator } = this.props.form;

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
        <FormItem label="角色名" {...formItemLayout}>
          {getFieldDecorator("city_id", {})(
            <Input placeholder="请输入角色名称" style={{width:120}}/>
          )}
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator("status", {
            initialValue: "1"
          })(
            <Select style={{ width: 120 }}>
              <Option value="0">关闭</Option>
              <Option value="1">开启</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create({})(CreatePermission);
