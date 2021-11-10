import React, { useState } from "react";
import axios from "axios";

export default function SpotifyAuth(code) {

    React.useEffect(() => {
        axios.post('/spotify/token')
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
