require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var spotify = new spotify(keys.spotify);

var inputString = process.argv;

var band = inputString[3];


//concert-this
//spotify-this-song
//movie-this
//do-what-it-says