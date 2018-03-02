import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

import Questions from "../Questions";
import Question from "../Question";

import "./index.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar>
            <Navbar.Brand>
              <h2>Question service</h2>
              <Link to="/">Questions</Link>
            </Navbar.Brand>
          </Navbar>
          <Switch>
            <Route exact path="/" component={Questions} />
            <Route path="/:id" component={Question} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
