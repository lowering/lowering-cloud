import cloneDeep from 'lodash/cloneDeep';
import Dashboard from '../routes/dashboard';
import Users from '../routes/users';
import Roles from '../routes/roles';

const data = [{
    layout: 'GenericLayout',
    name: '首页', // for breadcrumb
    path: '',
    children: [{
        name: '仪表盘',
        icon: 'dashboard',
        path: 'dashboard',
        component: Dashboard
    }, {
        name: '表单页',
        path: 'form',
        icon: 'form',
        children: [{
            name: '基础表单',
            path: 'basic-form',
        }, {
            name: '分步表单',
            path: 'step-form',
            children: [{
                path: 'confirm',
            }, {
                path: 'result',
            }],
        }, {
            name: '高级表单',
            path: 'advanced-form',
        }],
    }, {
        name: '列表页',
        path: 'list',
        icon: 'table',
        children: [{
            name: '查询表格',
            path: 'table-list',
        }, {
            name: '标准列表',
            path: 'basic-list',
        }, {
            name: '卡片列表',
            path: 'card-list',
        }, {
            name: '搜索列表（项目）',
            path: 'cover-card-list',
        }, {
            name: '搜索列表（应用）',
            path: 'filter-card-list',
        }, {
            name: '搜索列表（文章）',
            path: 'search',
        }],
    }, {
        name: '详情页',
        path: 'profile',
        icon: 'profile',
        children: [{
            name: '基础详情页',
            path: 'basic',
        }, {
            name: '高级详情页',
            path: 'advanced',
        }],
    }, {
        name: '结果',
        path: 'result',
        icon: 'check-circle-o',
        children: [{
            name: '成功',
            path: 'success',
        }, {
            name: '失败',
            path: 'fail',
        }],
    }, {
        name: '异常',
        path: 'exception',
        icon: 'warning',
        children: [{
            name: '403',
            path: '403',
        }, {
            name: '404',
            path: '404',
        }, {
            name: '500',
            path: '500',
        }],
    }, {
        name: '系统设置',
        path: 'setting',
        icon: 'setting',
        children: [{
            name: '用户管理',
            path: 'users',
            component: Users
        }, {
            name: '角色管理',
            path: 'roles',
            component: Roles
        }]
    }],
}, {
    layout: 'UserLayout',
    children: [{
        name: '帐户',
        icon: 'user',
        path: 'user',
        children: [{
            name: '登录',
            path: 'login',
        }, {
            name: '注册',
            path: 'register',
        }, {
            name: '注册结果',
            path: 'register-result',
        }],
    }],
}, {
    layout: 'BlankLayout',
    children: {
        name: '使用文档',
        path: 'http://pro.ant.design/docs/getting-started',
        target: '_blank',
        icon: 'book',
    },
}];

export function getNavbar() {
    return data;
}

function getPlainNode(nodes, path = '') {
    const arr = [];
    nodes.forEach((node) => {
        const item = node;
        item.path = `${path}/${item.path || ''}`.replace(/\/+/g, '/');
        item.exact = true;
        if (item.children && !item.component) {
            arr.push(...getPlainNode(item.children, item.path));
        } else {
            if (item.children && item.component) {
                item.exact = false;
            }
            arr.push(item);
        }
    });
    return arr;
}

export function getRoutes(path) {
    if (!data.some(item => item.layout === path) || !(data.filter(item => item.layout === path)[0].children)) {
        return null;
    }
    const nodes = cloneDeep(data.filter(item => item.layout === path)[0]);
    const routes = getPlainNode(nodes.children);
    return routes;
}

export default data;
