import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Table from "./Table";
import About from "./About";
import Error from "./Error";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <header>
          <h1 className="text-center">
            <a href="/" className="text-dark">
              MeMo
            </a>
          </h1>
        </header>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/error" component={Error} />
          <Route path="/" component={Table} />
        </Switch>
        <footer className={" bg-secondary p-3 text-center text-light"}>
          <p>
            Copyright Yvan douenel{" "}
            <a href="/About" className="text-light">
              A propos
            </a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
