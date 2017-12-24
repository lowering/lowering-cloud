import sqlite from 'sqlite3';
import { uuid } from './src/utils';

let db = sqlite.verbose();

let database = new db.Database(':memory:',(error)=>{
    if (error) {
        throw error;
    }
});

database.serialize(()=>{
    //初始化数据
    database.run('PRAGMA foreign_keys = ON');
    //建表
    //用户表
    database.run("create table account_users(id TEXT primary key, nickname TEXT, username TEXT not null, password TEXT not null, email TEXT, enabled INT, locked INT, description TEXT)");
    //角色表
    database.run("create table account_roles(id TEXT primary key, rolename TEXT not null, constant TEXT not null, enabled int, description text)");
    //用户角色关系表
    database.run("create table account_users_roles(user_id text, role_id text, primary key(user_id,role_id), foreign key(role_id) references account_roles(id), foreign key(user_id) references account_users(id))");

    //菜单表
    database.run("create table account_menus(id TEXT primary key, name text not null, target text not null default '_self', href text, description text, shown int, parent text, foreign key(parent) references account_menus(id))");
    //角色菜单关系表
    database.run("create table account_roles_menus(menu_id text, role_id text, primary key(menu_id,role_id),foreign key(role_id) references account_roles(id),foreign key(menu_id) references account_menus(id))");

    //权限表
    database.run("create table account_authorities(id TEXT primary key, name text not null, constant text not null, enabled int, description text, menu_id text, foreign key(menu_id) references account_menus(id))");
    //角色权限关系表
    database.run("create table account_roles_authorities(authority_id text, role_id text, primary key(authority_id,role_id), foreign key(role_id) references account_roles(id),foreign key(authority_id) references account_authorities(id))");

    //组织表
    database.run("create table account_organizations(id TEXT primary key, name text not null, constant text not null, description text, parent text, foreign key(parent) references account_organizations(id))");
    //部门表
    database.run("create table account_departments(id TEXT primary key, name text not null, constant text not null, description text, organization_id text, foreign key(organization_id) references account_organizations(id))");
    //员工表
    database.run("create table account_employees(id TEXT primary key, name text not null, job text not null, phone text, email text, salary int, manager text, department_id text, created datetime, updated datetime, description text, foreign key(manager) references account_employees(id),foreign key(department_id) references account_departments(id))");


    let statement = database.prepare("INSERT INTO account_users(id,nickname,username,password,email,enabled,locked,description) VALUES (?,?,?,?,?,?,?,?)");
    //插入用户数据
    statement.run('40288ae4603025050160305247e30000','张三','zhangsan','zhangsan','zhangsan@zhangsan.com',1,0,'');
    statement.run('40288ae4603025050160305247e30001','李四','lisi','lisi','lisi@lisi.com',1,0,'');
    statement.run('40288ae4603025050160305247e30002','管理员','admin','admin','admin@admin.com',1,0,'');
    statement.finalize();

    //插入角色数据
    statement = database.prepare("insert into account_roles(id,constant,description,enabled,rolename) values (?,?,?,?,?)");
    statement.run('40288310604931e001604948d476000c', 'ADMIN', '管理员角色', 1, '管理员');
    statement.run('40288310604931e0016049491764000d', 'DEMO', '演示角色', 1, '演示');
    statement.run('40288310604931e0016049496536000e', 'SYS', '系统管理员角色', 1, '系统管理员');
    statement.run('40288310604931e0016049499d5c000f', 'TEST', '测试角色', 1, '测试');
    statement.finalize();

    //用户角色关系
    statement = database.prepare("insert into account_users_roles(user_id,role_id) values (?,?)");
    statement.run('40288ae4603025050160305247e30002','40288310604931e001604948d476000c');
    statement.run('40288ae4603025050160305247e30001','40288310604931e0016049496536000e');
    statement.finalize();

    //菜单数据
    statement = database.prepare("insert into account_menus(id,description,href,name,shown,target,parent) values (?,?,?,?,?,?,?)");
    statement.run('40288310604931e00160494314770007','提供个人的工作台','/dashboard','工作台',1,	'_self',null);
    statement.run('40288310604931e001604943ab9d0008','提供系统相关设置','/setting',	'系统设置',1,	'_self',null);
    statement.run('40288310604931e00160494480c50009','提供用户管理相关操作','/setting/users','用户管理',1,'_self','40288310604931e001604943ab9d0008');
    statement.run('40288310604931e0016049450c47000a','提供角色管理相关操作','/setting/roles','角色管理',1,'_self','40288310604931e001604943ab9d0008');
    statement.finalize();

    //角色菜单关系
    statement = database.prepare("insert into account_roles_menus(menu_id,role_id) values (?,?)");
    statement.run('40288310604931e00160494314770007','40288310604931e001604948d476000c');
    statement.run('40288310604931e001604943ab9d0008','40288310604931e001604948d476000c');
    statement.run('40288310604931e00160494480c50009','40288310604931e001604948d476000c');
    statement.run('40288310604931e0016049450c47000a','40288310604931e001604948d476000c');
    statement.run('40288310604931e00160494314770007','40288310604931e0016049496536000e');
    statement.run('40288310604931e001604943ab9d0008','40288310604931e0016049496536000e');
    statement.run('40288310604931e00160494480c50009','40288310604931e0016049496536000e');
    statement.run('40288310604931e0016049450c47000a','40288310604931e0016049496536000e');
    statement.finalize();

    //插入权限数据
    statement = database.prepare("insert into account_authorities(id,constant,description,enabled,name,menu_id) values (?,?,?,?,?,?)");
    statement.run('40288310604931e00160494d39a80010', 'SYS_USER_VIEW', '查询用户数据', 1, '查询用户', '40288310604931e00160494480c50009');
    statement.run('40288310604931e00160494df42f0011', 'SYS_USER_SAVE', '添加用户数据', 1, '添加用户', '40288310604931e00160494480c50009');
    statement.run('40288310604931e00160494e2e540012', 'SYS_USER_DELETE', '删除用户数据', 1, '删除用户', '40288310604931e00160494480c50009');
    statement.run('40288310604931e00160494e89430013', 'SYS_USER_UPDATE', '更新用户数据', 1, '更新用户', '40288310604931e00160494480c50009');
    statement.run('402883106049511101604952d0f30001', 'SYS_ROLE_VIEW', '查询角色数据', 1, '查询角色', '40288310604931e0016049450c47000a');
    statement.run('40288310604951110160495314760002', 'SYS_ROLE_SAVE', '添加角色数据', 1, '添加角色', '40288310604931e0016049450c47000a');
    statement.run('4028831060495111016049539cb10003', 'SYS_ROLE_DELETE', '删除角色数据', 1, '删除角色', '40288310604931e0016049450c47000a');
    statement.run('402883106049511101604953ed9c0004', 'SYS_ROLE_UPDATE', '修改角色数据', 1, '修改角色', '40288310604931e0016049450c47000a');
    statement.finalize();

    //角色权限关系
    statement = database.prepare("insert into account_roles_authorities(authority_id,role_id) values (?,?)");
    statement.run('40288310604931e00160494d39a80010','40288310604931e001604948d476000c');
    statement.run('40288310604931e00160494df42f0011','40288310604931e001604948d476000c');
    statement.run('40288310604931e00160494e2e540012','40288310604931e001604948d476000c');
    statement.run('40288310604931e00160494e89430013','40288310604931e001604948d476000c');
    statement.run('402883106049511101604952d0f30001','40288310604931e001604948d476000c');
    statement.run('40288310604951110160495314760002','40288310604931e001604948d476000c');
    statement.run('4028831060495111016049539cb10003','40288310604931e001604948d476000c');
    statement.run('402883106049511101604953ed9c0004','40288310604931e001604948d476000c');

    statement.run('40288310604931e00160494d39a80010','40288310604931e0016049496536000e');
    statement.run('40288310604931e00160494df42f0011','40288310604931e0016049496536000e');
    statement.run('40288310604931e00160494e2e540012','40288310604931e0016049496536000e');
    statement.run('40288310604931e00160494e89430013','40288310604931e0016049496536000e');
    statement.run('402883106049511101604952d0f30001','40288310604931e0016049496536000e');
    statement.run('40288310604951110160495314760002','40288310604931e0016049496536000e');
    statement.run('4028831060495111016049539cb10003','40288310604931e0016049496536000e');
    statement.run('402883106049511101604953ed9c0004','40288310604931e0016049496536000e');

    statement.finalize();

    //插入组织信息
    statement = database.prepare("insert into account_organizations(id,constant,name,description,parent) values (?,?,?,?,?)");
    statement.run('40288310604913950160491c12440000', 'beijing_group', '北京总部', '北京总部', null);
    statement.run('40288310604931e00160493360510000', 'chengdu_group', '成都分部', '成都分部', '40288310604913950160491c12440000');
    statement.run('40288310604931e00160493422740001', 'xian_group', '西安分部', '西安分部', '40288310604913950160491c12440000');
    statement.finalize();

    //插入部门信息
    statement = database.prepare("insert into account_departments(id,constant,description,name,organization_id) values (?,?,?,?,?)");
    statement.run('40288310604931e00160493560980002', 'beijing_group_dept', '北京研发部门', '研发部', '40288310604913950160491c12440000');
    statement.run('40288310604931e001604935e0f70003', 'chengdu_group_dept', '成都研发部门', '研发部', '40288310604931e00160493360510000');
    statement.run('40288310604931e00160493656f00004', 'xian_group_dept', '西安研发部门', '研发部', '40288310604931e00160493422740001');
    statement.finalize();

    //插入用工信息
    statement = database.prepare("insert into account_employees(id,created,description,email,job,name,phone,salary,updated,department_id,manager) values (?,?,?,?,?,?,?,?,?,?,?)");
    statement.run('40288310604931e00160493e2d780005', Date.now(), 'Java 开发工程师', 'zhangsan@zhangsan.com', 'Java 开发工程师', '张三', '13800138000', 5000, null, '40288310604931e00160493560980002', null);
    statement.run('40288310604931e00160494007b60006', Date.now(), 'Java 开发工程师', 'lisi@lisi.com', 'Java 开发工程师', '李四', '13800138000', 4000, null, '40288310604931e00160493560980002', '40288310604931e00160493e2d780005');
    statement.finalize();

    console.log('数据加载成功');
});






