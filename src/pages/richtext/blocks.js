/**
 * Customized Draft blocks.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { EditorBlock, Entity } from 'draft-js';

export const BLOCK_PARAGRAGH_CENTER = 'paragraph-center';
export const BLOCK_PARAGRAGH_RIGHT = 'paragraph-right';

const ParagraphCenterBlock = (props) => {
  return <div style={{ textAlign: 'center' }}><EditorBlock {...props}/></div>;
};

const ParagraphRightBlock = (props) => {
  return <div style={{ textAlign: 'right' }}><EditorBlock {...props}/></div>;
};

const AtomicBlock = (props) => {
  const entity = Entity.get(props.block.getEntityAt(0));
  const { name = '', type, html, src, uri, ...attrs } = entity.getData();
  switch (type) {
    case 'html': {
      const data = html && html !== 'undefined' ? html : ' ';
      return (
        <div className="public-html-block" style={{ whiteSpace: 'normal' }}>
          <div dangerouslySetInnerHTML={{ __html: data }} />
        </div>
      );
    }
    case 'image': {
      if (src) {
        return (
          <img className="public-image-block" src={src} {...props} alt='' />
        );
      }
      return <div className="public-image-block-uploading">图片上传中...</div>;
    }
    case 'map': {
      if (src) {
        return (
          <a href={uri || src} target="_blank" rel="noopener noreferrer" className="public-map-block">
            <img src={src} style={{ width: '100%' }} alt='' />
          </a>
        );
      }
      return <span />;
    }
    default: {
      const { link, link_target, url, width } = attrs;
      const Img = <img src={url} alt='' style={{width, maxWidth: '100%'}} />;
      if(link){
        return <a href={link} target={link_target}>
        { url ? Img : name }
        </a>
      }
      if(url){
        return Img;
      }
      return (
        <div className="public-variable-block">
          {name}
        </div>
      );
    }
  }
};
// create a decorator to enable component with resizable capabitily
const createResizeableBlockDecorator = (editable) => {
  return (Component) => class ResizeableBlock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hoverPosition: {},
        clicked: false,
        width: null,
        height: null,
      };
      this.setEntityData = (data) => {this.props.blockProps.setResizeData(data);};
      this.mouseLeave = this.mouseLeave.bind(this);
      this.mouseMove = this.mouseMove.bind(this);
      this.mouseDown = this.mouseDown.bind(this);
    }
    mouseLeave() {
      if (!this.state.clicked) {
        this.setState({ hoverPosition: {} });
      }
    }
    mouseMove(e) {
      const { hoverPosition } = this.state;
      const tolerance = 5;
      const isAdjacent = (a, b) => Math.abs(a - b) <= tolerance;
      const panel = ReactDOM.findDOMNode(this);
      const rect = panel.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      const isTop = isAdjacent(y, rect.top);
      const isBottom = isAdjacent(y, rect.bottom);
      const isLeft = isAdjacent(x, rect.left);
      const isRight = isAdjacent(x, rect.right);
      const canResize = isTop || isBottom || isLeft || isRight;
      const newHoverPosition = { isTop, isBottom, isLeft, isRight, canResize };
      const hasNewHoverPosition = Object.keys(newHoverPosition).filter(
        (key) => newHoverPosition[key] !== hoverPosition[key]
      );
      if (hasNewHoverPosition.length) {
        this.setState({ hoverPosition: newHoverPosition });
      }
    }
    mouseDown(e) {
      if (!this.state.hoverPosition.canResize) {
        return;
      }
      const self = this;
      const { hoverPosition } = this.state;
      const { isTop, isLeft, isRight, isBottom } = hoverPosition;
      const panel = ReactDOM.findDOMNode(this);
      const startX = e.clientX;
      const startY = e.clientY;
      const rect = panel.getBoundingClientRect();
      const startWidth = rect.width;
      const startHeight = rect.height;
      const doDrag = (dragEvent) => {
        const distanceH = isLeft ? startX - dragEvent.clientX : dragEvent.clientX - startX;
        const distanceV = isTop ? startY - dragEvent.clientY : dragEvent.clientY - startY;
        const width = Math.max(startWidth + distanceH, 10);
        const height = Math.max(startHeight + distanceV, 10);
        dragEvent.preventDefault();
        let newState;
        if (isTop || isBottom) {
          newState = {
            height: height,
            width: 'auto',
          };
        } else if (isLeft || isRight) {
          newState = {
            width: width,
            height: 'auto',
          };
        }
        self.setState(newState);
      };

      const stopDrag = () => {
        document.removeEventListener('mousemove', doDrag, false);
        document.removeEventListener('mouseup', stopDrag, false);
        const { width, height } = this.state;
        if (width && height) {
          this.setEntityData({ width, height });
        }
        self.setState({ clicked: false });
      };

      document.addEventListener('mousemove', doDrag, false);
      document.addEventListener('mouseup', stopDrag, false);
      this.setState({ clicked: true });
    }

    render() {
      const { blockProps, style } = this.props;
      const { width, height, hoverPosition } = this.state;
      const { isTop, isLeft, isRight, isBottom } = hoverPosition;
      const styles = { verticalAlign: 'top', minWidth: '10', minHeight: '10', ...style };
      // 拖动时暂时先用存储在state中的宽高来渲染
      styles.width = width || blockProps.resizeData.width;
      styles.height = height || blockProps.resizeData.height;
      // handle cursor
      if (!editable) {
        styles.cursor = 'default';
      } else if (isRight || isLeft) {
        styles.cursor = 'ew-resize';
      } else if (isBottom || isTop) {
        styles.cursor = 'ns-resize';
      } else {
        styles.cursor = 'default';
      }
      const resizeActions = editable ? { onMouseDown: this.mouseDown, onMouseMove: this.mouseMove, onMouseLeave: this.mouseLeave } : {};
      return (
        <div
        className={editable ? 'public-DraftStyleCustom-resizeableblock' : ''}
        style = {{ position: 'relative', display: 'inline-block', lineHeight: '1' }}
        {...resizeActions}
        >
          <Component
            {...this.props}
            style={styles}
          />
          <span className={editable ? 'public-DraftStyleCustom-resizeableblock__dot top' : ''} />
          <span className={editable ? 'public-DraftStyleCustom-resizeableblock__dot left' : ''} />
          <span className={editable ? 'public-DraftStyleCustom-resizeableblock__dot bottom' : ''} />
          <span className={editable ? 'public-DraftStyleCustom-resizeableblock__dot right' : ''} />
        </div>
      );
    }
  };
};

const createSetResizeData = (contentBlock) => (data) => {
  const entityKey = contentBlock.getEntityAt(0);
  if (entityKey) {
    Entity.mergeData(entityKey, { size: data });
  }
};

export function customBlockRenderer({ editable }) {
  const decorator = createResizeableBlockDecorator(editable);
  return (contentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
    case BLOCK_PARAGRAGH_CENTER:
      return {
        component: ParagraphCenterBlock,
        editable,
      };
    case BLOCK_PARAGRAGH_RIGHT:
      return {
        component: ParagraphRightBlock,
        editable,
      };
    case 'atomic': {
      let entity = null;
      // 对于type是atomic的block，Draft的处理还是不够robust，经常会抛exception，然后导致页面卡死
      // 这里如果抛异常，就悄悄滴忽略之
      try {
        entity = Entity.get(contentBlock.getEntityAt(0));
      } catch (err) {
        // do nothing.
      }
      if (!entity) {
        return null;
      }
      const entityData = entity.getData() || {};
      if (entityData.type === 'image') {
        return {
          //图片可缩放，需要decorate AtomicBlock以支持拖动缩放
          component: decorator(AtomicBlock),
          editable: false,
          props: {
            resizeData: entityData.size || {},
            setResizeData: createSetResizeData(contentBlock),
          },
        };
      }
      return {
        component: AtomicBlock,
        editable: false,
      };
    }
    default:
      return null;
    }
  };
}
