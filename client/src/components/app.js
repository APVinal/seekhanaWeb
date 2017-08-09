import React, {Component} from 'react';
import * as Cookies from 'js-cookie';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Lessons from './lesson';
import Login from './login-page';
import fetchUsers from '../actions/actions';

export default class App extends Component {
  
  render() {
    return (
      <Router>
        <div>
           <header><div className="logo"><span className="logoText hindi">सीखना</span><span className="logoText latin">seekhana</span></div></header> 
          <div className="parent container">
            <Route exact path='/' component={Login}/>
            <Route exact path='/lessons' component={Lessons}/>
          </div>
        </div>
      </Router>
    );
  }
}


