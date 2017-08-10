import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Lessons from './lesson';
import Login from './login-page';
import QuestionPage from './question-page';
import {connect} from 'react-redux';

class App extends Component {
  
  render() {
    let loginButton;

    if (!this.props.accessToken) {
      loginButton = (
        <div>
          <a href={'/api/auth/google'}><button className="login">Sign In</button></a>
        </div>
      )
    } else {
      loginButton = (
        <div>
          <a href={'/api/auth/logout'}><button className="login">Sign Out</button></a>
        </div>
      )
    }

    return (
      <Router>
        <div>
          <header>
            <div className="headerContent">
              <div className="logo">
                <span className="logoText hindi">सीखना</span>
                <span className="logoText latin">seekhana</span>
              </div>
              {loginButton}
            </div>
          </header> 
          <div className="parent container">
            <Route exact path='/' component={Login}/>
            <Route exact path='/lessons' component={Lessons}/>
            <Route exact path='/lesson/:lessonId' component={QuestionPage}/>
          </div>
          <footer className="container">designed and developed by william martin and paton vinal | 2017 | we don't reserve any rights, so steal if you want to, i guess.</footer>
        </div>
      </Router>
    );
  }
}

const mapStatetoProps = state => ({
  accessToken: state.accessToken
});

export default connect(mapStatetoProps)(App);


