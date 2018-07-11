import React from 'react';
import Row from './Row.jsx';

import { connect } from 'react-redux';

import { deleteBoard } from '../actions/boards.js';

const BoardIcon = props => {
  let clickedButton = false;
  return (
    <div
      className="board-icon"
      style={{
        border: '2.5px solid black',
        height: '20%',
        width: '50%',
        padding: '4px 4px',
      }}
      onClick={() => {
        if (!clickedButton) props.history.push(`/test/${props.boardId}/${props.name}`);
      }}
    >
      <div>
       
          <h2>Project Names</h2>
          <button
            className="button_clear--small"
            onClick={() => {
              clickedButton = true;
              props.deleteBoard(props.boardId);
            }}
          >
            X
          </button>
      
        <p>{props.name}</p>
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
