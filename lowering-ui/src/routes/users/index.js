import React from 'react';
import mixin from '../../utils/mixin';
import { connect } from 'dva';
import {withRouter} from 'dva/router';
import { Card, Table } from 'antd';
import PageLayout from '../../layouts/page.layout';
import UsersModel from '../../models/users';

class Users extends React.PureComponent {


    componentDidMount(){
        const {dispatch} = this.props;
        dispatch({type:"users/findAll"});
    }


    render() {

        const columns = [{
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        }];

        let { users } = this.props;

        return (
            <PageLayout title="用户管理" content="用于提供对用户的各种操作。">
                <Card bordered={false}>
                    <Table dataSource={users.users} columns={columns} rowKey='id'/>
                </Card>
            </PageLayout>
        )
    }
}
export default withRouter(connect(({users})=>({users}))(mixin([UsersModel],Users)));
