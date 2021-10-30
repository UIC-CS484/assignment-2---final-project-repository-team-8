import {Link, useHistory} from "react-router-dom";
import React from "react";
import {constants} from "../Common";

export default function NavBar() {

    const history = useHistory();
    const handleLogout = () => {
        localStorage.clear();
        history.push("/login");
    };

    return <div>
        <div className="redirect">
            <Link to={"/home"}>Home</Link>
        </div>
        <div className="redirect">
            <Link to={"/profile/" + localStorage.getItem(constants.EMAIL)}>Your Profile</Link>
        </div>
        <button onClick={handleLogout}>logout</button>

    </div>;
}


