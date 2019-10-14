import React, { useState } from 'react'
import {  Menu, Dropdown, Icon } from 'antd'
import { router } from 'umi'

const replace = payload => router.replace(payload);
const Overlay = () => (
  <Menu>
    <Menu.Item>
      <a onClick={e => replace('/gfnfg')}>
        退出
      </a>
    </Menu.Item>
    <Menu.Item>
      <a onClick={e => replace('/gfnfg')}>
        注册新用户
      </a>
    </Menu.Item>
  </Menu>
);
export default function Header({title, className}){
  return <h1 className='html-title'>
    <span>{title}</span>
    <span className='log-in-out'>
      <Dropdown overlay={<Overlay />}>
        <a className="ant-dropdown-link" href="javascript:;">
          操作 <Icon type="down" />
        </a>
      </Dropdown>
    </span>
  </h1>
}
