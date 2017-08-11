import React, {Component} from 'react';
import {connect} from 'react-redux';
import LinkedList from '../linkedList';
import { checkAnswer, nextQuestion } from '../actions/actions';

class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: true,
      multi: null,
      lesson: {},
      correct: null,
      total: null
    }
  }
  componentWillMount(){
    if(this.findLesson(this.props.lesson, this.props.lessonId)) {
      let newLesson = new LinkedList();
      let i = 0;
      const lessonArray = this.findLesson(this.props.lesson, this.props.lessonId).questions;
      const randomizedLesson = this.randomizeArray(lessonArray);
      const selectedLesson = randomizedLesson.slice(0, 10);

      selectedLesson.forEach(question => {
        newLesson.insert(i++, question);
      });

      this.lesson = newLesson;
      
      this.setState({
        lesson: newLesson
      });
    }
  }

    componentWillReceiveProps(nextProps){
    if(this.findLesson(nextProps.lesson, nextProps.lessonId)) {
      let newLesson = new LinkedList();
      let i = 0;
      const lessonArray = this.findLesson(nextProps.lesson, nextProps.lessonId).questions;
      const randomizedLesson = this.randomizeArray(lessonArray);
      const selectedLesson = randomizedLesson.slice(0, 10);

      selectedLesson.forEach(question => {
        newLesson.insert(i++, question);
      });

      this.lesson = newLesson;

      this.setState({
        lesson: newLesson
      });
    }
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
    return false;
  }

  checkLength(linkedList){
    return linkedList.length;
  }

  checkAnswers(e, node){
    e.preventDefault();
    if (this.state.multi) {
      let multiAnswer = 'Incorrect';
      let pronunAnswer = 'Incorrect';
      let multiplier = node.multiplier;
      let moveFactor = this.checkLength(this.state.lesson) - Math.floor((Math.random()* 5) + 1);
      let currentCap = this.props.currentCap; 
      let questionCount = this.props.questionCount;

      if (this.state.input === node.pronunciation && this.state.multi === 'true'){
        multiAnswer = 'Correct';
        pronunAnswer = 'Correct';
        multiplier = Math.min((multiplier * 1.7), 1);
        moveFactor = Math.ceil(moveFactor * multiplier);
        this.setState({
          correct: 2,
          total: 2
        })
      } else if (this.state.input === node.pronunciation){
        pronunAnswer = 'Correct';
        multiplier /= 1.7;
        moveFactor = Math.ceil(moveFactor * multiplier);
        currentCap += 1;
        this.setState({
          correct: 1,
          total: 2
        })
      } else if (this.state.multi === 'true' && node.pronunciation) {
        multiAnswer = 'Correct';
        multiplier /= 1.7;
        moveFactor = Math.ceil(moveFactor * multiplier);
        currentCap += 1;
        this.setState({
          correct: 1,
          total: 2
        })
      } else if (this.state.multi === 'true') {
        console.log('hit correctly');
        multiAnswer = 'Correct';
        multiplier = Math.min((multiplier * 1.7), 1);
        moveFactor = Math.ceil(moveFactor * multiplier);
        this.setState({
          correct: 'Correct!'
        })
      } else if (node.pronunciation) {
        multiplier /= 1.7;
        moveFactor = Math.ceil(moveFactor * multiplier);
        currentCap += 1;
        this.setState({
          currect: 0,
          total: 2
        })
      } else {
        multiplier /= 1.7;
        moveFactor = Math.ceil(moveFactor * multiplier);
        currentCap += 1;
        this.setState({
          currect: 0,
          total: 1
        })
      }
      
      questionCount += 1;
      node.multiplier = multiplier;

      this.lesson.insert(moveFactor, node);
      this.props.dispatch(checkAnswer(multiAnswer, pronunAnswer, currentCap, questionCount));
      this.setState({
        input: null,
        multi: null,
        lesson: this.lesson
      });
      
    } else if (this.state.input) {
      alert('Multiple choice selection required');
    } else if (this.state.multi && node.pronunciation){
      alert('Input field required');
    } else if (this.state.muli === null){
      alert('Selection is required');
    } else if (this.state.muli === null && this.state.input === null){
      alert('Input field and multiple choice required')
    }
  }

  nextQuestion(){
    this.lesson.delete(0);
    this.props.dispatch(nextQuestion());
    this.setState({
      lesson: this.lesson,
      correct: 'Sorry, that\'s wrong',
      total: null
    })
    // const resetValues = document.getElementsByClassName('reset-form');
    // resetValues.checked = false;
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
    if(!this.lesson) {
     return <div>Loading</div>
    }
    
    const node = this.state.lesson.head.value;
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

    if (this.props.results){
      resultsRender = (
        <section className="results">
          <div>{this.state.correct}</div>
          <button className="login" onClick={() => this.nextQuestion()}>Next</button>
        </section>
      );
    }

    if (node.pronunciation) {
      return (
        <main className="container cardStack">
          <div className="card card-primary">
          <h1 className="container">{node.text}</h1>
            <form className="container reset-form">
              <div className="multiChoice">
                <div className="choice answerChoice-1">
                  <input id="answerChoice-1" type='radio' name='questions' value={node.choices[0].correct} 
                          onClick={(e) => this.updateMulti(e.target.value)} />
                  <label htmlFor="answerChoice-1">{node.choices[0].text} </label>
                </div>
                <div className="choice answerChoice-2">
                  <input id="answerChoice-2" type='radio' name='questions' value={node.choices[1].correct} 
                          onClick={(e) => this.updateMulti(e.target.value)} />
                  <label htmlFor="answerChoice-2">{node.choices[1].text} </label>
                </div>
                <div className="choice answerChoice-3">
                  <input id="answerChoice-3" type='radio' name='questions' value={node.choices[2].correct} 
                          onClick={(e) => this.updateMulti(e.target.value)} />
                  <label htmlFor="answerChoice-3">{node.choices[2].text} </label>
                </div>
                <div className="choice answerChoice-4">
                  <input id="answerChoice-4" type='radio' name='questions' value={node.choices[3].correct} 
                            onClick={(e) => this.updateMulti(e.target.value)} />
                  <label htmlFor="answerChoice-4">{node.choices[3].text} </label>
                </div>
              </div>
              <label htmlFor="translit">Transliteration</label>
              <input id="translit" type='text' onChange={e=> this.updateInput(e.target.value)} />
              <button className="login" onClick={(e) => this.checkAnswers(e, node)}>Submit</button>
            </form>
            {resultsRender}
          </div>
          <div className="card back a"><h1></h1></div>
          <div className="card back b"><h1></h1></div>
        </main>
        );      
    } else {
      return (
        <main className="container cardStack">
          <div className="card card-primary">
            <h1 className="container">{node.text}</h1>
            <form className="container reset-form">
              <div className="multiChoice">
                <div className="choice answerChoice-1">
                  <input id="answerChoice-1" type='radio' name='questions' value={node.choices[0].correct} 
                          onClick={(e) => this.updateMulti(e.target.value)}/>
                  <label htmlFor="answerChoice-1">{node.choices[0].text} </label>
                </div>
                <div className="choice answerChoice-2">
                  <input id="answerChoice-2" type='radio' name='questions' value={node.choices[1].correct} 
                          onClick={(e) => this.updateMulti(e.target.value)} />
                  <label htmlFor="answerChoice-2">{node.choices[1].text} </label>
                </div>
                <div className="choice answerChoice-3">
                  <input id="answerChoice-3" type='radio' name='questions' value={node.choices[2].correct} 
                          onClick={(e) => this.updateMulti(e.target.value)} />
                  <label htmlFor="answerChoice-3">{node.choices[2].text} </label>
                </div>
                <div className="choice answerChoice-4">
                  <input id="answerChoice-4" type='radio' name='questions' value={node.choices[3].correct} 
                          onClick={(e) => this.updateMulti(e.target.value)} />
                  <label htmlFor="answerChoice-4">{node.choices[3].text} </label>
                </div>
              </div>
              <button className="login" onClick={(e) => this.checkAnswers(e, node)}>Submit</button>
            </form>
              {resultsRender}
            </div>
          <div className="card back a"></div>
          <div className="card back b"></div>
        </main>
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