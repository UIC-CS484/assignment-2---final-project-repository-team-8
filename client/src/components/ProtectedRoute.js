import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { constants } from "../Common";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route {...rest}
			   render={props => {
				   if (localStorage.getItem(constants.TOKEN)) {
					   return <Component {...rest}{...props} />;
				   } else {
					   return < Redirect to={
						   {
							   pathname: "/login",
							   state: {
								   from: props.location
							   }
						   }
					   } />;
				   }
			   }
			   }
		/>
	);
};

export default ProtectedRoute;