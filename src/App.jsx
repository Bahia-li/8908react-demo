import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/home";
import Login from "./components/login";

import BasitLayout from "./components/basit-layout";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <BasitLayout>
            <Route path="/" exact component={Home} />
          </BasitLayout>
        </Switch>
      </Router>
    );
  }
}
