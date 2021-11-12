import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Chart } from "react-google-charts";
import { Bar } from 'react-chartjs-2';

export default function SpotifyArtistChart({ accessToken }) {

  const [topArtist, setTopArtist] = useState([]);
  const [chartBool, setChartBool] = useState(false);



  useEffect(() => {
    getTopArtists();
  }, [])

  const getTopArtists = () => {
    axios.get('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=1', { headers: { "Authorization": `Bearer ${accessToken}` } })
        .then((res) => {
            setTopArtist(res.data)
            setChartBool(true)
            console.log(topArtist.items)
        })
        .catch((error) => {
            console.error(error)
        })
  }

  return (
    <div>
      <Button onClick={getTopArtists} block size="sm" type="submit">Generate your top Artist</Button>
        
      {/* {topArtist.items.map(item => {
        return <li>{item.name}</li>
      })} */}
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['City', '2010 Population', '2000 Population'],
          ['New York City, NY', 8175000, 8008000],
          ['Los Angeles, CA', 3792000, 3694000],
          ['Chicago, IL', 2695000, 2896000],
          ['Houston, TX', 2099000, 1953000],
          ['Philadelphia, PA', 1526000, 1517000],
        ]}
        options={{
          title: 'Population of Largest U.S. Cities',
          chartArea: { width: '50%' },
          hAxis: {
            title: 'Total Population',
            minValue: 0,
          },
          vAxis: {
            title: 'City',
          },
        }}
        // For tests
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
    
  ) 
}
