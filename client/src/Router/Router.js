import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import history from '../history';

import Login from "../containers/login";
import Register from "../containers/register";


class App extends Component {

  render() {
    return (
      <Router history={history}>
          <Route exact path='/' component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
      </Router>
    );
  }
}

export default App;