import React, { useRef} from "react";
import Draft from "draft-js";
import "./rich.scss";

import createUndoPlugin from '@draft-js-plugins/undo';
import Editor from '@draft-js-plugins/editor';

import buttonStyles from './buttonStyles.module.css';

import {BsTypeUnderline, BsTypeItalic, BsTypeBold, BsTypeH1, BsTypeH2, BsTypeH3} from "react-icons/bs"
import {MdFormatListBulleted, MdUndo, MdRedo} from "react-icons/md"
const { RichUtils, getDefaultKeyBinding } = Draft;

const theme = {
    undo: buttonStyles.button,
    redo: buttonStyles.button,
  };

const undoPlugin = createUndoPlugin({
    undoContent: <MdUndo/>,
    redoContent: <MdRedo/>,
    theme
  });

const { UndoButton, RedoButton } = undoPlugin;
const plugins = [undoPlugin];

export function Content({editorState, setEditorState}){
    const editor = useRef(null);
    // console.log("COntent state is: ", editorState)
    const focus = () => {
        editor.current.focus()
    };
    const onChange = editorState =>{ 
        console.log("val", editorState.getCurrentContent().getPlainText(''));    
        setEditorState(editorState)
    };
    function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  }
  function mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 ) {
      const newEditorState = RichUtils.onTab(
        e,
        editorState,
        4 
      );
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }
  function toggleBlockType(blockType) {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  }
  function toggleInlineStyle(inlineStyle) {
    onChange(
      RichUtils.toggleInlineStyle(editorState, inlineStyle)
    );
  }
    return (
        
      <div className="RichEditor-root">
        <div className="rowify">
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
        <div className="undo-redo">
            <UndoButton/>
            <RedoButton/>
        </div>
        </div>
        <div className={"RichEditor-editor"}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={mapKeyToEditorCommand}
            onChange={onChange}
            placeholder=""
            ref={editor}
            plugins={plugins}
            spellCheck={true}
          />
        </div>
      </div>
    );
}

const styleMap = {
  
};
function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}
function StyleButton(props){
    const onToggle = e => {
      e.preventDefault();
      props.onToggle(props.style);
    };
    let className = "RichEditor-styleButton";
    if (props.active) {
      className += " RichEditor-activeButton";
    }
    return (
      <span className={className} onMouseDown={onToggle}>
        {props.label}
      </span>
    );
}

const BLOCK_TYPES = [
  { label: <BsTypeH1/>, style: "header-one" },
  { label: <BsTypeH2/>, style: "header-two" },
  { label: <BsTypeH3/>, style: "header-three" },
  { label: <MdFormatListBulleted/>, style: "unordered-list-item" },
];
const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.style}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
var INLINE_STYLES = [
  { label: <BsTypeBold/>, style: "BOLD" },
  { label: <BsTypeItalic/>, style: "ITALIC" },
  { label: <BsTypeUnderline/>, style: "UNDERLINE" },
];
const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.style}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
