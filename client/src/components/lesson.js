import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';
import { fetchUser, fetchLessons } from '../actions/actions'
import { Link } from 'react-router-dom';

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
    if(!this.props.lessons){
      return <p>Error loading lessons</p>;
    }

    // const lessons = this.props.lessons.map((lesson, index) => (
    //   <li key={index}>
    //     <a href={`/api/users/:userId/lessons/`}>{lesson.title}</a>
    //   </li>
    // ));

    return (
      <section>
      <div>
        <a href={'/api/auth/logout'}><button>Log Out</button></a>
      </div>
      <div>
        <ul>
          {/*{lessons}*/}
        </ul>
      </div>
      </section>
    );
  }
}

const mapStatetoProps = state => ({
  // lessons: state.lessons,
  // userId: state.googleId
});

export default connect(mapStatetoProps)(Lessons);