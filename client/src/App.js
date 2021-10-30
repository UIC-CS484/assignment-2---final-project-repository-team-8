import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import "./App.scss";

class App extends Component {

	render() {
		return (
			<div className={"app__container"}>
				<Router>
					<Route exact path="/" component={Login} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<ProtectedRoute path="/home" component={Home} />
					<ProtectedRoute path="/profile/:user" component={Profile} />
				</Router>
			</div>
		);
	}
}

export default App;