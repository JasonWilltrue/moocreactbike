import React, { Component } from 'react'
import { Table} from 'antd';
import Utils from '../../utils/utils';




export default class CTable extends Component {
  
  onRowClick=(record,index)=>{
    this.props.updateSelectedItem(record,index)
    }
  render() {
    let row_selection =  this.props.rowSelection 
    const  selectedRowKeys  = this.props.selectedRowKeys;
    const rowSelection = {
      type: "radio",
      selectedRowKeys,
      onChange:this.onSelectChange,
    };
    //不传默认单选
    if(row_selection === false || row_selection === null)
    {
      row_selection = false;
    }else if(row_selection === "checkbox" ){
      rowSelection.type = "checkbox"
    }else{
      row_selection = "radio"
    }
    
    

    return (
      <div>
          <Table
            bordered
            {...this.props}
            rowSelection={row_selection ? rowSelection : null} //单选多选  类型配置
            onRow={(record, index) => {
              return {
                onClick: () => {this.onRowClick}, //点击行
                onMouseEnter: () => {} //鼠标移入行
              };
            }}
          />
      </div>
    )
  }
}
