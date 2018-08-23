import React, { Component } from "react";
import { Form,  Input,Transfer } from "antd";



const FormItem = Form.Item;


class UserAuth extends Component {


  render() {
    //栅格布局
    const { getFieldDecorator } = this.props.form;
    const detailInfo = this.props.detailInfo;

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
          {getFieldDecorator("role_name", {})(
            <Input
              disabled
              placeholder={detailInfo.role_name}
              style={{ width: 120 }}
            />
          )}
        </FormItem>
        <Transfer
        dataSource = {this.props.mockData}
         //TODO:明天继续
        >

        </Transfer>

      </Form>
    );
  }
}

export default Form.create({})(UserAuth);
