import React from 'react';
import { connect } from 'react-redux';

import { updateStory, deleteStory } from '../actions/stories.js';
// style={{
//   border: '1px solid gray',
//   padding: '4px 4px',
//   marginTop: '2px',
//   marginBottom: '2px',
//   marginRight: '2px',
//   marginLeft: '2px',
//   height: '100px',
//   width: '90%',
//   boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',

// }}
const Task = props => {
  const order = ['todo', 'inProgress', 'testing', 'done'];
  return (
    <div   className="taskbox stories">
         <button className="delete button_clear--small"
        onClick={() => props.deleteTask(props.task._id)}
      >
        X
        </button>
        <p>{props.name} </p>

        <div className="task-status">
          <span  onClick={() => {
          let { done } = props.task;
          console.log('​done', done);
          props.updateStory(props.task, { done: !done });
        }}
        style={{
             backgroundColor: props.task.done ? 'green' : 'red',
        }}> Status </span>
        </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateStory: (task, updates) => dispatch(updateStory(task, updates)),
  deleteTask: taskId => dispatch(deleteStory(taskId)),
});

export default connect(
  undefined,
  mapDispatchToProps
)(Task);
