require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var fs = require("fs");

var inputString = process.argv;
var command = inputString[2];
var input4 = inputString[3];


function runScript(command, input4) {

    if (command === "concert-this") {
        axios
            .get("https://rest.bandsintown.com/artists/" + input4 + "/events?app_id=codingbootcamp")
            .then(function (response) {
                var shows = response.data;
                for (var i = 0; i < shows.length; i++) {
                    var show = shows[i];
                    console.log(show.venue.city + ", " + show.venue.country + " at " + show.venue.name + " " + moment(show.datetime).format("MM/DD/YYYY"))
                }
            })
            .catch(function (error) {
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
        if (input4 === undefined) {
            input4 = "The Sign";
        }
        spotify.search({ type: 'track', query: input4 }, function (error, data) {
            if (error) {
                return console.log("Error occurred: " + error);
            }
            var trackData = data.tracks.items;
            for (var k = 0; k < trackData.length; k++) {
                console.log(k);
                for (var j = 0; j < trackData[k].artists.length; j++) {
                    if (!trackData[k].artists[j]) {
                        console.log("Artist name not found")
                    } else {
                        console.log("Artist(s): " + trackData[k].artists[j].name);
                    }
                    console.log("Song: " + trackData[k].name);
                    console.log("Preview link: " + trackData[k].preview_url);
                    console.log("Album: " + trackData[k].album.name);
                    console.log("");
                }
            };
        });
    };

    if (command === "movie-this") {
        if (input4 === undefined) {
            input4 = "Mr. Nobody"
        }
        var queryUrl = "http://www.omdbapi.com/?t=" + input4 + "&y=&plot=full&tomatoes=true&apikey=trilogy";

        axios.get(queryUrl).then(function (response) {
            var movieData = response.data;
            console.log("Title: " + movieData.Title)
            console.log("Year: " + movieData.Year)
            console.log("IMDB Rating: " + movieData.imdbRating)
            console.log("Rotton Tomatoes Rating: " + movieData.Ratings[1].value)
            console.log("Country: " + movieData.Country)
            console.log("Language: " + movieData.Language)
            console.log("Plot: " + movieData.Plot)
            console.log("Actors: " + movieData.Actors)
            console.log("Director: " + movieData.Director)
        })
    }

    if (command === "do-what-it-says") {
        console.log("Im running")
        fs.readFile("random.txt", "utf8", function (error, data) {
            console.log(data);
            var commands = data.split(",");
            if (error) {
                console.log("Error: " + error)
            } else {
                command = commands[0];
                input4 = commands[1];
                console.log(commands)
                runScript(command, input4);
            } 
        })
    }
}

runScript(command, input4);