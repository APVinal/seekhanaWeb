![Seekhana Logo](client/public/images/mandala-logo.svg)

What is Seekhana?
-----------------
Seekhana is an experimental app designed primarily for the creators to try our hand at creating a practical spaced repetition algorithm. It also served as a sandbox for learning the basics of CSS grid, as well as dealing with difficult layout tasks - such as keeping the aspect ratio of the question cards in tact while being responsive. The premise of the app is to teach the basics of Hindi to an english speaker, however this app is currently not ready to teach someone hindi. We'd love to get it to that point someday soon though, as there is a niche that needs filling when it comes to learning this beautiful language.

Spaced Repetition
-----------------
If you're unfamiliar, spaced repetition is a concept that is popular among learning applications, and the basic idea is this: As a user, if I get a question wrong I should see that question more frequently until I start getting it right. If I get a question right, I should see that question less frequently to test that I am retaining the information. If you've ever used DuoLingo, they make use of an algorithm like this.

Our goal was to design our own spaced repetition algorithm from scratch without looking at anyone else's, first. There are some truly elegant solutions out there, but we wanted to see if we could come up with our own in a matter of a couple of days that we felt proud of.

The Algorithm
--------------
I'm happy to say that our Algorithm has a time complexity of O(n), and is composed entirely of basic arithmetic and a javascript implementation of a doubly linked list.

Here's how it works:
* when a user selects a lesson for the first time, each question in that lesson is assigned a multiplier value of 1 - this multiplier value stays with the user from this point forward.
* If a user answers a question incorrectly, the multiplier value is divided by 1.7, if they answer correctly the multiplier is multiplied by 1.7 - however the multiplier is capped at 1. Why 1.7? We played with a multitude of numbers and 1.7 just 'felt' right. The idea is that user testing and feedback would help us hone in on the perfect incrementation of the multiplier.
* Each time a user answers a question, a 'moveFactor' is assigned. This number is calculated based on the length of the lesson minus a random number between 1 and 5. The idea here is that the moveFactor is your base move, and to keep things interesting we never move a question directly to the end of the list. 
* The moveFactor is then reassigned to itself times the multiplier. This value corresponds to an index value from the linked list - the new position of the question.
* The multiplier is now stored with the question so that it can be referenced the next time this user answers this question.


What runs Seekhana?
-----------------
* [MongoDB](https://www.mongodb.com/) - A NoSQL (document) database
* [Express](http://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
* [Node.js](https://nodejs.org/en/) - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows developers to easily build scalable network applications
* [React](https://facebook.github.io/react/) - A JavaScript frontend library for creating and building user interfaces

Known Issues & Plans for the future
-----------------
* There is an issue with refreshing while inside of a lesson. This triggers a permanent 'loading' state.
* The navigation is subpar, there needs to be a way for a user to get back to the lesson selector page, and currently the only way is to use the browser back button.
* Currently, the quiz will go on indefinitely, and the only feedback A user recieves is whether or not they got the question right. We plan on implementing an end to the quiz when the user has answered a certain number of questions, this quiz end state will have feedback on the user's overall performance on the quiz.
* The truthiness of an answer choice is currently held in the value of the radio button. This isn't good for production because anyone who knows how to use chrome devtools can easily see which answer is correct, but it was super helpful during development.