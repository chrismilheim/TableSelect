import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Dashboard} />
        </div>
      </Router>
    );
  }
}
export default App;
