import React from 'react';
import { connect } from 'dva';
import OverviewLayout from '../../layouts/overview.layout';
import { Card, Table, Badge } from 'antd';
import Details from './details';

class Users extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
            id: undefined
        }
    }

    componentDidMount(){
        const {dispatch} = this.props;
        dispatch({type:"users/findAll"});
    }

    details = ({id})=>{
        this.setState({
            id
        })
    };
    test = ()=>{
        this.setState({
           a:'123'
        })
    }

    render() {

        const columns = [{
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
            render: (text, row)=>{
                return (<Details data={row} />);
            }
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
export default connect(({users})=>({users}))(Users);
