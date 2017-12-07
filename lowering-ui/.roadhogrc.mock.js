export default {
    "GET /account/users": (req,res) => {
        let users = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        }, {
            key: '3',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '4',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        }];

        res.send(users);
    },
    "GET /account/roles": (req,res) => {
        let roles = [{
            key: '1',
            name: '管理员',
            constant: 'ADMIN',
            enabled: true,
            description: '管理员角色'
        }, {
            key: '2',
            name: '测试',
            constant: 'TEST',
            enabled: true,
            description: '测试角色'
        }, {
            key: '3',
            name: '演示',
            constant: 'DEMO',
            enabled: true,
            description: '演示角色'
        }, {
            key: '4',
            name: '经理',
            constant: 'MANAGER',
            enabled: false,
            description: '经理角色'
        }];

        res.send(roles);
    }
}
