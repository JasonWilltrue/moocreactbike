import React, { Component } from "react";
import { Form,  Input,Transfer } from "antd";



const FormItem = Form.Item;


class UserAuth extends Component {

  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  }
  handleChange=(targetKeys)=>{
     this.props.patchUserInfo(targetKeys)
  }
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
    console.log('mockData：',this.props.mockData);
    console.log('targetKeys',this.props.targetKeys);

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
        <FormItem label="选择用户" {...formItemLayout}>
        <Transfer
        listStyle={{height:400}}
        dataSource = {this.props.mockData}
         titles={['待选用户','已选用户']}
         showSearch
         searchPlaceholder='输入用户名'
         filterOption={this.filterOption}
         targetKeys={this.props.targetKeys}
         onChange={this.handleChange}
         render={item => item.title}
        />
        </FormItem>
      </Form>
    );
  }
}

export default Form.create({})(UserAuth);
