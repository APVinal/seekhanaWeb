import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';
import { fetchUser, fetchLessons } from '../actions/actions'

class Lessons extends Component {
  componentDidMount() {
    // Job 4: Redux-ify all of the state and fetch calls to async actions.
    const accessToken = Cookies.get('accessToken');
    
    if (accessToken) {
      this.props.dispatch(fetchUser(accessToken));
      this.props.dispatch(fetchLessons(accessToken));
    }
  }


  render(){

    return (
      <section>
      <div>
        <a href={'/api/auth/logout'}><button>Log Out</button></a>
      </div>
      <div>
        Lessons will be here
      </div>
      </section>
    );
  }
}

const mapStatetoProps = state => ({

});

export default connect(mapStatetoProps)(Lessons);