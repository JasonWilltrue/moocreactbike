import React, { Component, Fragment } from "react";
import { Card, Form, Input, Icon } from "antd";
const FormItem = Form.Item;
class FormRegister extends Component {
  render() {
      //内部方法获取form表单的值 是括号结构出来的  from是object对象
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Card title="注册表单">
          <Form layout="horizontal" style={{width:300}}>
            <FormItem label="用户名">
              {getFieldDecorator("userName", {
                // initialValue:'jack',
                // 规则写在这里面
                rules: [
                  {
                    required: true,
                    message: "用户名不能为空"
                  },
                  {
                    min: 5,
                    max: 10,
                    message: "长度不在范围内"
                  },
                  {
                    //   pattern:/^\w+$/g,
                    pattern: new RegExp("^\\w+$", "g"),
                    message: "正则不匹配"
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="user" />}
                  type="text"
                  placeholder="请输入用户名"
                />
              )}
            </FormItem>

          </Form>
        </Card>
      </Fragment>
    );
  }
}
export default Form.create()(FormRegister);