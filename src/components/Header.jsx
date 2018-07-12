import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { logoutUser } from '../actions/users.js';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log('from header', this.props);
    return (
      <div className="header">
        <div className="logo"> 
        <img  className="small-logo" src="http://localhost:3000/logo.png"/>

        </div>
        <div className="header-info">
          <div />
          <div
            onClick={() => {
              axios
                .post('http://localhost:3000/logout', { _id: this.props.match.params.id })
                .then(res => {
                  this.props.logoutUser(this.props.match.params.id);
                  this.props.history.push('/');
                });
            }}
          >
            <div>
              {this.props.user ? this.props.user.name : 'Human'}
            <div className="simple_box">
              <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }, ownProps) => {
  return {
    // not sure what this is for at the moment, but its causing errors, so commenting out for now
    // user: users.filter(user => user._id === ownProps.match.params.id)[0],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: userId => dispatch(logoutUser(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
