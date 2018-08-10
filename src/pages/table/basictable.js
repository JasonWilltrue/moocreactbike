import React, { Component } from 'react'
import { Card, Table} from 'antd';


export default class BasicTable extends Component {
    state={
        dataSource:[]
    }

    componentDidMount(){
        //类似与表头文件
        const dataSource = [
            {
                id:'1',
                name:'jack',
                password:'123456',
                datetime:'2018-08-11'
            },
            {
                id:'2',
                name:'jack',
                password:'123456',
                datetime:'2018-08-11'
            },
            {
                id:'3',
                name:'jack',
                password:'123456',
                datetime:'2018-08-11'
            },
            {
                id:'4',
                name:'jack',
                password:'123456',
                datetime:'2018-08-11'
            }
        ]
        this.setState({
            dataSource
        })
    }


    render() {
        const columns = [
            {
                title:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                dataIndex:'name'
            },
            {
                title:'密码',
                dataIndex:'password'
            },
            {
                title:'注册时间',
                dataIndex:'datetime'
            }
        ]
        return (
            <Card title="基础表格" className="card-warp">
               <Table
                bordered
                columns={columns}
                dataSource = {this.state.dataSource}
                pagination={false}
               >
               </Table>
           </Card>
        )

    }
}
