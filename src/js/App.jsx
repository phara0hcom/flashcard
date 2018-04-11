import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "../assets/scss/app";

import Primary from "./partials/navigation/primary";
import Home from "./page/Home";
import About from "./page/About";
import Settings from "./page/Settings";
import NotFound from "./page/NotFound";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Primary />
            <Switch>
              <main className="main">
                <Route exact path="/flash" component={Home} />
                <Route exact path="/flash/settings" component={Settings} />
                <Route exact path="/flash/about" component={About} />
                <Route path="/flash/*" component={NotFound} />
                <Redirect to="/flash" />
              </main>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
