import React from "react";
import {
  withRouter,
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import { connect } from "react-redux";

// for now it redirects to homepage
class PrivateRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (<Route {...rest} render={props => { 
      return this.props.isUserLoggedIn ? 
        (<Component {...props} />) : (<Redirect to={{pathname: "/"}}/>);
    }}/>);
  }
}

const mapStateToProps = store => {
  return {
    isUserLoggedIn: store.users.isUserLoggedIn
  };
};

export default connect(mapStateToProps)(PrivateRoute);
