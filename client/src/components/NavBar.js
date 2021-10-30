import {Link, useHistory} from "react-router-dom";
import React from "react";
import {constants} from "../Common";

export default function NavBar() {

    const history = useHistory();
    const handleLogout = () => {
        localStorage.clear();
        history.push("/login");
    };

    const goToProfile = () => {
        history.push("/profile/" + localStorage.getItem(constants.EMAIL));
    };

    return <div>
        <div className="redirect">
            <Link to={"/home"}>Home</Link>
        </div>
        <div className="redirect">
            <button onClick={goToProfile}>Your Profile</button>
        </div>
        <button onClick={handleLogout}>logout</button>

    </div>;
}


