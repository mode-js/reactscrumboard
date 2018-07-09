import React from 'react';
import { connect } from 'react-redux';

import { updateTask } from '../src/actions/tasks.js';

const Task = props => {
  const order = ['todo', 'inProgress', 'testing', 'done'];
  return (
    <div
      style={{
        border: '1px solid black',
        margin: '2px 2px',
        padding: '4px 4px',

      }}
    >
      <p>{props.name}</p>
      <span
        onClick={() => {
          const { status } = props.task;
          const newStatus = order[order.indexOf(status) === 0 ? 0 : order.indexOf(status) - 1];
          props.updateTask(props.task, { status: newStatus });
        }}
      >
        move left
      </span>
      <span
        onClick={() => {
          const { status } = props.task;
          const newStatus =
            order[
              order.indexOf(status) === order.length - 1
                ? order.length - 1
                : order.indexOf(status) + 1
            ];
          props.updateTask(props.task, { status: newStatus });
        }}
      >
        move right
      </span>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateTask: (task, updates) => dispatch(updateTask(task, updates)),
});

export default connect(
  undefined,
  mapDispatchToProps
)(Task);
