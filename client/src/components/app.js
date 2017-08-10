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
           <header><div className="headerContent"><div className="logo"><span className="logoText hindi">सीखना</span><span className="logoText latin">seekhana</span></div></div></header> 
          <div className="parent container">
            <Route exact path='/' component={Login}/>
            <Route exact path='/lessons' component={Lessons}/>
          </div>
          <footer className="container">designed and developed by william martin and paton vinal | 2017 | we don't reserve any rights, so steal if you want to, i guess.</footer>
        </div>
      </Router>
    );
  }
}


