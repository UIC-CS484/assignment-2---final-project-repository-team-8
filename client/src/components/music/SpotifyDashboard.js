import React from 'react'
import auth from './SpotifyAuth'

export default function SpotifyDashboard(body) {
    console.log(body)
    const token = auth(body.code)
    return (
        <div>
           
        </div>
    )
}
