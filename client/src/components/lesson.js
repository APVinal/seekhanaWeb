import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';
import { fetchUser, fetchLessons, addLesson, updateUserLessons } from '../actions/actions'

class Lessons extends Component {

  componentDidMount() {
    const accessToken = Cookies.get('accessToken');
    
    if (accessToken) {
      this.props.dispatch(fetchUser(accessToken));
      this.props.dispatch(fetchLessons(accessToken));
    }
  }

  checkTitle(arr, obj) {
    if (!arr[0]){
      return false;
    }else{
      for(let i = 0; i < arr.length; i++){
        if(arr[i].title === obj.title){
          return true;
        }
      }
    }

    return false;
  }

  addQuiz(accessToken, lesson, userId) {
      if(this.checkTitle(this.props.userLessons, lesson)){
        this.props.dispatch(addLesson(lesson._id));
      }else{
        this.props.dispatch(updateUserLessons(accessToken, userId, lesson));
      }
     
  }
  

  render(){
    if(!this.props.lessons){
      return <p>Error loading lessons</p>;
    }
    const lessons = this.props.lessons.map((lesson, index) => (
      <li key={index}>
        <a href={`/lesson/${lesson._id}`}><button onClick={()=>this.addQuiz(this.props.accessToken, lesson, this.props.userId)}>{lesson.title}</button></a>
      </li>
    ));

    return (
      <section>
      <div>
        <a href={'/api/auth/logout'}><button>Log Out</button></a>
      </div>
      <div>
        <p> Beginner lessons </p>
        <ul>
          {lessons}
        </ul>
      </div>
      </section>
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