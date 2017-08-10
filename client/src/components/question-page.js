import React, {Component} from 'react';
import {connect} from 'react-redux';
import LinkedList from '../linkedList';
import { checkAnswer, updateAnswer, nextQuestion, inputAnswer } from '../actions/actions';

class QuestionPage extends Component {

  componentWillMount(){
    let newLesson = new LinkedList();
    let i = 0;
    const lessonArray = this.findLesson(this.props.lesson, this.props.lessonId).questions;
    const randomizedLesson = this.randomizeArray(lessonArray);
    const selectedLesson = randomizedLesson.slice(0, 10);
    console.log('presliced', randomizedLesson);
    console.log('this is the lesson',selectedLesson);

   selectedLesson.forEach(question => {
      newLesson.insert(i++, question);
    });

    this.lesson = newLesson;
  }

  swap(arr, i, j){
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  
  randomizeArray(arr) {
    for( let i = arr.length -1; i>=0; i--){
      let random = Math.floor(Math.random()*i);
      this.swap(arr, i, random);
    }
    return arr;
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

  checkAnswers(e, node){
    e.preventDefault();
    let multiAnswer = 'Incorrect';
    let pronunAnswer = 'Incorrect';
    let multiplier = node.multiplier;
    let moveFactor = this.checkLength(this.lesson) - Math.floor((Math.random()* 5) + 1);
    let currentCap = this.props.currentCap; 
    let questionCount = this.props.questionCount;

    if (this.props.inputAnswer === node.pronunciation && this.props.selectedAnswer){
      multiAnswer = 'Correct';
      pronunAnswer = 'Correct';
      multiplier = Math.min((multiplier * 1.7), 1);
      moveFactor = Math.ceil(moveFactor * multiplier);
    } else if (this.props.inputAnswer === node.pronunciation){
      pronunAnswer = 'Correct';
      multiplier /= 1.7;
      moveFactor = Math.ceil(moveFactor * multiplier);
      currentCap += 1;
    } else if (this.props.selectedAnswer) {
      multiAnswer = 'Correct';
      multiplier /= 1.7;
      moveFactor = Math.ceil(moveFactor * multiplier);
      currentCap += 1;
    } else {
      multiplier /= 1.7;
      moveFactor = Math.ceil(moveFactor * multiplier);
      currentCap += 1;
    }
    
    questionCount += 1;
    node.multiplier = multiplier;

    console.log('moveFactor', moveFactor);
    this.lesson.insert(moveFactor, node);
    this.props.dispatch(checkAnswer(multiAnswer, pronunAnswer, currentCap, questionCount));
  }

  nextQuestion(){
    this.lesson.delete(0);
    this.props.dispatch(nextQuestion());
  }

  updateInput(e){
    this.props.dispatch(inputAnswer(e));
  }

  render() {
    console.log(this.lesson);
    const node = this.lesson.head.value;
  
    let resultsRender;

    if (this.props.results && node.pronunciation){
      resultsRender = (
        <section>
          <div>These are the results</div>
          <div>You are {this.props.multiAnswer}, the answer is Y</div>
          <div>You are {this.props.pronunciationAnswer}, the pronunciation is {node.pronunciation}</div>
          <button onClick={() => this.nextQuestion()}>Next</button>
        </section>
      );
    } else if (this.props.results){
      resultsRender = (
        <section>
          <h1>{node.text}</h1>
          <div>These are the results</div>
          <div>You are {this.props.multiAnswer}, the answer is Y</div>
          <button onClick={() => this.nextQuestion()}>Next</button>
        </section>
      );
    }

    if (node.pronunciation) {
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
            <button onClick={(e) => this.checkAnswers(e, node)}>Submit</button>
          </form>
          {resultsRender}
        </div>
        );      
    } else {
      return (
        <div>
          <h1>{node.text}</h1>
            <button onClick={()=> this.updateSelectedAnswer(node.choices[0])}>{node.choices[0].text}</button>
            <button onClick={()=> this.updateSelectedAnswer(node.choices[1])}>{node.choices[1].text}</button>
            <button onClick={()=> this.updateSelectedAnswer(node.choices[2])}>{node.choices[2].text}</button>
            <button onClick={()=> this.updateSelectedAnswer(node.choices[3])}>{node.choices[3].text}</button>
          <form>
            <button onClick={() => this.checkAnswers(node)}>Submit</button>
          </form>
            {resultsRender}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  console.log(state);
return {
  lessonId: state.currentLesson,
  lesson: state.userLessons,
  results: state.showResults,
  selectedAnswer: state.selectedAnswer,
  multiAnswer: state.multiAnswer,
  pronunciationAnswer: state.pronunciationAnswer,
  inputAnswer: state.inputAnswer,
  currentCap: state.currentCap,
  questionCount: state.questionCount
}
}

export default connect(mapStateToProps)(QuestionPage);