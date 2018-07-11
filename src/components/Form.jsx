import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Cookies } from 'react-cookie';

import { isLoggedIn } from '../actions/users.js';
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      password: '',
      username: '',
      formError: '',
    };
  }
  onSubmitHandler(e) {
    e.preventDefault();
    const url = `http://localhost:3000${this.props.formRoute}`;

    if ( '/signup' === this.props.formRoute) {
      if (this.state.password.trim() && this.state.username.trim()) {

        axios
          .post(url, {
            email: this.state.username.trim(),
            username: this.state.username.trim(),
            password: this.state.password.trim(),
          })
          .then(res => {
            if (res.data.error) {
              this.setState({ formError: res.data.error });
            } else {
              const newcookie = new Cookies();
              newcookie.set(
                'usertoken',
                res.data.token
              );
              this.setState({ username: '', password: '' });
              this.props.isLoggedIn(res.data._id);
              this.props.history.push(`/test/${res.data._id}`);
            }
          });
      } else {
        let errorMessage;
  
        if (!this.state.username.trim() && !this.state.password.trim()) {
          errorMessage = 'Username and password required';
        } else if (!this.state.username) {
          errorMessage = 'Username required';
        } else if (!this.state.password.trim()) {
          errorMessage = 'Password required';
        }
        this.setState({ formError: errorMessage });
      }
    }
    if ( '/login' === this.props.formRoute) {
      if (this.state.password.trim() && this.state.username.trim()) {
        axios
          .post(url, {
            username: this.state.username.trim(),
            password: this.state.password.trim(),
          })
          .then(res => {
            if (res.data.error) {
              this.setState({ formError: res.data.error });
            } else {
              const newcookie = new Cookies();
              newcookie.set(
                'usertoken',
                res.data.token
              );
              this.setState({ username: '', password: '' });
              this.props.isLoggedIn(res.data._id);
              this.props.history.push(`/test/${res.data._id}`);
            }
          });
      } else {
        let errorMessage;
  
        if (!this.state.username.trim() && !this.state.password.trim()) {
          errorMessage = 'Username and password required';
        } else if (!this.state.username) {
          errorMessage = 'Username required';
        } else if (!this.state.password.trim()) {
          errorMessage = 'Password required';
        }
        this.setState({ formError: errorMessage });
      }
    }

  }
  onValueChange(e) {
    e.preventDefault();
    e.target.placeholder === 'username'
      ? this.setState({ username: e.target.value })
      : this.setState({ password: e.target.value });
    if (this.state.username.trim() && this.state.password.trim()) {
      this.setState({ formError: '' });
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <input type="text" placeholder="username" onChange={this.onValueChange} />
          <input type="text" placeholder="password" onChange={this.onValueChange} />
          <button className="button" onClick={this.onSubmitHandler}>
            submit
          </button>
        </form>
        {this.state.formError && <p>{this.state.formError}</p>}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    isLoggedIn: id => {
      dispatch(isLoggedIn(id));
    },
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(Form);
