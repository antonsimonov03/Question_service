import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import _ from "lodash";

import { QUESTION_URL } from "../utils.js";

import QuestionForm from "./QuestionForm";

import "./index.css";

class Questions extends Component {
  state = {
    questions: [],
    isLoading: true,
    isFormOpen: false
  };

  componentDidMount() {
    this.loadQuestions();
  }

  async loadQuestions() {
    let { data: { questions } } = await axios.get(QUESTION_URL);

    this.setState({ questions, isLoading: false });
  }

  renderQuestions() {
    let { questions } = this.state;

    if (!questions.length) {
      return <p>There are no questions...</p>;
    }

    return _.map(questions, ({ id, text, author }) => (
      <ListGroupItem bsClass="question list-group-item" key={id}>
        <Link to={`/${id}`}>
          <h2>{author}</h2>
          {text}
        </Link>
      </ListGroupItem>
    ));
  }

  onToggleModal = () => {
    this.setState({
      isFormOpen: !this.state.isFormOpen
    });
  };

  addQuestion = async question => {
    await axios.post(QUESTION_URL, question);

    await this.loadQuestions();
  };

  render() {
    let { isFormOpen, isLoading } = this.state;

    return !isLoading ? (
      <div className="questionList">
        <ListGroup bsClass="questions list-group">
          {this.renderQuestions()}
        </ListGroup>
        <Button onClick={this.onToggleModal}>Post</Button>
        <QuestionForm
          isOpen={isFormOpen}
          addQuestion={this.addQuestion}
          closeForm={this.onToggleModal}
        />
      </div>
    ) : (
      <h2 className="loadingText">Loading...</h2>
    );
  }
}

export default Questions;
