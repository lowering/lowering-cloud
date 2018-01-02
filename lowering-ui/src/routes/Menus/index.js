import React from 'react';
import { connect } from 'dva';
import { Card, Table, Badge, Row, Col, Tree, Icon, Button, Dropdown, Menu, Divider } from 'antd';
import OverviewLayout from "../../layouts/OverviewLayout";
import Items from './items';


class Menus extends React.PureComponent {

    componentWillMount () {
        this.props.dispatch({
            type:'menu/findAll'
        })
    }

    addMenu = (id)=>{
        console.log(id);
    };
    deleteMenu = (id)=>{
        console.log(id);
    };


    handleItemClick = (key,id)=>{
        switch (key){
            case 'add':
                this.addMenu(id);
                break;
            case 'delete':
                this.deleteMenu(id);
                break;
        }

    };

    getMenuNodes = (nodes, onClick)=>{
        if (!nodes) {
            return [];
        }
        return nodes.map((item) => {
            if (!item.name) {
                return null;
            }
            if (item.children && item.children.some(child => child.name)) {
                return (
                    <Tree.TreeNode title={<Items data={item} onClick={onClick}/>} key={item.href} >
                        {this.getMenuNodes(item.children, onClick)}
                    </Tree.TreeNode>
                );
            }
            return (
                <Tree.TreeNode title={<Items data={item} onClick={onClick}/>} key={item.href} />
            );
        });
    };



    render () {

        const nodes = [{
            id:'1',
            icon:'dashboard',
            name:'工作台',
            enabled:true,
            target:'_self',
            href:'/dashboard'
        }, {
            id:'2',
            icon:'setting',
            name:'系统设置',
            enabled:true,
            target:'_self',
            href:'/setting',
            children: [{
                id:'11',
                icon:'setting',
                name:'用户管理',
                enabled:true,
                target:'_self',
                href:'/users',
            }, {
                id:'12',
                icon:'setting',
                name:'角色管理',
                enabled:true,
                target:'_self',
                href:'/roles',
            }, {
                id:'13',
                icon:'setting',
                name:'资源管理',
                enabled:true,
                target:'_self',
                href:'/menus',
            }]
        }, {
            id:'2',
            icon:'setting',
            name:'组织机构管理',
            enabled:true,
            target:'_self',
            href:'/company',
            children: [{
                id:'21',
                icon:'setting',
                name:'组织管理',
                enabled:true,
                target:'_self',
                href:'/organizations',
            }, {
                id:'22',
                icon:'setting',
                name:'部门管理',
                enabled:true,
                target:'_self',
                href:'/departments',
            }, {
                id:'23',
                icon:'dashboard',
                name:'员工管理',
                enabled:true,
                target:'_self',
                href:'/employees',
            }]
        }];



        const action = (
            <div>
                <Button type="primary" icon="plus" onClick={this.addMenu}>添加菜单</Button>
                <Button.Group>
                    <Button type="danger" icon="delete">删除菜单</Button>
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

        return (
            <OverviewLayout title="资源管理" action={action}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card bordered={false}>
                            <Tree
                                defaultExpandedKeys={['/setting', '/company']}
                                onSelect={this.onSelect}
                            >
                                {this.getMenuNodes(nodes, this.handleItemClick)}
                            </Tree>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false}>
                            <Tree
                                defaultExpandedKeys={['0-0-0', '0-0-1']}
                                onSelect={this.onSelect}
                            >
                                <Tree.TreeNode title={<Items data={{icon:'dashboard',name:'工作台',enabled:true,target:'_self',href:'/dashboard'}}/>} key="dashboard" />
                                <Tree.TreeNode title={<Items data={{icon:'setting',name:'系统设置',enabled:true,target:'_self',href:'/dashboard'}}/>} key="setting">
                                    <Tree.TreeNode title={<Items data={{name:'用户管理',enabled:true,target:'_self',href:'/setting/users'}}/>} key="0-0-0" />
                                    <Tree.TreeNode title={<Items data={{name:'角色管理',enabled:true,target:'_self',href:'/setting/roles'}}/>} key="0-0-0-0" />
                                    <Tree.TreeNode title={<Items data={{name:'资源管理',enabled:true,target:'_self',href:'/setting/menus'}}/>} key="0-0-0-1" />
                                </Tree.TreeNode>
                                <Tree.TreeNode title={<Items data={{icon:'dashboard',name:'组织机构管理',enabled:true,target:'_self',href:'/company'}}/>} key="0-0-1">
                                    <Tree.TreeNode title={<Items data={{name:'组织管理',enabled:true,target:'_self',href:'/company/employees'}}/>} key="0-0-1-0" />
                                    <Tree.TreeNode title={<Items data={{name:'部门管理',enabled:true,target:'_self',href:'/company/employees'}}/>} key="0-0-1-1" />
                                    <Tree.TreeNode title={<Items data={{name:'员工管理',enabled:true,target:'_self',href:'/company/employees'}}/>} key="0-0-1-2" />
                                </Tree.TreeNode>
                            </Tree>
                        </Card>
                    </Col>
                </Row>
            </OverviewLayout>
        );
    }

}

export default connect(({menu})=>({menu}))(Menus);
