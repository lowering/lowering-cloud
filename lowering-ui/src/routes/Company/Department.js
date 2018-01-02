import React from 'react';
import { connect } from 'dva';
import { Card, Table, Button, Menu, Dropdown, Icon } from 'antd';
import OverviewLayout from "../../layouts/OverviewLayout";
import Descriptions from '../../components/Descriptions';


const menu = (
    <Menu>
        <Menu.Item key="1">选项一</Menu.Item>
        <Menu.Item key="2">选项二</Menu.Item>
        <Menu.Item key="3">选项三</Menu.Item>
    </Menu>
);

const action = (
    <div>
        <Button type="primary" icon="plus">添加菜单</Button>
        <Button.Group>
            <Button>删除菜单</Button>
            <Button>操作</Button>
            <Dropdown overlay={menu} placement="bottomRight">
                <Button><Icon type="ellipsis" /></Button>
            </Dropdown>
        </Button.Group>
    </div>
);

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

const descriptions = (
    <Descriptions size="small" col="2">
        <Descriptions.Description term="所属组织">北京总部</Descriptions.Description>
        <Descriptions.Description term="备注">北京总部</Descriptions.Description>
    </Descriptions>
);

class Department extends React.PureComponent {

    componentDidMount(){
        const {dispatch} = this.props;
        dispatch({type:"department/findAll"});
    }

    render () {

        const { department } = this.props;

        return (
            <OverviewLayout title="部门管理" content={descriptions} action={action}>
                <Card bordered={false}>
                    <Table dataSource={department.departments} columns={columns} rowKey="id"/>
                </Card>
            </OverviewLayout>
        );
    }
}

export default connect(({department})=>({department}))(Department);
