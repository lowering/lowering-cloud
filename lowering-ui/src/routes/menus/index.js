import React from 'react';
import { connect } from 'dva';
import { Card, Table, Badge, Row, Col, Tree, Icon, Button, Dropdown, Menu, Divider } from 'antd';
import OverviewLayout from "../../layouts/overview.layout";


class Menus extends React.PureComponent {

    componentWillMount () {
        this.props.dispatch({
            type:'menu/findAll'
        })
    }

    addMenu() {
        console.log('add');
    }



    render () {

        const columns = [{
            title: '资源名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '地址',
            dataIndex: 'href',
            key: 'href',
        }, {
            title: '打开方式',
            dataIndex: 'target',
            key: 'target',
        }, {
            title: '状态',
            render (row) {
                if (row.shown) {
                    return (<Badge status="success" text="显示" />);
                }
                return (<Badge status="error" text="隐藏" />);
            }
        }, {
            title: '备注',
            dataIndex: 'description',
            key: 'description',
        }];

        const action = (
            <div>
                <Button type="primary" icon="plus" onClick={this.addMenu}>添加菜单</Button>
                <Button.Group>
                    <Button type="danger" icon="delete">删除菜单</Button>
                    <Button>操作</Button>
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item key="1">选项一</Menu.Item>
                            <Menu.Item key="2">选项二</Menu.Item>
                            <Menu.Item key="3">选项三</Menu.Item>
                        </Menu>
                    } placement="bottomRight">
                        <Button><Icon type="ellipsis" /></Button>
                    </Dropdown>
                </Button.Group>
            </div>
        );

        const { menu } = this.props;

        return (
            <OverviewLayout title="资源管理" action={action}>
                <Card bordered={false}>
                    <Row gutter={24}>
                        <Col span={20}>
                            <Table dataSource={menu.menus} columns={columns} rowKey='id'/>
                        </Col>

                        <Col span={4}>
                            <Tree
                                defaultExpandedKeys={['0-0-0', '0-0-1']}
                                onSelect={this.onSelect}
                            >
                                <Tree.TreeNode title={<span><Icon type="dashboard" /> 工作台</span>} key="dashboard" />
                                <Tree.TreeNode title={<span><Icon type="setting" /> 系统设置</span>} key="setting">
                                    <Tree.TreeNode title="用户管理" key="0-0-0" />
                                    <Tree.TreeNode title="角色管理" key="0-0-0-0" />
                                    <Tree.TreeNode title="资源设置" key="0-0-0-1" />

                                </Tree.TreeNode>
                                <Tree.TreeNode title={<span><Icon type="dashboard" /> 组织机构管理</span>} key="0-0-1">
                                    <Tree.TreeNode title="组织管理" key="0-0-1-0" />
                                    <Tree.TreeNode title="部门管理" key="0-0-1-1" />
                                    <Tree.TreeNode title="员工管理" key="0-0-1-2" />
                                </Tree.TreeNode>
                            </Tree>

                        </Col>
                    </Row>
                </Card>
            </OverviewLayout>
        );
    }

}

export default connect(({menu})=>({menu}))(Menus);
