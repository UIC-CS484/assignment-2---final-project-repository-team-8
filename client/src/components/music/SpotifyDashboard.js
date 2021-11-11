import { useState, useEffect } from "react"
import SpotifyAuth from './SpotifyAuth'
import SpotifyPlayer from "./SpotifyPlayer"
import SpotifyTrack from "./SpotifyTrack"
import { Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import "../style/Home.scss";
import NavBar from "../NavBar";

import axios from "axios"
import { constants, errors, routes } from "../../Common";

export default function SpotifyDashboard(body) {
    
    const accessToken = SpotifyAuth(body.code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")
    
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_API_ID,
        clientSecret: process.env.SPOTIFY_API_SECRET
    })
    spotifyApi.setAccessToken(accessToken)
    
    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch("")
        setLyrics("")
    }
    
    useEffect(() => {
        if (!playingTrack) return

        axios.get(routes.SPOTIFY_LYRICS, {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist,
            },})
            .then(res => {
                setLyrics(res.data.lyrics)
            })
    }, [playingTrack])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return

        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(
            res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                    if (image.height < smallest.height) return image
                    return smallest
                },
                track.album.images[0]
                )

                return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
                }
            })
        )
    })

    return () => (cancel = true)
    }, [search, accessToken])

    return (
    <div className="home__container">
        <NavBar />
        <br />
        <Form.Control
            type="search"
            placeholder="Search Songs/Artists"
            value={search}
            onChange={e => setSearch(e.target.value)}
        />
        <SpotifyPlayer accessToken={accessToken} trackUri={playingTrack?.uri} />
        <br />
        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
            {searchResults.map(track => (
                <SpotifyTrack
                    track={track}
                    key={track.uri}
                    chooseTrack={chooseTrack}
                />
            ))}
            {searchResults.length === 0 && (
                <div className="text-center" style={{ whiteSpace: "pre" }}>
                    {lyrics}
                </div>
            )}
        </div>
    </div>
    )
}
