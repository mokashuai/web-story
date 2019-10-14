import React from 'react'
import './index.less';
import Header from './Header'

export default function BasicLayout({location, children}) {
  const hideHeader = ["/login", "/login/regist"].includes(location.pathname);
  return (
    <div className='html-layout'>
      {!hideHeader && <Header title='Welcome to beautiful girl !' />}
      {children}
    </div>
  );
}