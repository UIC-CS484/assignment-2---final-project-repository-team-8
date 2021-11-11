import SpotifyDashboard from "./SpotifyDashboard";
import SpotifyLogin from "./SpotifyLogin";

const code = new URLSearchParams(window.location.search).get("code")

function SpotifyPage(){
    return code ? <SpotifyDashboard code={code} /> : <SpotifyLogin />
}
export default SpotifyPage