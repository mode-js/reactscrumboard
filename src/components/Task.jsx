import React from 'react';
import { connect } from 'react-redux';

import { updateTask, deleteTask } from '../actions/tasks.js';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: ['todo', 'inProgress', 'testing', 'done'],
    };
  }

  render() {
    return (
      <div className="taskbox tasks">
        <button
          className="delete button_clear--small"
          onClick={() => this.props.deleteTask(this.props.task._id)}
        >
          X
        </button>
        <p>{this.props.name} </p>

        <div className="task-status">
          <span
            onClick={() => {
              const { status } = this.props.task;
              const newStatus = this.state.order[
                this.state.order.indexOf(status) === 0 ? 0 : this.state.order.indexOf(status) - 1
              ];
              this.props.updateTask(this.props.task, { status: newStatus });
            }}
          >
            ←
          </span>
          <span
            onClick={() => {
              const { status } = this.props.task;
              const newStatus = this.state.order[
                this.state.order.indexOf(status) === this.state.order.length - 1
                  ? this.state.order.length - 1
                  : this.state.order.indexOf(status) + 1
              ];
              this.props.updateTask(this.props.task, { status: newStatus });
            }}
          >
            →
          </span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateTask: (task, updates) => dispatch(updateTask(task, updates)),
  deleteTask: taskId => dispatch(deleteTask(taskId)),
});

export default connect(
  undefined,
  mapDispatchToProps
)(Task);
