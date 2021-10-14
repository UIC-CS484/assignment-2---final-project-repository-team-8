import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";


class App extends Component {

	render() {
		return (
			<Router>
				<Route exact path="/" component={Login} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/home" component={Home} />
			</Router>
		);
	}
}

export default App;