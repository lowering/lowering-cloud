import React from 'react';
import { connect } from 'dva';
import { Card, Table, Divider, Button, Popconfirm } from 'antd';
import OverviewLayout from "../../layouts/OverviewLayout";
import OrganizationDetails from './OrganizationDetails';

class Organization extends React.PureComponent {

    componentDidMount(){
        const {dispatch} = this.props;
        dispatch({type:"organization/findAll"});
    }

    render () {
        const columns = [{
            title: '组织名称',
            dataIndex: 'name',
            key: 'name',
            render (_,{id,name}){
                return (
                    <OrganizationDetails text={name} id={id} />
                );
            }
        }, {
            title: '唯一建',
            dataIndex: 'constant',
            key: 'constant',
        }, {
            title: '备注',
            dataIndex: 'description',
            key: 'description',
        }, {
            title: '操作',
            render (row) {
                return (
                    <div>
                        <Button type="warning" size="small">修改</Button>
                        <Divider type="vertical" />
                        <Popconfirm title="确认删除该记录？" okText="确认" cancelText="取消">
                            <Button type="danger" size="small">删除</Button>
                        </Popconfirm>
                    </div>
                );
            }
        }];

        const { organization } = this.props;

        return (
            <OverviewLayout title="组织管理" content="提供组织管理相关的操作">
                <Card bordered={false}>
                    <Table dataSource={organization.organizations} columns={columns} rowKey="id"/>
                </Card>
            </OverviewLayout>
        );
    }
}

export default connect(({organization})=>({organization}))(Organization);
