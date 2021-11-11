import { useState, useEffect } from "react"
import Player from "react-spotify-web-playback"

export default function SpotifyPlayer({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null
  return (
    <Player
      token={accessToken}
      showSaveIcon
      magnifySliderOnHover
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      styles={{
        color: '#236B8E',
        sliderColor: '#236B8E'
      }}
    />
  ) 
}
