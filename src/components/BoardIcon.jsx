import React from 'react';
import Row from './Row.jsx';

import { connect } from 'react-redux';

import { deleteBoard } from '../actions/boards.js';

const BoardIcon = props => {
  let clickedButton = false;
  return (
    <div
      className="taskbox"
      style={{
        height: '200px',
        width: '200px',
        padding: '4px 4px',
      }}
      onClick={() => {
        if (!clickedButton) props.history.push(`/test/${props.boardId}/${props.name}`);
      }}
    >
      <div>
      
        <p className="project_name">{props.name}</p>
          <button
            className="button_clear--small"
            onClick={() => {
              clickedButton = true;
              props.deleteBoard(props.boardId);
            }}
          >
            X
          </button>
      
       
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteBoard: boardId => {
    dispatch(deleteBoard(boardId));
  },
});

export default connect(
  undefined,
  mapDispatchToProps
)(BoardIcon);
