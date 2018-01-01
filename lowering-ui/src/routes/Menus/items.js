import React from 'react';
import { Divider, Tag, Icon, Dropdown, Menu } from 'antd';

export default ({data = {}, onClick})=>{

    const menu = (
        <Menu onClick={onClick}>
            <Menu.Item key="add">
                <Icon type="plus" /> 添加子资源
            </Menu.Item>
            <Menu.Item key="delete">
                <Icon type="minus" /> 删除当前资源
            </Menu.Item>
        </Menu>
    );

    const getOverlay = (id)=>{
        return (
            <Menu onClick={({key})=>{onClick(key,id)}}>
                <Menu.Item key="add">
                    <Icon type="plus" /> 添加子资源
                </Menu.Item>
                <Menu.Item key="delete">
                    <Icon type="minus" /> 删除当前资源
                </Menu.Item>
            </Menu>
        );
    };

    return (
        <span>
            {
                data.icon ? <span style={{marginRight:5}}><Icon type={data.icon} /></span> : null
            }
            <span>{data.name}</span>
            <Divider type='vertical'/>
            <span>
                {data.enabled ? <Tag color="green" style={{marginRight:0}}>显示</Tag> : <Tag color="red" style={{marginRight:0}}>隐藏</Tag>}
            </span>
            <Divider type='vertical'/>
            <span>
                {data.target}
            </span>
            <Divider type='vertical'/>
            <span>
                {data.href}
            </span>
            <Divider type='vertical'/>
            <span onClick={(e)=>{e.stopPropagation();e.preventDefault();}}>
                <Dropdown overlay={getOverlay(data.id)} trigger={['click']}>
                    <Tag className="ant-dropdown-link">
                        <Icon type="ellipsis" />
                    </Tag>
                </Dropdown>
            </span>
        </span>
    );
}
