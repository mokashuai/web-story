/**
 * Customized Draft decorators.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Entity,
} from 'draft-js';
import urlSchemify from 'url-schemify';

import { ENTITY_LINK, ENTITY_VARIABLE, ENTITY_MENTION } from './entities';

// NOTE: regular expression must have `g` flag.
// Url regx: protocol://domain:port
const URL_REGX = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/g;

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr;
  let start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

/**
 * Find link entity and call `callback` function.
 * Link entity comes from:
 * 1. User insert link by TextEditor.
 * 2. User paste HTML fragment with <a>
 */
function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => character.getEntity() && Entity.get(character.getEntity()).type === ENTITY_LINK,
    callback
  );
}

/**
 * Find link string and call `callback` function.
 * Link string is the string that looks like http://www.mokahr.com
 */
function findLinkText(contentBlock, callback) {
  findWithRegex(URL_REGX, contentBlock, callback);
}

const LinkTextComponent = (props) => {
  const { decoratedText } = props;
  const href = urlSchemify(decoratedText);
  return (
    <a href={href} target="_blank" style={{ color: '#1E95CF', textDecoration: 'underline' }}>
      {props.children}
    </a>
  );
};

LinkTextComponent.propTypes = {
  decoratedText: PropTypes.string,
};

/**
 * Link decorated element.
 *
 * Case #1: LINK entity with url will be decorated with <a href={url}>{plainText}</a>
 * Case #2: LINK entity without url will be decorated with <a href={plainText}>{plainText}</a>
 */
const LinkComponent = (props) => {
  const { decoratedText, entityKey } = props;
  const { url } = Entity.get(entityKey).getData();

  // Remove entity meta data `url` if `url` equals `plainText`
  // This generally happens when user paste a link text from other place. We have to make
  // sure that the url and its display name is the same.
  if (url === decoratedText) {
    Entity.replaceData(props.entityKey, {});
  }

  const href = urlSchemify(url || decoratedText);
  return (
    <a href={href} target="_blank" style={{ color: '#1E95CF', textDecoration: 'underline' }}>
      {props.children}
    </a>
  );
};

LinkComponent.propTypes = {
  decoratedText: PropTypes.string,
  entityKey: PropTypes.string,
};

function findVariableEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => character.getEntity() && Entity.get(character.getEntity()).type === ENTITY_VARIABLE,
    callback
  );
}

function findMentionEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => character.getEntity() && Entity.get(character.getEntity()).type === ENTITY_MENTION,
    callback,
  );
}

const MentionComponent = (props) => {
  return (
    <span
      {...props}
      className="text-editor__entity--mention"
    >
      @{props.children}
    </span>
  );
};

const VariableComponent = (props) => {
  const { entityKey } = props;
  const entity = Entity.get(entityKey);
  const { error, name } = entity.getData();
  return (
    <span
      className={`variable-text-editor__entity${ error ? '--error' : '' }`}
    >
      {error ? `${name}未知` : props.children}
    </span>
  );
};

VariableComponent.propTypes = {
  entityKey: PropTypes.string,
};

export {
  findLinkText,
  findLinkEntities,
  LinkComponent,
  LinkTextComponent,
  findVariableEntities,
  VariableComponent,
  findMentionEntities,
  MentionComponent,
};
