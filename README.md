# Question service

As a test we would like you to write a simple Question and Answer service which allows users tocreate questions that other users can answer.

* The application will maintain a list of questions that anyone can answer.
* Anyone can visit the front page and add a question to the list.
* Each question can be identified by a unique URL using a UUID.
* Anyone can add an answer to a question.

We would like the application to be a simple CRUD app, written in Node.JS using a RESTful APIwith ExpressJS and Sequalize for the backend and React for the front end.

The RESTful API will have 2 end points

* /api/questions
* /api/questions/:questionIdProper

GET and POST methods should be used.

The following extra requirements are not necessary but might help you stand out from the crowd

* Unit tests
* Postman tests
* A second front end written in Vue.JS
* Correct use of Bootstrap
* Cucumber specification
* README.MD in markdown
* Example platform on Amazon Web Services

### Launch project:

1.  npm i
2.  npm run start --> launch front on port :3000
3.  npm run server --> launch server on port :3001

### Launch tests:

npm run test --> launch server on port :3002 and perform tests

### Description:

* Front-end:

1.  Route '/' - question list
2.  Route '/:id' - specific question with answers

* Back-end:

1.  Node - v8.9.1
2.  Database - MySQL
3.  GET /api/questions - return list of questions
4.  GET /api/questions/:id - return specific question with provided id
5.  POST /api/questions ({ author, text }) - post new question
6.  POST /api/answers ({ author, text, question_id } - post new answer
