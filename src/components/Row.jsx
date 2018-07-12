import React from 'react';
import RowHeader from './RowHeader.jsx';
import RowBody from './RowBody.jsx';

const Row = props => {
  return (
    <div className='row' >
      <div>
      <RowHeader columnHeader={props.columnHeader} />
      <RowBody isStory={props.isStory} tasks={props.tasks} boardId={props.boardId} />
    </div>
    </div>
  );
};

export default Row;
