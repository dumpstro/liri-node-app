require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");

var inputString = process.argv;
var command = inputString[2]; 
var input4 = inputString[3];

if (command === "concert-this") {
    axios
        .get("https://rest.bandsintown.com/artists/" + input4 + "/events?app_id=codingbootcamp")
        .then(function(response) {
            var shows = response.data;
            for (var i = 0; i < shows.length; i++) {
                var show = shows[i];
                console.log(show.venue.city + ", " + show.venue.country + " at " + show.venue.name + " " + moment(show.datetime).format("MM/DD/YYYY"))
            }
        })
        .catch(function(error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }   
            console.log(error.config);
        });
};

if (command === "spotify-this-song") {
    spotify.search({ type: 'track', query: input4 }, function(error, data) {
        if (error) {
            return console.log("Error occurred: " + error);
        }
        var trackData = data.tracks.items;    
        for (var k = 0; k < trackData.length; k++) {
            for (var j = 0; j < trackData[k].artists.length; j++) {
                if (!trackData[k].artists[j]) {
                    console.log("Artist name not found")
                } else {
                    console.log("Artist(s): " + trackData[k].artists[j].name);  
                }
                
                
            }
        }
    });
};
//spotify-this-song 
//movie-this
//do-what-it-says