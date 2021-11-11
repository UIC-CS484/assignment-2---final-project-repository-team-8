import { useState, useEffect } from "react";
import axios from "axios";
import { routes } from "../../Common";

export default function SpotifyAuth(code) {

    const [accessToken, setAccessToken] = useState();

    useEffect(() => {
        axios.post(routes.SPOTIFY_LOGIN, { code })
            .then((response) => {
              setAccessToken(response.data.accessToken);
              window.history.pushState({}, null, "/spotify");
          })
          .catch(() => {
              window.location = "/home";
          });
      }, [code]);
    
      return accessToken
}
