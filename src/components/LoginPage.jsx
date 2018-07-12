import React from 'react';
import Form from './Form.jsx';
import axios from 'axios';

const LoginPage = props => (
  <div className="login-page">
  <img src="./logo.png" />
  <br />
    <div className="login-container">
    <h1 className="login-title">Welcome to Scrum Board!</h1>
    <Form formRoute={'/login'} history={props.history} />
    <br />
    <p>
      Need an account? Sign up{' '}
      <a href="#" onClick={() => props.history.push('/signup')}>
        here
      </a>
    </p>
    </div>
    <br />
    <p className="credits">Remixed by Deluge / in collaboration with the Goblin Sharks</p>
  </div>
);

export default LoginPage;
