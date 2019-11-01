import React, { useState, memo } from 'react'
import { Icon, Modal, message } from 'antd'
const { confirm } = Modal;
import UploaderWithProgress from '@/components/ProgressUploader'

export default memo(function OperateBox({onCollect, onEdit, onRemove, id}){
  const [labelId] = useState(Math.random() + '');
  const [fileList, setFileList] = useState([]);
  const onClick = e => confirm({
    title: '真的要删除这张照片吗？',
    content: '确认删除后将无法恢复',
    onOk() {
      onRemove(id);
    },
    onCancel() {},
    cancelText: '取消',
    okText: '确定',
    centered: true
  });
  const onProgress = (index, { percent, localId }) => setFileList(fileList.map(each => each.localId === localId ? {...each, percent} : each));
  const onSuccess = (index, { response }) => {
    const { url, name } = response;
    onEdit(id, { url, name });
  }
  const onFailed = () => message.error('上传失败');

  return (<>
    <div className='OperateBox'>
      <div title='删除'><Icon type="delete" onClick={onClick}/></div>
      <div title='重新上传'>
        <label htmlFor={labelId}><Icon type="edit" /></label>
      </div>
      <div title='收藏'><Icon type="heart" onClick={e => onCollect(id)}/></div>
    </div>
    <UploaderWithProgress
      labelId={labelId}
      onChange={setFileList}
      onProgress={onProgress}
      onSuccess={onSuccess}
      onFailed={onFailed}
    />
  </>)
})
