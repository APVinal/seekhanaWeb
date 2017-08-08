const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  googleId: {type: String, required:true},
  accessToken: {type: String, required:true},
  name: {type: String},
  lessons: {type: Array, ref: 'Lesson'}
});

const lessonSchema = mongoose.Schema({
  title: {type: String, required:true},
  questions: {type: Array, required:true, ref: 'Question'}
});

const questionSchema = mongoose.Schema({
  text: {type: String, required:true},
  choices: {type: Array, required:true, ref:'Choice'},
  pronunciation: {type: String, required: true},
  multiplier: {type: Number, default:1}
});

const choiceSchema = mongoose.Schema({
  text: {type: String, required:true},
  correct: {type: Boolean, required:true, default:false}
});

const User = mongoose.model('User', userSchema);
const Lesson = mongoose.model('Lesson', lessonSchema);
const Question = mongoose.model('Question', questionSchema);
const Choice = mongoose.model('Choice', choiceSchema);

module.exports = {User, Lesson};

// fetch('/api/lessons',{
// 	method: 'POST',
// 	headers:{
//     'Content-Type': 'application/json'
//   },
// 	body: JSON.stringify({
// 		title: 'Hello',
// 		questions: [
//       {
//         text:'Q1',
//         choices:[
//           {
//             text:'A1'
//           },
//           {
//             text:'A2',
//             correct: true
//           },
//           {
//             text:'A3'
//           },
//           {
//             text:'A4'
//           },
//         ],
//         pronunciation: 'AHHHHH'
//       },
//       {
//         text:'Q2',
//         choices:[
//           {
//             text:'A1'
//           },
//           {
//             text:'A2',
//             correct: true
//           },
//           {
//             text:'A3'
//           },
//           {
//             text:'A4'
//           },
//         ],
//         pronunciation: 'AHHHHH'
//       }
//     ]
// 	})
// });