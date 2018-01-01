import React from 'react';
import { connect } from 'dva';
import OverviewLayout from '../../layouts/overview.layout';
import { Card, Table, Badge, Button, Popconfirm, Icon, Divider } from 'antd';
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

    render() {

        const columns = [{
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
            render: (text, {id})=>{
                return (<Details id={id} text={text}/>);
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
            render ({locked,enabled}) {
                return (
                    <div>
                        {locked ? <Badge status="error" text="锁定" /> : <Badge status="success" text="解锁" />}
                        <Divider type="vertical" />
                        {enabled ? <Badge status="success" text="启用" /> : <Badge status="error" text="禁用" />}
                    </div>
                );
            }
        }, {
            title: '备注',
            dataIndex: 'description',
            key: 'description',
        }, {
            title: '操作',
            render: ()=>{
                return (
                    <div>
                        <Button size="small">
                            <Icon type="edit"/>修改
                        </Button>
                        <Divider type="vertical" />
                        <Popconfirm title="确认删除?" cancelText="取消" okText="确认">
                            <Button type="danger" size="small">
                                <Icon type="delete" />删除
                            </Button>
                        </Popconfirm>
                    </div>
                );
            }
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
