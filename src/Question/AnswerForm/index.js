import React, { Component } from "react";
import { Panel, Button } from "react-bootstrap";

import "./index.css";

class AnswerForm extends Component {
  state = {};

  onSubmit = e => {
    e.preventDefault();

    let { sendAnswer } = this.props;
    let { author, text } = this.state;

    sendAnswer({ author, text });

    this.setState({
      text: ""
    });
  };

  onChangeText = e => {
    this.setState({
      text: e.target.value
    });
  };

  onChangeAuthor = e => {
    this.setState({
      author: e.target.value
    });
  };

  render() {
    let { author, text } = this.state;

    return (
      <Panel bsClass="answerPanel panel">
        <Panel.Body>
          <form className="answerForm" onSubmit={this.onSubmit}>
            <div className="answerForm__field">
              <label htmlFor="author">Author</label>
              <input
                id="author"
                type="text"
                onChange={this.onChangeAuthor}
                value={author}
                required
              />
            </div>
            <div className="answerForm__field">
              <label htmlFor="text">Text</label>
              <textarea
                id="text"
                type="text"
                onChange={this.onChangeText}
                value={text}
                required
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Panel.Body>
      </Panel>
    );
  }
}

export default AnswerForm;
