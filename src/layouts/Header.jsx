import React from 'react'
import {  Menu, Dropdown, Icon, Button } from 'antd'
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
      <a onClick={e => router.push('/information')}>个人中心</a>
      &nbsp;&nbsp;
      <Dropdown overlay={<Overlay />} placement="bottomCenter" overlayStyle={{boxShadow: '0 0 10px 1px #eee'}}>
        <a className="ant-dropdown-link">
          更多操作
        </a>
      </Dropdown>
    </span>
  </h1>
}
