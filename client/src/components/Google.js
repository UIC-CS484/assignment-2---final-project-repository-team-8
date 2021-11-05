import Geocode from "react-geocode";

export default function Google(obj) {

    Geocode.setApiKey(googleApi);
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");

    // Get latitude & longitude from address.
    Geocode.fromAddress("chicago").then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        return {lat, lng};
    },
    (error) => {
        console.error(error);
    });
}