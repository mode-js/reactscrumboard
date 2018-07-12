import React from 'react';
import Row from './Row.jsx';

import { connect } from 'react-redux';

import { deleteBoard } from '../actions/boards.js';

const BoardIcon = props => {
  let clickedButton = false;
  return (
    <div  className="taskbox projects" onClick={() => {
      if (!clickedButton) props.history.push(`/test/${props.boardId}/${props.name}`);
    }}>
      <button
        className="delete button_clear--small"
onClick={() => {
            clickedButton = true;
            props.deleteBoard(props.boardId);
          }}        >
        X
      </button>

      <p>{props.name} </p>

      <div className="task-status">
        <span>Owner</span>
      
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
