import React from 'react';
import {connect} from 'dva';
import { Table, Card, Badge } from 'antd';

import OverviewLayout from '../../layouts/OverviewLayout';
import Details from './details';


class Roles extends React.PureComponent {

    componentDidMount(){
        const {dispatch} = this.props;
        dispatch({type:'roles/findAll'});
    }

    render () {

        const columns = [{
            title: '角色名',
            dataIndex: 'rolename',
            key: 'rolename',
            render: (text,row)=>{
                return <Details text={text} />
            }
        }, {
            title: '唯一键(KEY)',
            dataIndex: 'constant',
            key: 'constant',
        }, {
            title: '是否可用',
            dataIndex: 'enabled',
            key: 'enabled',
            render: (value)=>{
                if (value) {
                    return (<Badge status="success" text="启用" />);
                }
                return (<Badge status="error" text="禁用" />);
            }
        }, {
            title: '备注',
            dataIndex: 'description',
            key: 'description',
        }];

        let {roles} = this.props;

        return (
            <OverviewLayout title="角色管理" content="用于提供对角色的各种操作。">
                <Card bordered={false}>
                    <Table dataSource={roles.roles} columns={columns} rowKey='id'/>
                </Card>
            </OverviewLayout>
        )
    }
}

export default connect(({roles})=>({roles}))(Roles);
