import React, { useState } from "react";
import axios from "axios";
import { constants, errors, routes } from "../../Common";

export default function SpotifyAuth(code) {

    React.useEffect(() => {
        axios.post(routes.SPOTIFY_TOKEN)
                .then((res) => {
                    console.log(res)
                    // setRedirect(res.data)
                }).catch((error) => {
                    console.log(error)
            });
    }, []);

    return (
        <div></div>
    )
}
