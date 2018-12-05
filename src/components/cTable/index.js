import React, { Component } from "react";
import { Table } from "antd";
import Utils from "../../utils/utils";

export default class CTable extends Component {
  onRowClick = (record, index) => {
    let rowSelection = this.props.rowSelection;
    if (rowSelection === "checkbox") {
      let selectedRowKeys = this.props.selectedRowKeys || [];
      let selectedItem = this.props.selectedItem;   //必须是个数组
      let selectedIds = this.props.selectedIds;
      if(selectedIds){
        const i = selectedIds.indexOf(record.id);
        if( i  == -1)
        {
          selectedIds.push(record.id);
          selectedRowKeys.push(index);
          selectedItem.push(record);
        }else{
           selectedIds.splice(i,1);
           selectedRowKeys.splice(i,1);
           selectedItem.splice(i,1);
        }
      }else{
        selectedIds = [record.id];
         selectedRowKeys = [record.id];
         selectedItem = [record];
      }
      this.props.updateSelectedItem(selectedRowKeys, selectedItem,selectedIds);
    } else {
      let selectedRowKeys = [index];
      let selectedItem = record;
      this.props.updateSelectedItem(selectedRowKeys, selectedItem);
    }
  };
  render() {
    let row_selection = this.props.rowSelection;
    const selectedRowKeys = this.props.selectedRowKeys;
    const rowSelection = {
      type: "radio",
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    //不传默认单选
    if (row_selection === false || row_selection === null) {
      row_selection = false;
    } else if (row_selection === "checkbox") {
      rowSelection.type = "checkbox";
    } else {
      row_selection = "radio";
    }

    return (
      <div>
        <Table
          bordered
          {...this.props}
          rowSelection={row_selection ? rowSelection : null} //单选多选  类型配置
          onRow={(record, index) => {
            return {
              onClick: () => {
                if (row_selection == false) return;
                this.onRowClick(record, index);
              }, //点击行
              onMouseEnter: () => {} //鼠标移入行
            };
          }}
        />
      </div>
    );
  }
}
