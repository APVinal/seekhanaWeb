import React, {Component} from 'react';
import fetchLogin from '../actions/actions';
import {connect} from 'react-redux';

 class Login extends Component {

   render() {
     return (
      <div className="container landing">
        <div className="bg"><img className="bg-pattern" src="./images/bg-pattern.svg"/></div>
        <main className="container">
          <div className="container halfScreen"><img className="mandala"src="./images/3100_Mandala.svg"/></div> 
          <div className="container halfScreen column">
            <div className="namaste container"><span className="helloText"></span><div className="cursor"></div></div>
            <div className="infoText">
              <p>Welcome to seekhana (सीखना), we're glad you're here.</p>
              <p>Hindi is the official language of India, and is spoken natively by nearly 200 million people. Despite being the 4th most spoken language on the planet, the free learning tools avaliable for a westerner to pick up basic Hindi are few and far between, so we made our own.</p>
            </div>
            <a href={'/api/auth/google'}><button className="login">Let's get started!</button></a>
            <span className="google">authentication provided by google</span>
          </div>
        </main>
      </div>    
     );
  }
}

export default connect()(Login);
