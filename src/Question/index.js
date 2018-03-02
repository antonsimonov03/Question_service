import React, { Component } from "react";
import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "axios";
import _ from "lodash";

import AnswerForm from "./AnswerForm";

import { QUESTION_URL, ANSWER_URL } from "../utils.js";

import "./index.css";

class Question extends Component {
  state = {
    isLoading: true
  };

  async componentDidMount() {
    this.loadQuestion();
  }

  loadQuestion = async () => {
    let { match: { params } } = this.props;

    let { data: { question } } = await axios.get(
      `${QUESTION_URL}/${params.id}`
    );

    this.setState({
      isLoading: false,
      ...question
    });
  };

  renderAnswers() {
    let { Answers } = this.state;

    if (!Answers.length) {
      return <div>There are no answers...</div>;
    }

    return _.map(Answers, ({ author, text }) => (
      <ListGroupItem>
        <h4>{author}</h4>
        <p>{text}</p>
      </ListGroupItem>
    ));
  }

  sendAnswer = async ({ author, text }) => {
    let { id } = this.state;

    let answer = { author, text, question_id: id };

    await axios.post(ANSWER_URL, answer);

    this.loadQuestion();
  };

  render() {
    let { isLoading, author, text } = this.state;

    return !isLoading ? (
      <div className="questionPage">
        <Panel>
          <Panel.Heading>
            <h3>{author}</h3>
            <p>{text}</p>
          </Panel.Heading>
          <Panel.Body>
            <ListGroup>{this.renderAnswers()}</ListGroup>
          </Panel.Body>
        </Panel>
        <AnswerForm sendAnswer={this.sendAnswer} />
      </div>
    ) : (
      <h2 className="loadingText">Loading...</h2>
    );
  }
}

export default Question;
