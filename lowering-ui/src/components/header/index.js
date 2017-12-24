import React from 'react';
import { Layout, Icon, Menu, Dropdown, Avatar, Spin } from 'antd';
import { debounce } from '../../utils';

import styles from './index.less';

export default class Header extends React.PureComponent {

    componentWillUnmount() {
        //this.triggerResizeEvent.cancel();
    }

    toggle = () => {
        const { collapsed,dispatch } = this.props;
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: {
                collapsed:!collapsed
            }
        });
        debounce(this.triggerResizeEvent(),600);
    };

    triggerResizeEvent () {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }

    handleMenuClick = ({key})=>{
        if (key === 'logout'){
            this.props.dispatch({
                type: 'login/logout',
            });
        }
    };

    render () {

        const profile = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={this.handleMenuClick}>
                <Menu.Item disabled><Icon type="profile" />个人中心</Menu.Item>
                <Menu.Item disabled><Icon type="setting" />设置</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
            </Menu>
        );

        const { collapsed, authentication = {} }  = this.props;

        return (
            <Layout.Header className={styles.header}>
                <Icon
                    className={styles.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <div className={styles.right}>
                    {
                        authentication.name ? (
                            <Dropdown overlay={profile}>
                                <span className={`${styles.action} ${styles.account}`}>
                                    <Avatar size="small" className={styles.avatar} src={authentication.avatar} />
                                    {authentication.name}
                                </span>
                            </Dropdown>
                        ) : <Spin size="small" style={{ marginLeft: 8 }} />
                    }
                </div>
            </Layout.Header>
        );
    }

}
