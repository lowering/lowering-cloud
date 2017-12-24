import React from 'react';
import { connect } from 'dva';
import { Card, Table, Badge } from 'antd';
import OverviewLayout from "../../layouts/overview.layout";

class Menu extends React.PureComponent {

    componentWillMount () {
        this.props.dispatch({
            type:'menu/findAll'
        })
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

        const { menu } = this.props;

        return (
            <OverviewLayout title="资源管理" content="提供菜单和权限的相关操作">
                <Card bordered={false}>
                    <Table dataSource={menu.menus} columns={columns} rowKey='id'/>
                </Card>
            </OverviewLayout>
        );
    }

}

export default connect(({menu})=>({menu}))(Menu);
