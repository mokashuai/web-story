import React, { useState, useEffect, useCallback } from 'react'
import './index.less'
import connect from './connect'

export default connect(function({list, getList}) {
  const [page, setPage] = useState(1);

  const fetchList = useCallback(() => {
    getList(page);
  }, [page]);

  useEffect(fetchList, []);

  return (
    <div className='html'>
      <div className='body'>
        <div className='body-item'></div>
        <div className='body-item'></div>
        <div className='body-item'></div>
        <div className='body-item'></div>
        <div className='body-item'></div>
        <div className='body-item'></div>
      </div>
    </div>
  );
})
