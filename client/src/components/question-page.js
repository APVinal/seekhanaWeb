import React, {Component} from 'react';
import {connect} from 'react-redux';
import LinkedList from '../linkedList';
import { checkAnswer, nextQuestion } from '../actions/actions'; 

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

  checkLength(linkedList){
    return linkedList.length;
  }

  checkAnswers(obj, answer){
    let radioAnswer;
    let pronunAnswer;

    if(this.lesson)
    this.lesson.insert(this.checkLength(this.lesson), this.lesson.head.value);
    this.lesson.delete(0);
    this.props.dispatch(checkAnswer(answer));
    //takes current LL head and moves it ot the end
    //directs to feedback make stateful, if truth render that otherwise 
  }

  nextQuestion(){
    this.props.dispatch(nextQuestion());
  }

  render() {
    console.log(this.lesson);
    if(this.props.results){
      return (
        <section>
        <div>These are the results</div>
        <button onClick={() => this.nextQuestion()}>Next</button>
        </section>
      )
    } else {
      return (
        <div>
        <button onClick={() => this.checkAnswers(this.lesson.head.value, this.lesson.head.value.choices[0].text)}>{this.lesson.head.value.text}</button>
        <button>{this.lesson.head.value.choices[0].text}</button>
        <button>{this.lesson.head.value.choices[1].text}</button>
        <button>{this.lesson.head.value.choices[2].text}</button>
        <button>{this.lesson.head.value.choices[3].text}</button>
        </div>
        );      
    }
  }
}

const mapStateToProps = state => {
  console.log('this is our state',state);
  return {
  lessonId: state.currentLesson,
  lesson: state.userLessons,
  results: state.showResults
}
}

export default connect(mapStateToProps)(QuestionPage);