import React from 'react';
import { Row, Col, Card, Tabs } from 'antd';
import Descriptions from '../../components/Descriptions';
import BaseDetails from '../../components/BaseDetails';

class Details extends React.PureComponent {

    render () {
        const { text } = this.props;
        return (
            <BaseDetails text={text} title={<span>{text}</span>}>
                <Tabs>
                    <Tabs.TabPane tab="角色信息" key="1">
                        <Card bordered={false}>
                            <Descriptions size="large" title="角色详细信息">
                                <Descriptions.Description term="用户名">{text}</Descriptions.Description>
                                <Descriptions.Description term="性别">{text}</Descriptions.Description>
                                <Descriptions.Description term="邮箱">{text}</Descriptions.Description>
                                <Descriptions.Description term="备注">{text}</Descriptions.Description>
                            </Descriptions>
                        </Card>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="关联资源" key="2">
                        <Card bordered={false}>
                            关联资源
                        </Card>
                    </Tabs.TabPane>
                </Tabs>
            </BaseDetails>
        );
    }
}

export default Details;
