import React, { useState, useEffect, useCallback } from 'react'
import './index.less'
import connect from './connect'
import { Pagination, Badge } from 'antd'
import Drawer from 'components/Drawer'
import Detail from './Detail'

export default connect(function({list, total, getList, routerJump, getDetail}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [id, setCurrentId] = useState(null);

  const fetchList = useCallback(() => {
    getList({pageSize: 35, pageIndex: currentPage});
  }, [currentPage]);

  useEffect(fetchList, [currentPage]);

  const onError = useCallback(e => e.target.src = default_avater, []);

  const gotoDetail = useCallback(id => e => routerJump(`/personal/${id}`), []);

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
      <div style={{marginBottom: '10px'}}>,
        <Pagination onChange={setCurrentPage} total={total} current={currentPage} />
      </div>
    </div>

    <Drawer title='详情' visible={visible} onClose={closeDrawer} getContainer>
      <Detail id={id} getDetail={getDetail}/>
    </Drawer>
  </>);
})
