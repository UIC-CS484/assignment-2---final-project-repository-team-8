import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { session } from "../session";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route {...rest}
			   render={props => {
				   if (session == "authenticated") {
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