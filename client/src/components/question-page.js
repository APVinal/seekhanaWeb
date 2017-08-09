import React, {Component} from 'react';
import {connect} from 'react-redux';
import LinkedList from '../linkedList';

class QuestionPage extends Component {

  componentWillMount(){
    let newLesson = new LinkedList();
  
    let i = 0;

    this.findLesson(this.props.lesson, this.props.lessonId).questions.forEach(question => {
      newLesson.insert(i++, question);
    });

    this.lesson = newLesson;
  }

  findLesson(arr, id) {
    for(let i = 0; i < arr.length; i++) {
      if (arr[i]._id === id) {
        return arr[i];
      }
    }
  }

  render() {
    console.log(this.lesson);
      return (
        <div>
          <p>this is where the quiz goes</p>
        </div>
        );
    }
}

const mapStateToProps = state => ({
  lessonId: state.currentLesson,
  lesson: state.userLessons
})

export default connect(mapStateToProps)(QuestionPage);