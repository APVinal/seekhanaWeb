import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import * as Cookies from 'js-cookie';
import Lessons from './lesson';
import Login from './login-page';
import QuestionPage from './question-page';
import {connect} from 'react-redux';
import { fetchUser, fetchLessons, addLesson, updateUserLessons } from '../actions/actions';

import './app.css';

class App extends Component {
  componentDidMount(){
    const accessToken = Cookies.get('accessToken');
    if(accessToken){
      this.props.dispatch(fetchUser(accessToken));
    }
  }
  
  render() {
    let loginButton;
    let redirect;

    if (!this.props.accessToken) {
      loginButton = (
        <div className="login">
          <a href={'/api/auth/google'}><button className="login headerLogin">Sign In</button></a>
        </div>
      );
      redirect = (
        <Login />
      );
    } else {
      console.log('logged in')
      loginButton = (
        <div className="login">
          <a href={'/api/auth/logout'}><button className="login headerLogin">Sign Out</button></a>
        </div>
      );
      redirect = (
        <Redirect to={'/lessons'} />
      );
    }

    return (
      <Router>
        <div className="super grid">
          <div className="bg"><img className="bg-pattern" src="./images/bg-pattern.svg"/></div>
          <header>
            <div className="headerContent">
              <div className="logo">
                <span className="logoText hindi">सीखना</span>
                <span className="logoText latin">seekhana</span>
              </div>
              {loginButton}
            </div>
          </header>

 
            <Route exact path='/lessons' component={Lessons}/>
            <Route exact path='/lessons/:lessonId' component={QuestionPage}/>
            <Route exact path='/' render={() => redirect} />

          
          <footer className="container">designed and developed by william martin and paton vinal | 2017 | we don't reserve any rights, so steal if you want to, i guess.</footer>
        </div>
      </Router>
    );
  }
}

const mapStatetoProps = state => ({
  accessToken: state.accessToken,
  googleId: state.googleId
});

export default connect(mapStatetoProps)(App);


