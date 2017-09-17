import React, {Component} from 'react';
import {connect} from 'react-redux';

import './login-page.css';

 class Login extends Component {

   render() {
     return (
        <main className="login grid">
          <div className="wowImg container"><img className="mandala"src="./images/3100_Mandala.svg"/></div> 
          <div className="landingCopy container column">
            <div className="namaste container"><span className="helloText"></span><div className="cursor"></div></div>
            <div className="infoText">
              <p>Hindi is the official language of India, and is spoken natively by nearly 200 million people. Despite being the 4th most spoken language on the planet, the free learning tools avaliable for a westerner to pick up basic Hindi are few and far between, so we made our own.</p>
            </div>
            <a href={'/api/auth/google'}><button className="login">Let's get started!</button></a>
            <span className="google">authentication provided by google</span>
          </div>
        </main> 
     );
  }
}

export default connect()(Login);
