import React, { useState } from 'react'
import {  Menu, Dropdown, Icon } from 'antd'
import { router } from 'umi'

const push = payload => {
  localStorage.clear();
  sessionStorage.clear();
  router.push(payload);
}
const Overlay = () => (
  <Menu>
    <Menu.Item>
      <a onClick={e => push('/login')}>
        退出
      </a>
    </Menu.Item>
    <Menu.Item>
      <a onClick={e => push('/login/regist')}>
        注册新用户
      </a>
    </Menu.Item>
  </Menu>
);
export default function Header({title}){
  return <h1 className='html-title'>
    <span>{title}</span>
    <span className='log-in-out'>
      <Dropdown overlay={<Overlay />}>
        <a className="ant-dropdown-link">
          操作 <Icon type="down" />
        </a>
      </Dropdown>
    </span>
  </h1>
}
