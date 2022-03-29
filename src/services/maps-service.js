import axios from 'axios';


export const mapsService = {
    getPlaces,
}
function getPlaces(txt = 'paris') {
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${txt}&types=geocode&key=AIzaSyA32mCyDD2WWCvX0ppmqei1gSSlyjLTdno`,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    //     return axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${txt}&types=geocode&key=AIzaSyA32mCyDD2WWCvX0ppmqei1gSSlyjLTdno`)
    //         .then(res => res.data)
    //         .catch(err => console.log(err))
}


