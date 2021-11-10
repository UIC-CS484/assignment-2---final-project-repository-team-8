import React, { useState } from "react";
import NavBar from "../NavBar";
import { constants, errors, routes } from "../../Common";
import axios from "axios";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    login: {
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        backgroundColor: 'black',

        '& img':{
            width: '100%'
        },

        '& a':{
            padding: '20px',
            borderRadius: '99px',
            backgroundColor: '#1db954',
            fontWeight: 600,
            color: 'white',
            textDecoration: 'none',
        },

        '& a:hover':{
            backgroundColor:' white',
            borderColor: '#1db954',
            color: '#1db954',
        }
    },
});

export default function SpotifyLogin() {

    const [redirect, setRedirect] = useState("");

    React.useEffect(() => {
        axios.get(routes.SPOTIFY_AUTH)
                .then((res) => {
                    console.log(res.data)
                    setRedirect(res.data)
                }).catch((error) => {
                    console.log(error)
            });
    }, []);

	const classes = useStyles()
    return (
        <div className={classes.login}>
			<NavBar />
            <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="Spotify-Logo"/>
			<a href={redirect}>LOGIN WITH SPOTIFY</a>
        </div>
	);
}