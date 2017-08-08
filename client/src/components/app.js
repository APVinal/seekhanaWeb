import React, {Component} from 'react';
import * as Cookies from 'js-cookie';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Lessons from './lesson';
import Login from './login-page';

export default class App extends Component {

    //   componentDidMount() {
    //     // Job 4: Redux-ify all of the state and fetch calls to async actions.
    //     const accessToken = Cookies.get('accessToken');
    //     if (accessToken) {
    //         fetch('/api/me', {
    //             headers: {
    //                 'Authorization': `Bearer ${accessToken}`
    //             }
    //         }).then(res => {
    //             if (!res.ok) {
    //                 if (res.status === 401) {
    //                     // Unauthorized, clear the cookie and go to
    //                     // the login page
    //                     Cookies.remove('accessToken');
    //                     return;
    //                 }
    //                 throw new Error(res.statusText);
    //             }
    //             return res.json();
    //         }).then(currentUser => {
    //             // console.log(currentUser)
    //             return this.setState({currentUser})}
    //         );
    //     }
    // }

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Login}/>
          <Route exact path='/lessons' component={Lessons}/>
        </div>
      </Router>
    );
  }
}


