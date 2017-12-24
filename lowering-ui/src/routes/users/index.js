import React from 'react';
import { connect } from 'dva';
import OverviewLayout from '../../layouts/overview.layout';
import { Card, Table, Badge } from 'antd';

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
        }, {
            title: '状态',
            render (row) {
                if (row.enabled) {
                    return (<Badge status="success" text="启用" />);
                }
                return (<Badge status="error" text="禁用" />);
            }
        }, {
            title: '备注',
            dataIndex: 'description',
            key: 'description',
        }];

        let { users } = this.props;

        return (
            <OverviewLayout title="用户管理" content="用于提供对用户的各种操作。">
                <Card bordered={false}>
                    <Table dataSource={users.users} columns={columns} rowKey='id'/>
                </Card>
            </OverviewLayout>
        )
    }
}
export default connect(state=>{
    console.log(state);
    return {users:state.users}
})(Users);
