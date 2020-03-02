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
  const timeout = useRef();
  const instance = useRef();

  useEffect(() => {
    const log = e => {
      if(document.activeElement === container.current){
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          console.log(document.getSelection());
        }, 400);
      }
    }
    document.addEventListener('selectionchange', log, false);
    instance.current = new SetHTMLFromRange(container.current, 'tag');
    return () => document.removeEventListener('selectionchange', log, false);
  }, [])

  const onInput = e => {
    const ele = e.target;
    onChange(ele.innerHTML);
  }

  const insert = e => {
    instance.current.insert('<span class="tag">@黄帅</span>');
  }


  return (<>
    <button onClick={insert}>添加{ width } ~ { height }</button>
    <div
      contentEditable={true}
      className='contain'
      onInput={onInput}
      ref={container}>
      <span class="tag">@黄帅 </span>
    </div>
  </>)
}


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
class SetHTMLFromRange {
  constructor(container, tagClass){
    this.container = container;
    this.childNodes = [...container.childNodes];
    this.prevText = container.innerHTML;
    this.selection = document.getSelection();
    this.selectLength = true;
    this.tagClass = tagClass;
    this.range = document.createRange();
  }

  NO_RAMGE = 0
  SAME_NODE_LEFT_TO_RIGHT = 1
  SAME_NODE_RIGHT_TO_LEFT = 2
  DIFF_NODE_LEFT_TO_RIGHT = 3
  DIFF_NODE_RIGHT_TO_LEFT = 4


  get rangeType(){//1指从左往右选，-1指从右往左选，0指点击某位置，未做选择
    const { anchorNode, extentNode, anchorOffset, extentOffset, focusNode, isCollapsed } = this.selection;
    if(isCollapsed){
      this.selectLength = false;
      return this.NO_RAMGE; //同一节点同一位置，无选区
    }
    if(anchorNode === extentNode){//选区位于同一节点
      return anchorOffset < extentOffset ? this.SAME_NODE_LEFT_TO_RIGHT : this.SAME_NODE_RIGHT_TO_LEFT;
    }
    for(const curNode of this.childNodes){//选区位于不同节点
      if(curNode === anchorNode || curNode === anchorNode.parentNode){
        return this.DIFF_NODE_LEFT_TO_RIGHT;
      }
      if(curNode === extentNode || curNode === extentNode.parentNode){
        return this.DIFF_NODE_RIGHT_TO_LEFT;
      }
    }
  }

  getRange = () => {
    let { anchorNode, anchorOffset, extentNode, extentOffset, focusNode } = this.selection;
    const rangeType = this.rangeType;
    switch(rangeType){
      case this.NO_RAMGE: {
        if(this.rangeIsContainsTag(focusNode)){//点击了标签
          anchorOffset = extentOffset = anchorNode.length;
        }
        this.range.setStart(anchorNode, anchorOffset);
        this.range.setEnd(extentNode, extentOffset);
      }
      break;
      case this.DIFF_NODE_LEFT_TO_RIGHT: {
        if(this.rangeIsContainsTag(anchorNode)){//开始位置包含了标签
          anchorOffset = 0;
        }
        if(this.rangeIsContainsTag(extentNode)){//结束位置包含了标签
          extentOffset = extentNode.length;
        }
        this.range.setStart(anchorNode, anchorOffset);
        this.range.setEnd(extentNode, extentOffset);
      }
      break;
      case this.SAME_NODE_LEFT_TO_RIGHT: {
        if(this.rangeIsContainsTag(focusNode)){//点击了标签
          anchorOffset = extentOffset = anchorNode.length;
        }
        this.range.setStart(extentNode, extentOffset);
        this.range.setEnd(anchorNode, anchorOffset);
      }
      break;
      case this.DIFF_NODE_RIGHT_TO_LEFT: {
        if(this.rangeIsContainsTag(anchorNode)){//开始位置包含了标签
          anchorOffset = anchorNode.length;
        }
        if(this.rangeIsContainsTag(extentNode)){//结束位置包含了标签
          extentOffset = 0;
        }
        this.range.setStart(extentNode, extentOffset);
        this.range.setEnd(anchorNode, anchorOffset);
      }
      break;
    }
    return this.range;
  }

  addRange = (range) => {
    this.selection.removeAllRanges();
    this.selection.addRange(range);
  }

  rangeIsContainsTag = (node) => {
    return node.classList && node.classList.contains(this.tagClass) || node.parentNode && node.parentNode.classList.contains(this.tagClass);
  }

  insert = (string) => {
    const range = this.getRange();
    this.addRange(range);
    const fragment = document.createDocumentFragment();
    fragment.innerHTML = string;
    range.insertNode(fragment);
    this.container.innerHTML += string;
console.log(range)
    // this.container.
  }
}
