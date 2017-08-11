import React, {Component} from 'react';
import {connect} from 'react-redux';
import LinkedList from '../linkedList';
import { checkAnswer, nextQuestion } from '../actions/actions';

class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: null,
      multi: null
    }
  }
  componentWillMount(){
    console.log('question page');
    console.log('props lesson',this.props.lessons);
    console.log('props id', this.props.lessonId);
    let newLesson = new LinkedList();
    let i = 0;
    const lessonArray = this.findLesson(this.props.lesson, this.props.lessonId).questions;
    const randomizedLesson = this.randomizeArray(lessonArray);
    const selectedLesson = randomizedLesson.slice(0, 10);

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

  checkAnswers(e, node){
    e.preventDefault();
    if (this.state.input && this.state.multi) {
      let multiAnswer = 'Incorrect';
      let pronunAnswer = 'Incorrect';
      let multiplier = node.multiplier;
      let moveFactor = 10 - Math.floor((Math.random()* 5) + 1);
      let currentCap = this.props.currentCap; 
      let questionCount = this.props.questionCount;

      if (this.state.input === node.pronunciation && this.state.multi){
        multiAnswer = 'Correct';
        pronunAnswer = 'Correct';
        multiplier = Math.min((multiplier * 1.7), 1);
        moveFactor = Math.ceil(moveFactor * multiplier);
      } else if (this.state.input === node.pronunciation){
        pronunAnswer = 'Correct';
        multiplier /= 1.7;
        moveFactor = Math.ceil(moveFactor * multiplier);
        currentCap += 1;
      } else if (this.state.multi) {
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

      console.log(moveFactor);
      this.lesson.insert(moveFactor, node);
      this.props.dispatch(checkAnswer(multiAnswer, pronunAnswer, currentCap, questionCount));
      this.setState({
        input: null,
        multi: null
      });

    } else if (this.state.input) {
      alert('Multiple choice selection required');
    } else if (this.state.multi){
      alert('Input field required');
    } else {
      alert('Input field and multiple choice required')
    }
  }

  nextQuestion(){
    this.lesson.delete(0);
    this.props.dispatch(nextQuestion());
  }

  updateInput(e){
    this.setState({
      input: e
    })
  }

  updateMulti(e){
    this.setState({
      multi: e
    })
  }

  render() {
    const node = this.lesson.head.value;
    let count = this.props.questionCount;
    let cap = this.props.currentCap;
    let max = this.props.cappedLength;

    let finalResults;

    if (count === cap || count === max){
      console.log('hit the end of the quiz');
      finalResults = (
        <div>
          These are the final results
        </div>
      )
    }
  
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
          <form>
            <label>{node.choices[0].text} </label>
            <input type='radio' name='questions' value={node.choices[0].correct}
                    onClick={(e) => this.updateMulti(e.target.value)} required />
            <label>{node.choices[1].text} </label>
            <input type='radio' name='questions' value={node.choices[1].correct} 
                    onClick={(e) => this.updateMulti(e.target.value)} />
            <label>{node.choices[2].text} </label>
            <input type='radio' name='questions' value={node.choices[2].correct} 
                    onClick={(e) => this.updateMulti(e.target.value)} />
            <label>{node.choices[3].text} </label>
            <input type='radio' name='questions' value={node.choices[3].correct}
                    onClick={(e) => this.updateMulti(e.target.value)} />

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
          <form>
            <label>{node.choices[0].text} </label>
            <input type='radio' name='questions' value={node.choices[0].correct}
                    onClick={(e) => this.updateMulti(e.target.value)} />
            <label>{node.choices[1].text} </label>
            <input type='radio' name='questions' value={node.choices[1].correct} 
                    onClick={(e) => this.updateMulti(e.target.value)} />
            <label>{node.choices[2].text} </label>
            <input type='radio' name='questions' value={node.choices[2].correct} 
                    onClick={(e) => this.updateMulti(e.target.value)} />
            <label>{node.choices[3].text} </label>
            <input type='radio' name='questions' value={node.choices[3].correct}
                    onClick={(e) => this.updateMulti(e.target.value)} />
            <button onClick={() => this.checkAnswers(node)}>Submit</button>
          </form>
            {resultsRender}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  lessonId: state.currentLesson,
  lesson: state.userLessons,
  results: state.showResults,
  multiAnswer: state.multiAnswer,
  pronunciationAnswer: state.pronunciationAnswer,
  currentCap: state.currentCap,
  questionCount: state.questionCount,
  max: state.cappedLength
});

export default connect(mapStateToProps)(QuestionPage);