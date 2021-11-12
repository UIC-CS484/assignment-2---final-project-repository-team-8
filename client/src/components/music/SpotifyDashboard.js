import { useState, useEffect } from "react";
import SpotifyAuth from './SpotifyAuth';
import SpotifyPlayer from "./SpotifyPlayer";
import SpotifyTrack from "./SpotifyTrack";
import { Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import "../style/Home.scss";
import NavBar from "../NavBar";
import axios from "axios";
import Plot from 'react-plotly.js';

import { constants, errors, routes } from "../../Common";

export default function SpotifyDashboard(body) {
    
    const accessToken = SpotifyAuth(body.code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")
    const [topArtists, setTopArtists] = useState([]);

    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);

	// Transform track data 
	function PopularityByTrack(data){

		let plotData = [];

		let names = [];
		let popularity = [];
        let count = 1;

		data.map(each => {
			names.push("("+count+") "+each.name);
			popularity.push(each.popularity);
            count +=1;
		})

		plotData['names'] = names;
		plotData['popularity'] = popularity;

		return plotData;
	}

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
                setLyrics(res.data.lyrics);
        })
        
        axios.get(routes.SPOTIFY_TOP_ARTIST, {
            'headers': {
                'Authorization': 'Bearer ' + accessToken //
            }
            }).then((res) => {
                setTopArtists(res.data.items);
            }).catch((error) => {
                console.error(error);
            })
    }, [playingTrack])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken);
        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(
            res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                    if (image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0])
                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url,
                }
            }))
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
        <br />
        
        <div>
			<Plot 
				data={[
					{
						type: 'bar',
						x: PopularityByTrack(topArtists)['names'],
						y: PopularityByTrack(topArtists)['popularity'],
						marker: {color:'#00000'}
					}
				]}
				layout={{
					width: 500, 
					height: 600, 
					title: 'Your top 8 Artists',
					title: '<b>Your top 8 Artists</b>',
					margin:{
						l: 40,
						r: 40,
						t: 90,
                        b: 100
					},
					paper_bgcolor: '#cfe0fc',
					plot_bgcolor: '#cfe0fc',
					font: {
						family: 'Newsreader, serif',
						size: 20,
						color: '#236B8E'
					},
					xaxis: {
						showticklabels: true,
						tickfont:{
							family: 'Arial, sans-serif',
							size: 12,
							color: '#236B8E'
						}
					},
					yaxis: {
						title: 'Popularity of Artist',
						titlefont: {
							family: 'Arial, sans-serif',
							size: 12,
							color: '#236B8E'
						},
						showticklabels: true,
						tickfont: {
							family: 'Arial, sans-serif',
							size: 12,
							color: '#236B8E'
						}
					},
					hovermode: 'closest'
				}}
			/>
		</div>
        <p><center> Select a song to look at data</center></p>
    </div>
    )
}
