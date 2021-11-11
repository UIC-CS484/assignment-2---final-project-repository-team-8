import React, { useState, useEffect } from "react";
import axios from "axios";
import { constants, errors, routes } from "../../Common";

export default function SpotifyAuth(code) {

    const [accessToken, setAccessToken] = useState();

    useEffect(() => {
        axios.post(routes.SPOTIFY_LOGIN, { code })
            .then((response) => {
            setAccessToken(response.data.accessToken);
            window.history.pushState({}, null, "/spotify");
          })
          .catch(() => {
              console.log()
            window.location = "/home";
          });
      }, [code]);
    
      return accessToken
}
