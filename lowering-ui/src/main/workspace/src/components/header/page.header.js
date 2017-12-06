import React, { createElement } from 'react';
import PropTypes from 'prop-types';

import { Breadcrumb, Tabs } from 'antd';

import styles from './page.header.less';

function getBreadcrumbNameWithParams(mapping, url) {
    let name = '';
    Object.keys(mapping).forEach((item) => {
        const regexp = new RegExp(`^${item.replace(/:[\w-]+/g, '[\\w-]+')}$`);
        if (regexp.test(url)) {
            name = mapping[item];
        }
    });
    return name;
}

class PageHeader extends React.PureComponent {

    constructor(props) {
        super(props);
        this.getBreadcrumbProps = this.getBreadcrumbProps.bind(this);
        this.itemRender = this.itemRender.bind(this);
    }

    getBreadcrumbProps() {
        return {
            routes: this.props.routes || this.context.routes,
            params: this.props.params || this.context.params,
            location: this.props.location || this.context.location,
            mapping: this.props.mapping || this.context.mapping
        };
    }

    onChange = (key) => {
        if (this.props.onTabChange) {
            this.props.onTabChange(key);
        }
    };

    itemRender = (route, params, routes, paths) => {
        const { linkElement = 'a' } = this.props;
        const last = routes.indexOf(route) === routes.length - 1;
        return (last || !route.component)
            ? <span>{route.breadcrumbName}</span>
            : createElement(linkElement, {
                href: paths.join('/') || '/',
                to: paths.join('/') || '/',
            }, route.breadcrumbName);
    }

    render() {
        //获取基本的属性
        const { routes, params, location, mapping } = this.getBreadcrumbProps();
        //从props中获取属性
        const { title, logo, action, content, extra, breadcrumbs, tabs, link = 'a' } = this.props;
        //定义面包屑
        let breadcrumb;
        //当有路由和参数的时候
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
                return (
                    <Breadcrumb.Item key={url}>
                        {createElement(
                            index === pathSnippets.length - 1 ? 'span' : link,
                            { [link === 'a' ? 'href' : 'to']: url },
                            mapping[url] ||
                            mapping[url.replace('/', '')] ||
                            getBreadcrumbNameWithParams(mapping, url) ||
                            url
                        )}
                    </Breadcrumb.Item>
                );
            });
            const breadcrumbItems = [(
                <Breadcrumb.Item key="home">
                    {createElement(link, {
                        [link === 'a' ? 'href' : 'to']: '/',
                    }, '首页')}
                </Breadcrumb.Item>
            )].concat(extraBreadcrumbItems);
            breadcrumb = (
                <Breadcrumb className={styles.breadcrumb}>
                    {breadcrumbItems}
                </Breadcrumb>
            );
        } else if (breadcrumbs && breadcrumbs.length) {
            breadcrumb = (
                <Breadcrumb className={styles.breadcrumb}>
                    {
                        breadcrumbs.map(item => (
                            <Breadcrumb.Item key={item.title}>
                                {item.href ? (
                                    createElement(link, {
                                        [link === 'a' ? 'href' : 'to']: item.href,
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
        //定义tab的默认值
        const defaultValue = tabs && (tabs.filter(item => item.default)[0] || tabs[0]);
        //渲染数据
        return (
            <div className={styles['page-header']}>
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
                            {extra && <div className={styles['extra-content']}>{extra}</div>}
                        </div>
                    </div>
                </div>
                {
                    tabs &&
                    tabs.length &&
                    <Tabs
                        className={styles.tabs}
                        defaultActiveKey={(defaultValue && defaultValue.key)}
                        onChange={this.onChange}
                    >
                        {
                            tabs.map(item => <Tabs.TabPane tab={item.tab} key={item.key} />)
                        }
                    </Tabs>
                }
            </div>
        );
    }
};

PageHeader.contextTypes = {
    routes: PropTypes.array,
    params: PropTypes.object,
    location: PropTypes.object,
    mapping: PropTypes.object,
}

export default PageHeader;