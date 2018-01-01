import React from 'react';
import { connect } from 'dva';
import { Card, Table } from 'antd';
import OverviewLayout from "../../layouts/overview.layout";

class Employee extends React.PureComponent {

    componentDidMount(){
        const {dispatch} = this.props;
        dispatch({type:"employee/findAll"});
    }

    render () {
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: '职位',
            dataIndex: 'job',
            key: 'job',
        }, {
            title: '工资',
            dataIndex: 'salary',
            key: 'salary',
        }, {
            title: '备注',
            dataIndex: 'description',
            key: 'description',
        }];

        const { employee } = this.props;

        return (
            <OverviewLayout title="员工管理" content="提供员工管理的相关操作">
                <Card bordered={false}>
                    <Table dataSource={employee.employees} columns={columns} rowKey="id"/>
                </Card>
            </OverviewLayout>
        );
    }
}

export default connect(({employee})=>({employee}))(Employee);
