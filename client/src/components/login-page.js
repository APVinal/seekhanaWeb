import React, {Component} from 'react';
import fetchLogin from '../actions/actions';
import {connect} from 'react-redux';

 class Login extends Component {
   render() {
     return (
      <div>
        <a href={'/api/auth/google'}><button>Login with Google</button></a>
      </div>

      // <div>
      //   <a href={'/api/auth/logout'}><button>Log Out</button></a>
      // </div>
      
     );
  }
}

export default connect()(Login);
