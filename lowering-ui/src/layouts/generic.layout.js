import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Route, Switch, withRouter, NavLink, Link } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Layout, Button, Menu, Icon, Dropdown, Avatar } from 'antd';

import mixin from '../utils/mixin';
import { getNavbar, getRoutes } from '../common/navbar';
import Global from '../models/global';
import Footer from '../components/footer';

import styles from './generic.layout.less';

class GenericLayout extends React.PureComponent {

    constructor(props) {
        super(props);
        this.menus = getNavbar().reduce((arr, current) => arr.concat(current.children), []);

        this.state = {
            openKeys: this.getDefaultCollapsedSubMenus(props),
        };

        this.toggle = this.toggle.bind(this);
        this.buildSider = this.buildSider.bind(this);
        this.selectedKeys = this.selectedKeys.bind(this);
        this.handleOpenChange = this.handleOpenChange.bind(this);
        this.getDocumentTitle = this.getDocumentTitle.bind(this);
    }

    getChildContext() {
        const { location } = this.props;
        const routes = getRoutes('GenericLayout');
        const menus = getNavbar().reduce((arr, current) => arr.concat(current.children), []);
        const mapping = {};
        routes.concat(menus).forEach((item) => {
            mapping[item.path] = item.name;
        });
        return { location, mapping };
    }

    getDefaultCollapsedSubMenus(props) {
        const currentMenuSelectedKeys = [...this.selectedKeys(props)];
        currentMenuSelectedKeys.splice(-1, 1);
        if (currentMenuSelectedKeys.length === 0) {
            return ['dashboard'];
        }
        return currentMenuSelectedKeys;
    }

    toggle() {
        const { collapsed } = this.props;
        console.log(collapsed);
        this.props.dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: !collapsed,
        });
    }

    onCollapse() {

    }

    handleOpenChange = (openKeys) => {
        const lastOpenKey = openKeys[openKeys.length - 1];
        const isMainMenu = this.menus.some(
            item => (item.key === lastOpenKey || item.path === lastOpenKey)
        );
        this.setState({
            openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
        });
    }

    selectedKeys(props) {
        const { location: { pathname } } = props || this.props;
        const keys = pathname.split('/').slice(1);
        if (keys.length === 1 && keys[0] === '') {
            return [this.menus[0].key];
        }
        return keys;
    }


    buildSider(data, parent = '') {
        if (!data) {
            return [];
        }
        return data.map((item) => {
            if (!item.name) {
                return null;
            }
            let path;
            if (item.path.indexOf('http') === 0) {
                path = item.path;
            } else {
                path = `${parent}/${item.path || ''}`.replace(/\/+/g, '/');
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
                        {this.buildSider(item.children, path)}
                    </Menu.SubMenu>
                );
            }
            const icon = item.icon && <Icon type={item.icon} />;
            return (
                <Menu.Item key={item.key || item.path}>
                    {
                        /^https?:\/\//.test(path) ? (
                            <a href={path} target={item.target}>
                                {icon}<span>{item.name}</span>
                            </a>
                        ) : (
                                <Link to={path} target={item.target}>
                                    {icon}<span>{item.name}</span>
                                </Link>
                            )
                    }
                </Menu.Item>
            );
        });
    }

    getDocumentTitle() {
        const { location } = this.props;
        const { pathname } = location;
        let title = '管理系统首页';
        getRoutes('GenericLayout').forEach((item) => {
            if (item.path === pathname) {
                title = `${item.name}`;
            }
        });
        return title;
    }


    render() {

        const { collapsed } = this.props;
        const menuProps = collapsed ? {} : { openKeys: this.state.openKeys };

        const menu = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
                <Menu.Item><Icon type="user" />个人中心</Menu.Item>
                <Menu.Item><Icon type="setting" />设置</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
            </Menu>
        );

        return (
            <DocumentTitle title={this.getDocumentTitle()}>
                <Layout>
                    <Layout.Sider
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        breakpoint="md"
                        onCollapse={this.onCollapse}
                        width={256}
                        className={styles.sider}
                    >
                        <div className={styles.logo}>
                            <Link to="/">
                                <img src="https://gw.alipayobjects.com/zos/rmsportal/iwWyPinUoseUxIAeElSx.svg" alt="logo" />
                                <h1>Ant Design Pro</h1>
                            </Link>
                        </div>
                        <Menu
                            theme="dark"
                            mode="inline"
                            {...menuProps}
                            onOpenChange={this.handleOpenChange}
                            selectedKeys={this.selectedKeys()}
                            style={{ margin: '16px 0', width: '100%' }}
                        >
                            {this.buildSider(this.menus)}
                        </Menu>
                    </Layout.Sider>
                    <Layout>
                        <Layout.Header className={styles.header}>
                            <Icon
                                className={styles.trigger}
                                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            <div className={styles.right}>
                                <Dropdown overlay={menu}>
                                    <span className={`${styles.action} ${styles.account}`}>
                                        <Avatar size="small" className={styles.avatar} src='https://gw.alipayobjects.com/zos/rmsportal/dRFVcIqZOYPcSNrlJsqQ.png' />
                                        ADMIN
                                    </span>
                                </Dropdown>
                            </div>
                        </Layout.Header>
                        <Layout.Content style={{ margin: '24px 24px 0', height: '100%' }}>
                            <Switch>
                                {
                                    getRoutes('GenericLayout').map(item =>
                                        (
                                            <Route
                                                exact={item.exact}
                                                key={item.path}
                                                path={item.path}
                                                component={item.component}
                                            />
                                        )
                                    )
                                }

                            </Switch>
                        </Layout.Content>
                        <Layout.Footer>
                            <Footer />
                        </Layout.Footer>
                    </Layout>
                </Layout>
            </DocumentTitle>
        );
    }
}

GenericLayout.childContextTypes = {
    location: PropTypes.object,
    mapping: PropTypes.object
}

export default withRouter(mixin([Global], connect(state => ({ collapsed: state.global.collapsed }))(GenericLayout)));

