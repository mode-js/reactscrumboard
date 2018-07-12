import React from 'react';
import BoardIcon from './BoardIcon.jsx';

import FlipMove from 'react-flip-move';

class BoardList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: '',
    };
  }
  handleChange(e) {
    const { value } = e.target;
    this.setState({ value });
  }
  render() {
    const Boards = this.props.boards.map(board => (
      <BoardIcon
        history={this.props.history}
        userID={this.props.userID}
        boardId={board._id}
        name={board.name}
        key={board._id}
      />
    ));

    return (
      <div >
        <div className="board_list_padding">
          <h4>Welcome To Your Board List!</h4>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Add a new project..."
              onChange={this.handleChange}
              value={this.state.value}
            />
            <button className="delete"
              onClick={e => {
                e.preventDefault();
                this.props.addBoard(this.state.value, this.props.userID);
              }}
            >
              +
          </button>
          </form>
          <FlipMove duration={400} easing="ease-in-out">
          <div className='board-list'>

            {Boards}
            </div>
          </FlipMove>
        </div>
      </div>
    );
  }
}

export default BoardList;