export default {
    //登录
    'POST /account/login': (req,res) => {
        const { username, password } = req.body;

        if (username && password){
            database.get('select * from account_users where username=?',username,(error,row)=>{
                if (error) throw error;
                if (row){
                    if (password === row.password){
                        res.send({
                            status: 100200,
                            description: '登录成功',
                            payload:{
                                authorization: {
                                    ...row
                                },
                                token: uuid(),
                                refresh: uuid()
                            }
                        });
                        return ;
                    }
                }
                res.send({
                    status: 100205,
                    description: '用户名或密码错误',
                    payload: {
                        username,
                        password
                    }
                });
            });
            return ;
        }

        res.send({
            status: '100205',
            description: '用户名或密码不能为空',
            payload: {
                username,
                password
            }
        });
    },
    //退出
    'POST /account/logout': (req,res)=>{

    },

    //用户相关操作
    //查询用户
    'GET /account/users': (req,res)=>{
        database.all('select * from account_users',(error,rows)=>{
            if (error) throw error;
            res.send({
                status:100200,
                description: '操作成功',
                payload: rows

            })
        })

    },
    //添加用户
    'POST /account/users': (req,res)=>{

    },
    //修改用户
    'PUT /account/users': (req,res)=>{

    },
    //删除用户
    'DELETE /account/users': (req,res)=>{
        const { id } = req.body;
        console.log(id)
    },

    //角色相关操作
    //查询角色
    'GET /account/roles': (req,res)=>{
        database.all('select * from account_roles',(error,rows)=>{
            if (error) throw error;
            res.send({
                status:100200,
                description: '操作成功',
                payload: rows

            })
        })
    },
    //添加角色
    'POST /account/roles': (req,res)=>{

    },
    //修改角色
    'PUT /account/roles': (req,res)=>{

    },
    //删除角色
    'DELETE /account/roles': (req,res)=>{

    },

    //菜单操作
    //查询菜单
    'GET /account/menus': (req,res)=>{
        database.all('select * from account_menus',(error,rows)=>{
            if (error) throw error;
            res.send({
                status:100200,
                description: '操作成功',
                payload: rows

            })
        })
    },
    //添加菜单
    'POST /account/menus': (req,res)=>{

    },
    //修改菜单
    'PUT /account/menus': (req,res)=>{

    },
    //删除菜单
    'DELETE /account/menus': (req,res)=>{

    },

    //权限操作
    //查询权限
    'GET /account/authorities': (req,res)=>{
        database.all('select * from account_authorities',(error,rows)=>{
            if (error) throw error;
            res.send({
                status:100200,
                description: '操作成功',
                payload: rows

            })
        })
    },
    //添加权限
    'POST /account/authorities': (req,res)=>{

    },
    //修改权限
    'PUT /account/authorities': (req,res)=>{

    },
    //删除权限
    'DELETE /account/authorities': (req,res)=>{

    },
    //组织操作
    //查询组织
    'GET /account/organizations': (req,res)=>{
        database.all('select * from account_organizations',(error,rows)=>{
            if (error) throw error;
            res.send({
                status:100200,
                description: '操作成功',
                payload: rows

            })
        })
    },
    //添加权限
    'POST /account/organizations': (req,res)=>{

    },
    //修改权限
    'PUT /account/organizations': (req,res)=>{

    },
    //删除权限
    'DELETE /account/organizations': (req,res)=>{

    },
    //部门操作
    //查询权限
    'GET /account/departments': (req,res)=>{
        database.all('select * from account_departments',(error,rows)=>{
            if (error) throw error;
            res.send({
                status:100200,
                description: '操作成功',
                payload: rows

            })
        })
    },
    //添加权限
    'POST /account/departments': (req,res)=>{

    },
    //修改权限
    'PUT /account/departments': (req,res)=>{

    },
    //删除权限
    'DELETE /account/departments': (req,res)=>{

    },
    //员工操作
    //查询权限
    'GET /account/employees': (req,res)=>{
        database.all('select * from account_employees',(error,rows)=>{
            if (error) throw error;
            res.send({
                status:100200,
                description: '操作成功',
                payload: rows

            })
        })
    },
    //添加权限
    'POST /account/employees': (req,res)=>{

    },
    //修改权限
    'PUT /account/employees': (req,res)=>{

    },
    //删除权限
    'DELETE /account/employees': (req,res)=>{

    },

};
