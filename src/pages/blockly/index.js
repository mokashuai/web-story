import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import Blockly from 'blockly';
import * as Ch from 'blockly/msg/zh-hans';
// import * as Blockly_core from 'blockly/core'; zh-hans.js
import 'blockly/blocks';
import 'blockly/python';

import XmlBlockly from './blockly_xml';
// 存放的xml
import styles from './index.less';

Blockly.setLocale(Ch); // 支持中文

export default () => {
  const [num,setNum] = useState(1);

  const blockId = useRef('blocklyDiv');// 薪酬模块

  const click = useCallback(()=>{
    const num2 = num + 1 ;
    setNum(num2);
  }, [num])

  useEffect(()=>{
    const workspace =  Blockly.inject(blockId.current, {toolbox: document.getElementById('toolbox')});
    function myUpdateFunction(event) {
      const code_js = Blockly.JavaScript.workspaceToCode(workspace);
      console.log('code_js: ', code_js);
      // const code = Blockly.Xml.workspaceToDom(workspace);
      // const code_python = Blockly.Python.workspaceToCode(workspace);
      // console.log('code_python: ', code_python);
      const xml = Blockly.Xml.workspaceToDom(workspace);
      const xml_text = Blockly.Xml.domToText(xml);
      localStorage.setItem('xml_text',xml_text);
    }
    workspace.addChangeListener(myUpdateFunction);

    const xml_text = localStorage.getItem('xml_text');
    const xml = Blockly.Xml.textToDom(xml_text);
    Blockly.Xml.domToWorkspace(xml, workspace);
  },[])

  // Blockly.Blocks['lists_create_with'] = {
  //   /**
  //    * Block for creating a list with any number of elements of any type.
  //    * @this {Blockly.Block}
  //    */
  //   init: function() {
  //     this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
  //     this.setStyle('list_blocks');
  //     this.itemCount_ = 3;
  //     this.updateShape_();
  //     this.setOutput(true, 'Array');
  //     // This line is added.
  //     this.setInputsInline(true);
  //     this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
  //     this.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_TOOLTIP']);
  //   },

  //   // etc
  // }

  return (
    <>
      <div ref={blockId} style={{height: '715px', width: '100%', overflow: 'auto'}}></div>
      <XmlBlockly />
    </>
  )
}
