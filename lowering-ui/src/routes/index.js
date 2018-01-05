import { uuid } from '../utils';
/**
 * 路由表
 *
 * 包含菜单和路由信息
 *
 */
export const routes = [{
    id: uuid(),
    name: '工作台',
    path: 'dashboard',
    constant: '',
    icon: 'dashboard',
    target: '_self',
    shown: true,
    description: "提供个人的工作台",
    models: [],
    component: ()=>import('./Dashboard')
}, {
    id: uuid(),
    name: "系统设置",
    constant: '',
    path: "setting",
    icon: "setting",
    target: "_self",
    shown: true,
    description: "提供系统相关设置",
    children: [{
        id: uuid(),
        name: "用户管理",
        constant: '',
        path: "users",
        icon: "user",
        target: "_self",
        shown: true,
        description: "提供用户管理相关操作",
        models: [import('../models/users')],
        component: ()=>import('./Users')
    }, {
        id: uuid(),
        name: "角色管理",
        constant: '',
        path: "roles",
        target: "_self",
        shown: true,
        description: "提供角色管理相关操作",
        models: [import('../models/roles')],
        component: ()=>import('./Roles')
    }, {
        id: uuid(),
        name: "资源管理",
        constant: '',
        path: "menus",
        target: "_self",
        shown: true,
        description: "提供菜单和权限管理相关操作",
        children: [{
            id: uuid(),
            name: "资源列表",
            constant: '',
            path: "list",
            target: "_self",
            shown: true,
            description: "提供菜单和权限管理相关操作",
            models:[import('../models/menus')],
            component: ()=>import('./Menus'),
        },{
            id: uuid(),
            name: "添加资源",
            constant: '',
            path: "save",
            target: "_self",
            shown: true,
            description: "提供菜单和权限管理相关操作",
            models:[import('../models/menus')],
            component: ()=>import('./Menus/save')
        }]
    }]
}, {
    id: uuid(),
    name: "组织机构管理",
    constant: '',
    path: "company",
    target: "_self",
    icon: 'contacts',
    shown: true,
    description: "提供组织机构管理相关操作",
    children: [{
        id: uuid(),
        name: "组织管理",
        path: "organization",
        target: "_self",
        shown: true,
        description: "提供组织管理相关操作",
        models: [import('../models/organization')],
        component: ()=>import('./Company/Organization')
    }, {
        id: uuid(),
        name: "部门管理",
        constant: '',
        path: "department",
        target: "_self",
        shown: true,
        description: "提供部门管理相关操作",
        models: [import('../models/department')],
        component: ()=>import('./Company/Department')
    }, {
        id: uuid(),
        name: "员工管理",
        constant: '',
        path: "employee",
        target: "_self",
        shown: true,
        description: "提供员工管理相关操作",
        models: [import('../models/employee')],
        component: ()=>import('./Company/Employee')
    }]
}];
