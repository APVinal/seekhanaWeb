import React, {Component} from 'react';
import fetchLogin from '../actions/actions';
import {connect} from 'react-redux';

 class Login extends Component {

   render() {
     return (
      <div className="container">
        <div><img className="mandala"src="./images/3100_Mandala.svg"/></div>
        <div>
          <div className="namaste container"><span className="helloText">Hello</span><div className="cursor"></div></div>
          <a href={'/api/auth/google'}><button>Login with Google</button></a>
        </div>
      </div>    
     );
  }
}

export default connect()(Login);
