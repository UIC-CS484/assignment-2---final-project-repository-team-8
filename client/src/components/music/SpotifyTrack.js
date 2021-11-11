import React from "react"

export default function SpotifyTrack({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }
  function changeBackground(e) {
    e.target.style.background = '#3299cb';
  }
  function removeBackground(e) {
    e.target.style.background = '';
  }

  return (
    <div className="d-inline-flex p-2" style={{ cursor: "pointer" }} onClick={handlePlay} onMouseOver={changeBackground} onMouseOut={removeBackground}>
      <img src={track.albumUrl} style={{ height: "80px", width: "80px", display: 'inline-block', justifyContent: 'center'}} />
      <div style={{display: 'inline-block'}} >
        {/* <br/> */}
        <div><b>&nbsp;{track.title}</b></div>
        <div className="text-muted">&nbsp;{track.artist}</div>
      </div>
    </div>
  )
}
