import React from 'react';
import { connect } from 'dva';
import { Card, Table } from 'antd';
import OverviewLayout from "../../layouts/overview.layout";

class Department extends React.PureComponent {

    componentDidMount(){
        const {dispatch} = this.props;
        dispatch({type:"department/findAll"});
    }

    render () {

        const columns = [{
            title: '部门名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '唯一建',
            dataIndex: 'constant',
            key: 'constant',
        }, {
            title: '备注',
            dataIndex: 'description',
            key: 'description',
        }];

        const { department } = this.props;

        return (
            <OverviewLayout title="部门管理" content="提供部门相关的操作">
                <Card bordered={false}>
                    <Table dataSource={department.departments} columns={columns} rowKey="id"/>
                </Card>
            </OverviewLayout>
        );
    }
}

export default connect(({department})=>({department}))(Department);
