import React, { useState, useEffect, useCallback } from 'react'


export default function Detail({id, getDetail=()=>{}}){
  const [detail, setDetail] = useState({});

  const fetchDetail = useCallback(() => {
    getDetail({id}).then(res => {
      setDetail(res);
    });
  }, [getDetail, id]);

  useEffect(() => {
    id && fetchDetail();
  }, [fetchDetail, id]);

  return (<div className=''>
  {detail.name}
  {detail.age}
  {detail.avatar}
  </div>)
}
