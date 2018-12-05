import React, { Component, Fragment } from "react";
import { Card, Form, Input, Button, message,Icon, Checkbox} from "antd";
const FormItem = Form.Item;
class FormLogin extends Component {
  handleSubmit = () => {
    //获取表单属性值的方法
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(
          `亲，${userInfo.userName}成功登录了,密码是${userInfo.passWord}`
        );
      }
    });
  };

  render() {
    //内部方法获取form表单的值
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Card title="登录行内表单">
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem>
              <Input  placeholder="请输入密码" />
            </FormItem>
            <FormItem>
              <Button type="primary">登录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title="登录水平表单" style={{ marginTop: 10 }}>
          <Form layout="horizontal" style={{ width: 200 }}>
            <FormItem>
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
                      pattern:new RegExp('^\\w+$','g'),
                      message:'正则不匹配'
                  }
                ]
              })(<Input  prefix={<Icon type="user"/>} type="text" placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator("passWord", {

                rules: []
              })(<Input prefix={<Icon type="lock"/>} type="password" placeholder="请输入密码" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator("remember", {
                  //默认配置2个参数
                 valuePropName:'checked',
                 initialValue:true,
              })(<Checkbox>记住密码</Checkbox>)}
              <a href='#javascript:;' style={{float:'right'}}>忘记密码？</a>
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                onClick={() => {
                  this.handleSubmit();
                }}
              >
                登录
              </Button>
            </FormItem>
          </Form>
        </Card>
      </Fragment>
    );
  }
}

export default Form.create()(FormLogin);
