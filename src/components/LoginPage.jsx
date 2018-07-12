import React from 'react';
import Form from './Form.jsx';
import axios from 'axios';

const LoginPage = props => (
  <div className="login-page">
    <h1 className="login-title">Welcome to Scrum Board!</h1>
    <Form formRoute={'/login'} history={props.history} />
    <p>
      Need an account? Sign up{' '}
      <a href="#" onClick={() => props.history.push('/signup')}>
        here
      </a>
    </p>
  </div>
);

export default LoginPage;
