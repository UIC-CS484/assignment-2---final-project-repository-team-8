import React from "react";
import NavBar from "./NavBar";
import Tweet from "./Tweet";
import {ToastsStore} from "react-toasts";
import axios from "axios";
import {constants, routes} from "../Common";


class Profile extends React.Component {

    constructor(props) {
        super(props);
        const email = this.props.match.params.user
        this.email = email
        this.tweets = [];
    }

    componentDidMount() {
        const token = localStorage.getItem(constants.TOKEN);
        axios.get(routes.TWEETS_FROM_USER + this.email, {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                this.tweets = res.data;
                this.forceUpdate();
            }).catch((error) => {
            ToastsStore.error(error.response.data.error);
        });
    }

    render() {
        return <div>
            <NavBar/>
            {this.email}'s profile
            {this.tweets.map(function (obj, index) {
                return <div><Tweet data={obj}/> <br/></div>;
            })}
        </div>;
    }
}

export default Profile;