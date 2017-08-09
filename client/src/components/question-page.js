import React, {Component} from 'react';
import {connect} from 'react-redux';

class QuestionPage extends Component {

  componentWillMount(){
    //dispatch(makeLL())
  }

  render() {
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