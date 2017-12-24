import React from 'react';

import { Link } from 'dva/router';
import { Layout, Menu, Icon } from 'antd';

import logo from '../../assets/logo.svg';
import styles from './index.less';

export default class ASide extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            openKeys: this.getDefaultCollapsedSubMenus(props)
        }
    }

    onCollapse = (collapsed) => {
        this.props.dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: collapsed,
        });
    };

    getDefaultCollapsedSubMenus(props) {
        const currentMenuSelectedKeys = [...this.getCurrentMenuSelectedKeys(props)];
        currentMenuSelectedKeys.splice(-1, 1);
        if (currentMenuSelectedKeys.length === 0) {
            return ['dashboard'];
        }
        return currentMenuSelectedKeys;
    }

    getCurrentMenuSelectedKeys(props) {
        const { location: { pathname }, menus } = props || this.props;
        const keys = pathname.split('/').slice(1);
        if (keys.length === 1 && keys[0] === '') {
            return [menus[0].key];
        }
        return keys;
    }

    getMenuItems(menus, path = '') {
        if (!menus) {
            return [];
        }
        return menus.map((item) => {
            if (!item.name) {
                return null;
            }
            let itemPath;
            if (item.path.indexOf('http') === 0) {
                itemPath = item.path;
            } else {
                itemPath = `${path}/${item.path || ''}`.replace(/\/+/g, '/');
            }
            if (item.children && item.children.some(child => child.name)) {

                return (
                    <Menu.SubMenu
                        title={
                            item.icon ? (
                                <span>
                                    <Icon type={item.icon} />
                                    <span>{item.name}</span>
                                </span>
                            ) : item.name
                        }
                        key={item.key || item.path}
                    >
                        {this.getMenuItems(item.children, itemPath)}
                    </Menu.SubMenu>
                );
            }
            const icon = item.icon && <Icon type={item.icon} />;
            return (
                <Menu.Item key={item.key || item.path}>
                    {
                        /^https?:\/\//.test(itemPath) ? (
                            <a href={itemPath} target={item.target}>
                                {icon}<span>{item.name}</span>
                            </a>
                        ) : (
                            <Link
                                to={itemPath}
                                target={item.target}
                                replace={itemPath === this.props.location.pathname}
                            >
                                {icon}<span>{item.name}</span>
                            </Link>
                        )
                    }
                </Menu.Item>
            );
        });
    }

    handleOpenChange = (openKeys) => {
        const { menus }  = this.props;
        const lastOpenKey = openKeys[openKeys.length - 1];
        const isMainMenu = menus.some(
            item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
        );
        this.setState({
            openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
        });
    };

    render () {

        const { collapsed, menus } = this.props;

        const others = collapsed ? {} : {
            openKeys: this.state.openKeys,
        };

        return (
            <Layout.Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="md"
                onCollapse={this.onCollapse}
                width={256}
                className={styles.aside}
            >
                <div className={styles.logo}>
                    <Link to="/">
                        <img src={logo} alt="logo" />
                        <h1>Ant Design Pro</h1>
                    </Link>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    { ...others }
                    onOpenChange={this.handleOpenChange}
                    selectedKeys={this.getCurrentMenuSelectedKeys()}
                    style={{ padding: '16px 0', width: '100%' }}
                >
                    {this.getMenuItems(menus)}
                </Menu>
            </Layout.Sider>
        );
    }
}
