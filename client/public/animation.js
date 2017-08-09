'use strict';

const pron=['N','a','m','a','s','t','e'];
const eng=['H','e','l','l','o'];
const hind=['न','म','स्ते'];

const text = [pron,eng,hind];

function pushText(letter, output, i){
  setTimeout(() => {
    output.push(letter);
    $('.helloText').html(output);
  },i);
}

function pullText(output, i){
  setTimeout(() => {
    output.pop();
    $('.helloText').html(output);
  },i);
}

function changeText(word){
  let output = [];
  let i = 200;
  word.forEach(letter => {
    pushText(letter, output, i);
    i += 200;
  });
  setTimeout(() => {
    i = 200;
    word.forEach(letter => {
    pullText(output, i);
    i+= 200;
  });}, 5000);
  
}

function animateHello(text, i=0){
  setInterval(() => {
    if(!text[i]){
      i = 0;
    }
    changeText(text[i]);
    i++;
  }, 7000);
}

animateHello(text);