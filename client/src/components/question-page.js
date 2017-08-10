import React, {Component} from 'react';
import {connect} from 'react-redux';
import LinkedList from '../linkedList';
import { checkAnswer, updateAnswer, nextQuestion, inputAnswer } from '../actions/actions';

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

  updateSelectedAnswer(answer) {
    let selectedAnswer = false;

    if (answer.correct){
      selectedAnswer = true;
    }

    this.props.dispatch(updateAnswer(selectedAnswer));
  }

  checkAnswers(obj, answer){
    let multiAnswer = 'Incorrect';
    let pronunAnswer = 'Incorrect';

    if (this.props.inputAnswer === obj.pronunciation){
      pronunAnswer = 'Correct';
    }

    if (this.props.selectedAnswer) {
      multiAnswer = 'Correct';
    }

    this.lesson.insert(this.checkLength(this.lesson), obj);
    this.lesson.delete(0);
    this.props.dispatch(checkAnswer(multiAnswer, pronunAnswer));

  }

  nextQuestion(){
    this.props.dispatch(nextQuestion());
  }

  updateInput(e){
    this.props.dispatch(inputAnswer(e));
  }

  render() {
    console.log(this.lesson);
    const node = this.lesson.head.value;

    if(this.props.results){
      return (
        <section>
        <div>These are the results</div>
        <div>You are {this.props.multiAnswer}, the answer is Y</div>
        <div>You are {this.props.pronunciationAnswer}, the pronunciation is {node.pronunciation}</div>
        <button onClick={() => this.nextQuestion()}>Next</button>
        </section>
      )
    } else {
      return (
        <div>
          <h1>{node.text}</h1>
            <button onClick={()=> this.updateSelectedAnswer(node.choices[0])}>{node.choices[0].text}</button>
            <button onClick={()=> this.updateSelectedAnswer(node.choices[1])}>{node.choices[1].text}</button>
            <button onClick={()=> this.updateSelectedAnswer(node.choices[2])}>{node.choices[2].text}</button>
            <button onClick={()=> this.updateSelectedAnswer(node.choices[3])}>{node.choices[3].text}</button>
          <form>
            <label>Answer</label>
            <input type='text' onChange={e=> this.updateInput(e.target.value)} />
            <button onClick={() => this.checkAnswers(node)}>Submit</button>
          </form>
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
  results: state.showResults,
  selectedAnswer: state.selectedAnswer,
  multiAnswer: state.multiAnswer,
  pronunciationAnswer: state.pronunciationAnswer,
  inputAnswer: state.inputAnswer
}
}

export default connect(mapStateToProps)(QuestionPage);