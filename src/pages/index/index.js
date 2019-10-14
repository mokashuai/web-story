import React, { useState, useEffect, useCallback } from 'react'
import './index.less'
import connect from './connect'
import { Pagination, Badge } from 'antd'
import Drawer from 'components/Drawer'
import Detail from './Detail'
const pageSize = 35;
export default connect(function({list, total, currentPage, setCurrentPage, getList, routerJump, getDetail}) {
  const [visible, setVisible] = useState(false);
  const [id, setCurrentId] = useState(null);

  const fetchList = useCallback(() => {
    getList({pageSize, pageIndex: currentPage});
  }, [currentPage, getList]);

  useEffect(fetchList, [currentPage]);

  useEffect(() => {
    if(localStorage.getItem('isLogin') !== '1'){
      routerJump('/login');
    }
  }, []);

  const onError = useCallback(e => e.target.src = default_avater, []);

  const gotoDetail = useCallback(id => e => routerJump(`/personal/${id}`), [routerJump]);

  const openDrawer = useCallback(id => e => {
    setVisible(true);
    setCurrentId(id);
  }, []);

  const closeDrawer = useCallback(e => {
    setVisible(false);
    setCurrentId(null);
  }, []);

  return (<>
    <div className='html'>
      <div className='body'>
        <div className='container'>
        {
          list.map(({id, avatar, age, name}, i) => <div key={i} className='body-item'>
            <span className='badge'>
              <Badge count={age}>
                <a href="#" className="head-example" />
              </Badge>
            </span>
            <img src={avatar} title='' onError={onError} onClick={openDrawer(id)}/>
            <span className='detail'>
              <span>{name}</span>
              <span onClick={gotoDetail(id)}>详细信息</span>
            </span>
          </div>)
        }
        </div>
      </div>
      <div style={{margin: '15px'}}>
        <Pagination pageSize={pageSize} onChange={setCurrentPage} total={total} current={currentPage} size='small' />
      </div>
    </div>

    <Drawer title='详情' visible={visible} onClose={closeDrawer} getContainer>
      <Detail id={id} getDetail={getDetail}/>
    </Drawer>
  </>);
})
