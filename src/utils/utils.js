/**
 * @pagination 分页功能
 */
import React from 'react';
import { Select } from "antd";
const Option = Select.Option;
export default {
    formateDate(time){
       if(!time) return "";
       let date = new Date(time);
       return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDay();
    },
     pagination(data,callback){
       let page = {
           onChange:(current)=>{
               callback(current); //告诉他们我们要干嘛
           },
           current : data.result.page,  //读取请求分页的数据  当前页数
           pageSize:data.result.page_size,    //每页条数
           total:data.result.total_count,        //总条数
           showTotal:()=>{
                return `总共${data.result.total_count}条数据，当前第${data.result.page}页`
           },
           showQuickJumper:false,//是否开启分页跳转
       }
       return page;

     },
     getOptionList(data){
         if(!data){
             return [];
         }
        //  let options = [<Option value="0" key="all_key"></Option>];
        let options = [];
         data.map((item) =>{
             options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
         })
         return options;
     },


     updateSelectedItem(selectKey,record,selectedIds){
        if(selectedIds){
            this.setState({
                selectedRowKeys: selectKey,
                selectedItem: record,
                selectedIds:selectedIds,
              });
        }else{
            this.setState({
                selectedRowKeys: selectKey,
                selectedItem: record
              });
        }

          console.log(record,selectedIds);

     }

}