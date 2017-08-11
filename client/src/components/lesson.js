import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';
import { fetchUser, fetchLessons, addLesson, updateUserLessons } from '../actions/actions';
import {Link} from 'react-router-dom';

class Lessons extends Component {

  componentWillMount() {
    const accessToken = Cookies.get('accessToken');
    
    if (accessToken) {
      this.props.dispatch(fetchUser(accessToken));
      this.props.dispatch(fetchLessons(accessToken));
    }
  }

  checkTitle(arr, obj) {
    if (!arr[0]){
      return false;
    } else {
      for(let i = 0; i < arr.length; i++){
        if(arr[i].title === obj.title){
          return true;
        }
      }
    }
    return false;
  }

  addQuiz(accessToken, lesson, userId) {
    console.log('hit', this.props)
      if (this.checkTitle(this.props.userLessons, lesson)){
        this.props.dispatch(addLesson(lesson._id));
        this.props.history.push(`/lesson/${lesson._id}`);
      } else {
                console.log('history', this.props.history);
        this.props.dispatch(updateUserLessons(accessToken, userId, lesson));
        this.props.history.push(`/lesson/${lesson._id}`);
      }
     
  }
  

  render(){
    if (!this.props.lessons){
      return <p>Error loading lessons</p>;
    }
    const lessons = this.props.lessons.map((lesson, index) => (
      <li key={index}>
        <button className='lesson' onClick={()=>this.addQuiz(this.props.accessToken, lesson, this.props.userId)}>{lesson.title}</button>
      </li>
    ));

    return (
      <main>
        {/* <div>
          <a href={'/api/auth/logout'}><button>Log Out</button></a>
        </div> */}
        <div className="lessons container">
          <div className="lessons-1 container column">
            <div className="lessHeader"><h2> Beginner </h2></div>
            <ul>
              {lessons}
            </ul>
          </div>
          <div className="lessons-2 container column">
            <div className="lessHeader"><h2> Intermediate </h2></div>
            <div className="comingSoon"><h3>Coming Soon</h3></div>
          </div>
          <div className="lessons-3 container column">
            <div className="lessHeader"><h2> Advanced </h2></div>
            <div className="comingSoon"><h3>Coming Soon</h3></div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStatetoProps = state => ({
  lessons: state.lessons,
  userId: state.googleId,
  accessToken: state.accessToken,
  userLessons: state.userLessons
});

export default connect(mapStatetoProps)(Lessons);