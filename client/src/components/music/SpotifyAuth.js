import { useState, useEffect } from "react";
import axios from "axios";
import { routes, constants } from "../../Common";

export default function SpotifyAuth(code) {

    const [accessToken, setAccessToken] = useState();

    
        useEffect(() => {
            if(localStorage.getItem(constants.SPOTIFY_TOKEN) === null){
            axios.post(routes.SPOTIFY_LOGIN, { code })
                .then((response) => {
                  setAccessToken(response.data.accessToken);
                  localStorage.setItem(constants.SPOTIFY_TOKEN, response.data.accessToken);
                  window.history.pushState({}, null, "/spotify");
              })
              .catch(() => {
                  window.location = "/home";
              });
            }else{
                setAccessToken(localStorage.getItem(constants.SPOTIFY_TOKEN))
            }
        }, [code]);
    
    
      return accessToken
}
