import React, { useState, useRef, useEffect, useCallback } from 'react'
import './style.less'

const useWinResize = () => {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });
  const resize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }, [])
  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  return size;
}

export default function Index({}){
  const [__html, onChange] = useState('');
  const { width, height } = useWinResize();
  const container = useRef();

  useEffect(() => {
    const log = e => {
      // console.log(e);
      console.log(document.getSelection());
    }
    document.addEventListener('selectionchange', log, false);
    return () => document.removeEventListener('selectionchange', log, false);
  }, [])

  const onInput = e => {
    const ele = e.target;
    onChange(ele.innerHTML);
  }

  const insert = e => {
    insertToHTML(onChange, __html, '<span class="tag">@黄帅</span>', container.current);
  }


  return (<>
    <button onClick={insert}>添加{ width } ~ { height }</button>
    <div
      contentEditable={true}
      className='contain'
      onInput={onInput}
      ref={container}
      dangerouslySetInnerHTML={{__html}}
    />
  </>)
}

function insertToHTML(insert, curStr, string, container){
  const curSelection = document.getSelection();
  const { anchorNode, anchorOffset, extentNode, extentOffset } = curSelection;
  const children = container.childNodes;

  let curNode = anchorNode, length = anchorOffset;
  while(curNode !== extentNode){
    curNode = anchorNode.nextSibling;
    length += curNode.length;
  }
  length += extentOffset;

  const left = curStr.substr(0, anchorOffset),
        right = curStr.substring(anchorOffset + length);
  insert(`${left}${string}${right}`);
}

class Range {
  constructor(container, prevText, html){
    this.childNodes = [...container.childNodes];
    this.selection = document.getSelection();
    this.text = prevText||'';
    /* anchorNode: text
    anchorOffset: 9
    baseNode: text
    baseOffset: 9
    extentNode: text
    extentOffset: 8
    focusNode: text
    focusOffset: 8
    isCollapsed: false
    rangeCount: 1
    type: "Range" */
  }
  get rangeSort(){//1指从左往右选，-1指从右往左选，0指点击某位置，未做选择
    const { anchorNode, extentNode, anchorOffset, extentOffset, focusNode, type } = this.selection;
    if(type === 'Caret'){
      return 0; //同一节点同一位置，无选区
    }
    if(anchorNode === extentNode){//选区位于同一节点
      return anchorOffset < extentOffset ? 1 : -1;
    }
    for(const curNode of this.childNodes){//选区位于不同节点
      if(curNode === anchorOffset){
        return 1;
      }
      if(curNode === extentOffset){
        return -1;
      }
    }
  }
  insert = () => {

  }
}
