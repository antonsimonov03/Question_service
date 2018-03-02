import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

import "./index.css";

class QuestionForm extends Component {
  state = {};

  onSubmit = e => {
    e.preventDefault();

    let { author, text } = this.state;

    this.props.addQuestion({ author, text });
    this.setState({
      text: ""
    });
  };

  onChangeAuthor = e => {
    this.setState({
      author: e.target.value
    });
  };

  onChangeText = e => {
    this.setState({
      text: e.target.value
    });
  };

  render() {
    let { isOpen, closeForm } = this.props;
    let { author, text } = this.state;

    return (
      <Modal show={isOpen} onHide={closeForm}>
        <Modal.Header closeButton>
          <Modal.Title>Add question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="questionForm" onSubmit={this.onSubmit}>
            <div className="questionForm__field">
              <label htmlFor="author">Author</label>
              <input
                id="author"
                type="text"
                onChange={this.onChangeAuthor}
                value={author}
                required
              />
            </div>
            <div className="questionForm__field">
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
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeForm}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default QuestionForm;
