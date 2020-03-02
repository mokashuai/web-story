import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { findVariableEntities, VariableComponent } from './decorators'
import { ENTITY_VARIABLE } from './entities'
import { styleMap } from './styles'
import deepEqual from 'deep-equal'
import {
  Editor,
  EditorState,
  SelectionState,
  Entity,
  Modifier,
  RichUtils,
  AtomicBlockUtils,
  CompositeDecorator,
  convertFromRaw
} from 'draft-js';
import {
  findLinkEntities,
  findLinkText,
  LinkComponent,
  LinkTextComponent,
  findMentionEntities,
  MentionComponent,
} from './decorators'
import { ContentUtils } from 'braft-utils'
import { customBlockRenderer } from './blocks'
const VARIABLE_CHANGE_TYPES = {
  REPLACE_VARIABLE: 'replace-variable',
  INSERT_VARRIABLE: 'insert-variable',
};

class VariableTextEditor extends Component {

  static createEditorState(content, options) {
    options = options || { disableStyle: false, variables: null, replaceMode: 'replace' };
    let decorators;
    if (options.disableStyle) {
      decorators = [];
    } else {
      decorators = [{
        strategy: findVariableEntities,
        component: VariableComponent,
      }];
    }
    const { variables } = options;
    const editorState = BraftEditor.createEditorState(content, { decorators });
    if (variables) {
      return VariableTextEditor.replaceVariables(editorState, variables, { replaceMode: options.replaceMode });
    } else {
      return editorState;
    }
  }

  static replaceVariables(editorState, variables, options) {
    options = options || { replaceMode: 'replace' };
    const variableNameToInfo = variables.reduce((result, variable) => {
      result[variable.name] = variable;
      return result;
    }, {});
    const contentState = editorState.getCurrentContent();
    let newContentState = contentState;
    contentState.getBlocksAsArray().forEach((contentBlock) => {
      // The replacement usually changes the length of the text, and thus changes
      // the position of next variables. So we have to track the accumulation of
      // length difference accurately in order to do the future replacement in the
      // right place.
      let delta = 0;
      contentBlock.findEntityRanges(
        (value) => {
          const entityKey = value.getEntity();
          return entityKey && (Entity.get(entityKey).type === ENTITY_VARIABLE);
        },
        (start, end) => {
          const entityKey = contentBlock.getEntityAt(start);
          const entity = Entity.get(entityKey);
          const name = entity.getData().name;
          const selectionState = new SelectionState({
            anchorKey: contentBlock.getKey(),
            anchorOffset: start + delta,
            focusKey: contentBlock.getKey(),
            focusOffset: end + delta,
          });
          const variable = variableNameToInfo[name] || {};
          // 如果是merge模式,则忽略未定义的变量
          if (typeof variable.value === 'undefined' && options.replaceMode === 'merge') {
            return;
          }
          let value = variable.value || (name + '未知');
          // Replace variable with value.
          // Note that the `start` and `end` comes from the original contentState(before
          // any replacement), therefore don't forget to add the `delta` to get the right
          // position.
          let key;

          if (variable.type === 'map') {
            // map类型的变量
            //为了在发邮件时，不将地址地图替换，地址地图相对其他变量来说是静态的（发邮件时提取出的value是一个空格‘ ’））
            if (typeof value === 'string') {
              return;
            }
            key = Entity.create(ENTITY_VARIABLE, 'IMMUTABLE', { name: name, type: 'map', src: value.src, uri: value.uri });
            newContentState = Modifier.applyEntity(newContentState, selectionState, key);
          } else if (variable.type === 'html') {
            // html类型的变量
            key = Entity.create(ENTITY_VARIABLE, 'IMMUTABLE', { name: name, type: 'html', html: value });
            newContentState = Modifier.applyEntity(newContentState, selectionState, key);
          } else {
            // 普通的变量
            value = String(value);
            key = Entity.create(ENTITY_VARIABLE, 'IMMUTABLE', { name: name, type: 'text', html: value });
            newContentState = Modifier.applyEntity(newContentState, selectionState, key);

           /* newContentState = Modifier.replaceText(
              newContentState,
              selectionState,
              value,
              null,
              entityKey,
            ); */
            // Don't forget to accumulate length difference.
            // length of original text = (end - start)
            // length of replaced text = value.length
            // delta += String(value).length - (end - start);
          }
          // Mark the variable entity whether it has been replaced successfully.
          if (!variable.value) {
            // Mark the entity that we can't replace.
            Entity.mergeData(entityKey, { error: true });
          } else {
            // Mark the entity that we have finished replacement!
            Entity.mergeData(entityKey, { error: false });
          }
        }
      );
      return contentBlock;
    });

    return EditorState.push(editorState, newContentState, VARIABLE_CHANGE_TYPES.REPLACE_VARIABLE);
  }

  static insertVariable(editorState, variable) {


    // return ContentUtils.insertText(editorState, variable.name + variable.value)



    const selectionState = editorState.getSelection();
    let contentState = editorState.getCurrentContent();
    const key = Entity.create(ENTITY_VARIABLE, 'IMMUTABLE', { name: variable.name });
    if (variable.type === 'html' || variable.type === 'map') {
      return AtomicBlockUtils.insertAtomicBlock(
        editorState,
        key,
        ' '
      );
    } else {
      return AtomicBlockUtils.insertAtomicBlock(
        editorState,
        key,
        variable.name
      );




      contentState = Modifier.replaceText(
        contentState,
        selectionState,
        variable.name,
        null,
        key,
      );
      return EditorState.push(editorState, contentState, VARIABLE_CHANGE_TYPES.INSERT_VARRIABLE);
    }
  }
  onInsertVariable = variable => () => {
    const { value, variables } = this.props;
    const newEditorState = VariableTextEditor.insertVariable(value, variable);
    this.props.onChange(newEditorState, variables);
  }
  innerOnChange(editorState, forceReplaceVariableValue) {
    const { replaceVariableValue, replaceMode, variables } = this.props;
    // 只有当前需要替换变量,且新插入变量时才需要做变量替换操作,毕竟变量替换操作会消耗cpu资源
    if (replaceVariableValue
      && variables
      && (
        forceReplaceVariableValue
        || editorState.getLastChangeType() === VARIABLE_CHANGE_TYPES.INSERT_VARRIABLE
      )
    ) {
      this.props.onChange(VariableTextEditor.replaceVariables(editorState, variables, { replaceMode }), variables);
    } else {
      this.props.onChange(editorState, variables);
    }
  }

  componentDidMount() {
    this.innerOnChange(this.props.value, true);
  }

  componentDidUpdate(prevProps) {
    // Replace variables with their values if `variables` is changed.
    if (!deepEqual(this.props.variables, prevProps.variables, { strict: true })) {
      this.innerOnChange(this.props.value, true);
    }
  }
  render(){
    const { variables, readOnly, ...rest } = this.props;
    return <>
      {
        variables.map((variable, idx) => <button
          className={`variable-text-editor__variables__item${readOnly ? '--disable' : ''}`}
          key={`variable-btn-${idx}`}
          disabled={readOnly}
          onClick={this.onInsertVariable(variable)}
        >
          {variable.name}
        </button>)
      }
      <BraftEditor
        {...rest}
        blockRendererFn={customBlockRenderer({ editable: !readOnly })}
        customStyleMap={styleMap}
      />
    </>
  }
}

export default VariableTextEditor
