import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Lessons from './lesson';
import Login from './login-page';
import QuestionPage from './question-page';

export default class App extends Component {
  
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Login}/>
          <Route exact path='/lessons' component={Lessons}/>
          <Route exact path='/lesson/:lessonId' compononent={QuestionPage}/>
        </div>
      </Router>
    );
  }
}


