import React, {Component} from 'react';
import {connect} from 'react-redux';

 class Login extends Component {

   render() {
     return (
      <div className="container landing">
        <div className="bg"><img className="bg-pattern" src="./images/bg-pattern.svg"/></div>
         <div className="container halfScreen"><img className="mandala"src="./images/3100_Mandala.svg"/></div> 
        <div>
          <div className="namaste container halfScreen"><span className="helloText">Hello</span><div className="cursor"></div></div>
          <a href={'/api/auth/google'}><button>Login with Google</button></a>
        </div>
      </div>    
     );
  }
}

export default connect()(Login);
