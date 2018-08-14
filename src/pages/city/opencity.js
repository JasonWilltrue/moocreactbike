import React, { Component } from "react";
import { Form, Select } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
class OpenCity extends Component {
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
        <FormItem label="请选择城市" {...formItemLayout}>
          {getFieldDecorator("city_id", {
            initialValue: "1"
          })(
            <Select style={{ width: 100 }}>
              <Option value="">全部</Option>
              <Option value="1">北京</Option>
              <Option value="2">上海</Option>
              <Option value="3">杭州</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="运营模式" {...formItemLayout}>
          {getFieldDecorator("op_mode", {
            initialValue: "1"
          })(
            <Select style={{ width: 100 }}>
              <Option value="1">自营</Option>
              <Option value="2">加盟</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="用车模式" {...formItemLayout}>
          {getFieldDecorator("use_mode", {
            initialValue: "1"
          })(
            <Select style={{ width: 120 }}>
              <Option value="1">指定停车点</Option>
              <Option value="2">禁停区</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create({})(OpenCity);
