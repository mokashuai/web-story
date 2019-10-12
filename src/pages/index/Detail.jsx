import React, { useState, useEffect, useCallback } from 'react'


export default function Detail({id, getDetail=()=>{}}){

  const fetchDetail = useCallback(() => {
    getDetail({id});
  }, [id]);

  useEffect(() => {
    id && fetchDetail();
  }, [id]);

  return (<div className=''>

  </div>)
}
