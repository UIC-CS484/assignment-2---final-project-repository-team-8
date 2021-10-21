import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";

class App extends Component {

	render() {
		return (
			<Router>
				<Route exact path="/" component={Login} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<ProtectedRoute path="/home" component={Home} />
			</Router>
		);
	}
}

export default App;