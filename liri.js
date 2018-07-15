//have to put require dotenv for passwords
// set vars dependincies
require("dotenv").config();
var keys = require("./keys");
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
//tried npm simple-node-logger didn't execute properly

// FUNCTIONS
// =====================================

// Writes to the log.txt 
var writeToLog = function(data) {
  // Append log.txt
  fs.appendFile("log.txt", JSON.stringify(data) + "\n", function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("log.txt was updated!");
  });
};
//Functions for arg one and arg two
// Function which takes in command line arguments 
var doThis = function(argOne, argTwo) {
  choice(argOne, argTwo);
};

// Function for my-tweets
var params = { screen_name: "HappyDay999999", count: 20};
var getTweets = function() {
  var client = new Twitter(keys.twitter);

  
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (!error) {
      var data = [];

      for (var i = 0; i < tweets.length; i++) {
        data.push({
          created_at: tweets[i].created_at,
          text: tweets[i].text
        });
      }

      console.log(data);
      writeToLog(data);
    }
  });
};

//function for spotify-this-song
//for new key.js secrets
var spotify = new Spotify(keys.spotify);
// var and function for spotifty
var getArtistNames = function(artist) {
  return artist.name;
};
var getSpotify = function(songName) {
  if (songName === undefined) {
    songName = "Ace of Base, The Sign";
  }
  spotify.search({ type: "track", query: songName }, function(err, data) {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    }

    var songs = data.tracks.items;
    var data = [];
//Would like to update to limit songs???
    for (var i = 0; i < songs.length; i++) {
      data.push({
        "artist(s)": songs[i].artists.map(getArtistNames),
        "song name: ": songs[i].name,
        "preview song: ": songs[i].preview_url,
        "album: ": songs[i].album.name
      });
    }

    console.log(data);
    writeToLog(data);
  });
};



// function for movie-this
var getMovie = function(movieName) {
  if (movieName === undefined) {
    movieName = "Mr Nobody";
    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
    console.log("It's on Netflix!");
  }

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

  request(urlHit, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonData = JSON.parse(body);

      var data = {
        "Title:": jsonData.Title,
        "Year:": jsonData.Year,
        "Rated:": jsonData.Rated,
        "IMDB Rating:": jsonData.imdbRating,
        "Country:": jsonData.Country,
        "Language:": jsonData.Language,
        "Plot:": jsonData.Plot,
        "Actors:": jsonData.Actors,
        "Rotten Tomatoes Rating:": jsonData.Ratings[1].Value
      };

      console.log(data);
      writeToLog(data);
    }
  });
};

// Function for do-what-it-says
var doIt = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataInfo = data.split(",");

    if (dataInfo.length === 2) {
      choice(dataInfo[0], dataInfo[1]);
    }
    else if (dataInfo.length === 1) {
      choice(dataInfo[0]);
    }
  });
};

// Function for determining which command is executed via switch
var choice = function(userInfo, functionInfo) {
  switch (userInfo) {
  case "my-tweets":
    getTweets();
    break;
  case "spotify-this-song":
    getSpotify(functionInfo);
    break;
  case "movie-this":
    getMovie(functionInfo);
    break;
  case "do-what-it-says":
    doIt();
    break;
  default:
    console.log("Please enter a different request");
  }
};

// execute process argv2 and argv 3 from function args
// =====================================
doThis(process.argv[2], process.argv[3]);

