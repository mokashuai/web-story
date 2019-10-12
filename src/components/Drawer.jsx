import React, { useState } from 'react'
import { Drawer } from 'antd'
import './index.less'
//onClose

export default function MyDrawer({children, width=600, getContainer=false, ...props}){
  return <Drawer
    placement="right"
    closable={false}
    getContainer={getContainer}
    width={width}
    {...props}
  >
    {children}
  </Drawer>
}
