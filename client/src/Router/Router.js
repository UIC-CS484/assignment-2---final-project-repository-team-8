import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "../containers/Login";
import Register from "../containers/Register";


class App extends Component {

	render() {
		return (
			<Router>
				<Route exact path="/" component={Login} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
			</Router>
		);
	}
}

export default App;