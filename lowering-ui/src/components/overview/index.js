import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Tabs } from 'antd';
import styles from './index.less';

function getBreadcrumb(breadcrumbNameMap, url) {
    if (breadcrumbNameMap[url]) {
        return breadcrumbNameMap[url];
    }
    const urlWithoutSplash = url.replace(/\/$/, '');
    if (breadcrumbNameMap[urlWithoutSplash]) {
        return breadcrumbNameMap[urlWithoutSplash];
    }
    let breadcrumb = '';
    Object.keys(breadcrumbNameMap).forEach((item) => {
        const itemRegExpStr = `^${item.replace(/:[\w-]+/g, '[\\w-]+')}$`;
        const itemRegExp = new RegExp(itemRegExpStr);
        if (itemRegExp.test(url)) {
            breadcrumb = breadcrumbNameMap[item];
        }
    });
    return breadcrumb;
}

export default class Overview extends React.PureComponent {
    static contextTypes = {
        routes: PropTypes.array,
        params: PropTypes.object,
        location: PropTypes.object,
        mapping: PropTypes.object,
    };
    onChange = (key) => {
        if (this.props.onTabChange) {
            this.props.onTabChange(key);
        }
    };
    getBreadcrumbProps = () => {
        return {
            routes: this.props.routes || this.context.routes,
            params: this.props.params || this.context.params,
            location: this.props.location || this.context.location,
            mapping: this.props.mapping || this.context.mapping,
        };
    };
    itemRender = (route, params, routes, paths) => {
        const { linkElement = 'a' } = this.props;
        const last = routes.indexOf(route) === routes.length - 1;
        return (last || !route.component)
            ? <span>{route.breadcrumbName}</span>
            : React.createElement(linkElement, {
                href: paths.join('/') || '/',
                to: paths.join('/') || '/',
            }, route.breadcrumbName);
    }
    render() {
        const { routes, params, location, mapping } = this.getBreadcrumbProps();
        const {
            title, logo, action, content, extraContent,
            breadcrumbList, tabList, className, linkElement = 'a',
        } = this.props;
        let breadcrumb;
        if (routes && params) {
            breadcrumb = (
                <Breadcrumb
                    className={styles.breadcrumb}
                    routes={routes.filter(route => route.breadcrumbName)}
                    params={params}
                    itemRender={this.itemRender}
                />
            );
        } else if (location && location.pathname) {
            const pathSnippets = location.pathname.split('/').filter(i => i);
            const extraBreadcrumbItems = pathSnippets.map((_, index) => {
                const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
                const currentBreadcrumb = getBreadcrumb(mapping, url);
                const isLinkable = (index !== pathSnippets.length - 1) && currentBreadcrumb.component;
                return (
                    <Breadcrumb.Item key={url}>
                        {React.createElement(
                            isLinkable ? linkElement : 'span',
                            { [linkElement === 'a' ? 'href' : 'to']: url },
                            currentBreadcrumb.name || url,
                        )}
                    </Breadcrumb.Item>
                );
            });
            const breadcrumbItems = [(
                <Breadcrumb.Item key="home">
                    {React.createElement(linkElement, {
                        [linkElement === 'a' ? 'href' : 'to']: '/',
                    }, '首页')}
                </Breadcrumb.Item>
            )].concat(extraBreadcrumbItems);
            breadcrumb = (
                <Breadcrumb className={styles.breadcrumb}>
                    {breadcrumbItems}
                </Breadcrumb>
            );
        } else if (breadcrumbList && breadcrumbList.length) {
            breadcrumb = (
                <Breadcrumb className={styles.breadcrumb}>
                    {
                        breadcrumbList.map(item => (
                            <Breadcrumb.Item key={item.title}>
                                {item.href ? (
                                    React.createElement(linkElement, {
                                        [linkElement === 'a' ? 'href' : 'to']: item.href,
                                    }, item.title)
                                ) : item.title}
                            </Breadcrumb.Item>)
                        )
                    }
                </Breadcrumb>
            );
        } else {
            breadcrumb = null;
        }

        const tabDefaultValue = tabList && (tabList.filter(item => item.default)[0] || tabList[0]);

        return (
            <div className={[styles.overview, className].join(' ')}>
                {breadcrumb}
                <div className={styles.detail}>
                    {logo && <div className={styles.logo}>{logo}</div>}
                    <div className={styles.main}>
                        <div className={styles.row}>
                            {title && <h1 className={styles.title}>{title}</h1>}
                            {action && <div className={styles.action}>{action}</div>}
                        </div>
                        <div className={styles.row}>
                            {content && <div className={styles.content}>{content}</div>}
                            {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
                        </div>
                    </div>
                </div>
                {
                    tabList &&
                    tabList.length &&
                    <Tabs
                        className={styles.tabs}
                        defaultActiveKey={(tabDefaultValue && tabDefaultValue.key)}
                        onChange={this.onChange}
                    >
                        {
                            tabList.map(item => <Tabs.TabPane tab={item.tab} key={item.key} />)
                        }
                    </Tabs>
                }
            </div>
        );
    }
}
