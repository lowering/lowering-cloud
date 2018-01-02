import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dva';
import { Route, Switch, Redirect } from 'dva/router';
import { Layout, Icon } from 'antd';
import cloneDeep from 'lodash/cloneDeep';

import { getPlainNode } from '../utils';

import ASide from '../components/ASide';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Wrapper from '../components/Wrapper';

//import Wrapper1 from '/src/components/wrapper';


class GeneralLayout extends React.PureComponent {

    static childContextTypes = {
        location: PropTypes.object,
        mapping: PropTypes.object,
        routes: PropTypes.array,
    }

    getChildContext() {
        const { location, menus } = this.props;
        const routes = getPlainNode(cloneDeep(menus));
        const children = this.getMenuData(menus, '');
        const mapping = {};
        children.forEach((item) => {
            mapping[item.path] = {
                name: item.name,
                component: item.component,
            };
        });
        return { location, mapping, routes };
    }

    getMenuData = (data, path) => {
        let arr = [];
        data.forEach((item) => {
            if (item.name) {
                arr.push({ path: `${path}/${item.path}`, name: item.name });
            }
            if (item.children) {
                arr = arr.concat(this.getMenuData(item.children, `${path}/${item.path}`));
            }
        });
        return arr;
    }

    render () {

        const { collapsed = false, location, dispatch, menus, authentication, mixin, app } = this.props;
        return (
            <Wrapper>
                <Layout>
                    <ASide
                        menus={menus}
                        collapsed={collapsed}
                        location={location}
                        dispatch={dispatch}
                    />
                    <Layout>
                        <Header
                            authentication={authentication}
                            collapsed={collapsed}
                            dispatch={dispatch}
                        />
                        <Layout.Content style={{ margin: '24px 24px 0', height: '100%' }}>
                            <div style={{ minHeight: 'calc(100vh - 260px)' }}>
                                <Switch>
                                    {
                                        getPlainNode(cloneDeep(menus)).map(item=>
                                            (
                                                <Route
                                                    exact={item.exact}
                                                    key={item.path}
                                                    path={item.path}
                                                    component={mixin(app,item.models,item.component)}
                                                />
                                            )
                                        )
                                    }
                                    <Redirect exact from="/" to="/dashboard" />
                                </Switch>
                            </div>
                        </Layout.Content>
                        <Footer
                            links={[{
                                title: 'Pro 首页',
                                href: 'http://pro.ant.design',
                                target: '_blank',
                            }, {
                                title: 'GitHub',
                                href: 'https://github.com/ant-design/ant-design-pro',
                                target: '_blank',
                            }, {
                                title: 'Ant Design',
                                href: 'http://ant.design',
                                target: '_blank',
                            }]}
                            copyright={
                                <div>
                                    Copyright <Icon type="copyright" /> 2017 蚂蚁金服体验技术部出品
                                </div>
                            }
                        />
                    </Layout>
                </Layout>
            </Wrapper>
        );
    }
}

export default connect(state => {
    return {
        collapsed: state.global.collapsed,
        menus: state.global.menus,
        authentication: state.global.authentication
    }
})(GeneralLayout);
