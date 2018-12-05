import React, { Component } from "react";
import { Form, Select, Input, Tree } from "antd";
import menuConfig from "../../config/menuConfig";


const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
class PermEditForm extends Component {


  renderTreeNodes = data => {
//一定要写 return 不然数据不能出来
    return data.map(item => {
      //如果有子节点递归调用
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      //跳转各个功能点
      return <TreeNode title={item.title} key={item.key} />;
    });
  };

  onCheck=(checkedKeys)=>{
    console.log(checkedKeys);
    this.props.patchMenuInfo(checkedKeys)

  }

  render() {
    //栅格布局
    const { getFieldDecorator } = this.props.form;
    const detailInfo = this.props.detailInfo;
    const menuInfo = this.props.menuInfo;
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
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator("status", {
            initialValue: detailInfo.status + ""
          })(
            <Select style={{ width: 120 }}>
              <Option value="0">停用</Option>
              <Option value="1">启用</Option>
            </Select>
          )}
        </FormItem>
        <Tree
         checkable
         defaultExpandAll
         onCheck={(checkedKeys)=>{
             this.onCheck(checkedKeys)
         }}
         checkedKeys={menuInfo}
        >
          <TreeNode title="平台权限" key="platform_all">
            {this.renderTreeNodes(menuConfig)}
          </TreeNode>
        </Tree>
      </Form>
    );
  }
}

export default Form.create({})(PermEditForm);
