import React, { Component } from "react";
import { Button, Form, Select, DatePicker } from "antd";

const Option = Select.Option;
const FormItem = Form.Item;

class FilterForm extends Component {

  handleSearch = () => {
       let searchInfo = this.props.form.getFieldsValue();
       console.log(searchInfo);
  };
  handleReload =()=>{

  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="城市">
          {getFieldDecorator("city_id",{
          })(
            <Select placeholder="全部" style={{ width: 80 }}>
              <Option value="">全部</Option>
              <Option value="1">北京</Option>
              <Option value="2">上海</Option>
              <Option value="3">杭州</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="订单时间">
          {getFieldDecorator("start_time")(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
          {getFieldDecorator("end_time")(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </FormItem>
        <FormItem label="订单状态">
          {getFieldDecorator("op_mode")(
            <Select placeholder="全部" style={{ width: 120 }}>
              <Option value="">全部</Option>
              <Option value="0">进行中</Option>
              <Option value="1">进行中（暂时）</Option>
              <Option value="2">结束行程</Option>
            </Select>
          )}
        </FormItem>

        <FormItem>
          <Button
            icon="search"
            type="primary"
            style={{ margin: "0 20px" }}
            onClick={this.handleSearch}
          >
            查询
          </Button>
          <Button icon="reload" type="default" onClick={this.handleReload}>
            重置
          </Button>
        </FormItem>
      </Form>
    );
  }
}
//用于表单的双向绑定
export default Form.create({})(FilterForm);
