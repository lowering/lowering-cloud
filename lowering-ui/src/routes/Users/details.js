import React from 'react';
import { connect } from 'dva';
import { Tabs, Card, Divider, Tag } from 'antd';
import BaseDetails from '../../components/BaseDetails';
import Descriptions from '../../components/Descriptions';

class Details extends React.PureComponent {

    toggle = ()=> {
        const { dispatch, id } = this.props;
        dispatch({type:'users/findOne',payload:{id}});
    };

    render () {
        const { details = {}, loading, text } = this.props;
        const { username, sex, email, locked, enabled, description } = details;
        return (
            <BaseDetails
                text={text}
                title={<span>{text}</span>}
                extra={<span>extra</span>}
                loading={loading}
                onClick={this.toggle}
            >
                <Tabs>
                    <Tabs.TabPane tab="用户信息" key="1">
                        <Card>
                            <Descriptions size="large" title="用户详细信息">
                                <Descriptions.Description term="用户名">{username}</Descriptions.Description>
                                <Descriptions.Description term="性别">{sex}</Descriptions.Description>
                                <Descriptions.Description term="邮箱">{email}</Descriptions.Description>
                                <Descriptions.Description term="状态">
                                    {locked ? <Tag color="#f50">锁定</Tag> : <Tag color="#108ee9">解锁</Tag>}
                                    {enabled ? <Tag color="#108ee9">启用</Tag> : <Tag color="#f50">禁用</Tag>}
                                </Descriptions.Description>
                                <Descriptions.Description term="备注">{description}</Descriptions.Description>
                            </Descriptions>
                            <Divider />
                            <Descriptions size="large" title="角色信息">
                                <Descriptions.Description term="角色名">{username}</Descriptions.Description>
                                <Descriptions.Description term="状态">{username}</Descriptions.Description>
                                <Descriptions.Description term="备注">{username}</Descriptions.Description>
                                <Descriptions.Description term="角色名">{username}</Descriptions.Description>
                                <Descriptions.Description term="状态">{username}</Descriptions.Description>
                                <Descriptions.Description term="备注">{username}</Descriptions.Description>
                            </Descriptions>
                        </Card>

                    </Tabs.TabPane>
                    <Tabs.TabPane tab="关联角色" key="2">
                        <p>Content of Tab Pane 3</p>
                        <p>Content of Tab Pane 3</p>
                        <p>Content of Tab Pane 3</p>
                    </Tabs.TabPane>
                </Tabs>
            </BaseDetails>
        );
    }

}
export default connect(({users})=>({details:users.details,loading:users.detailsLoading}))(Details);
