import React, { useState, useEffect, useCallback } from 'react'
import './index.less'
import connect from './connect'
import OperateBox from './OperateBox'

export default connect(function Information({getInformation, information, pictures, onChangePicture}){

  useEffect(() => {
    getInformation();
  }, [])

  const onCollect = useCallback(id => onChangePicture({type: 'collect', id}), []);
  const onEdit = useCallback((id, { url }) => onChangePicture({type: 'edit', id, url}), []);
  const onRemove = useCallback(id => onChangePicture({type: 'remove', id}), []);

  return (<div className='information'>
    <div className='information-left'>

    </div>
    <div className='information-center'>
      <header>
        <div className='avatar'>

        </div>
        <div className='info'>

        </div>
      </header>
      <section>
        {
          pictures.map(({id, url}) => <div className='picture' key={id}>
            <img src={url} />
            <div className='album-mask'>
              <OperateBox onCollect={onCollect} onEdit={onEdit} onRemove={onRemove} id={id}/>
            </div>
          </div>)
        }
      </section>
    </div>
    <div className='information-right'>

    </div>
  </div>)
})
