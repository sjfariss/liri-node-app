# liri-node-app
Liri is a Language Interpretation and Recognition Interface. Liri will be a command line node app that takes in parameters and gives you back data

What it does
Twitter
node liri.js my-tweets <insert Twitter handle>

This will show this username's last 20 tweets and when they were created at in your terminal/bash window.

Spotify
node liri.js spotify-this-song <insert song title>*use quotes for more than one word and you can put artist, song i.e. node liri.js spotify-this-song "Michael Jackson, Thriller"

This will show the following information about the song in your terminal/bash window

Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from
If no song is provided then your program will default to "The Sign" by Ace of Base 

Movies
node liri.js movie-this <insert movie title>*use quotes"" for movie titles with more then one name i.e. node liri.js movie-this "North By Northwest"

This will output the following information to your terminal/bash window:

Title of the movie.
Year the movie came out.
IMDB Rating of the movie.
Country where the movie was produced.
Language of the movie.
Plot of the movie.
Actors in the movie.
Rotten Tomatoes Rating.

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

Do What It Says
node liri.js do-what-it-says

Right now it will run spotify-this-song for "I Want it That Way,".
You can change it to any of the commands above, my-tweets, movie-this, spotify-this-song
Feel free to change the text in that document to test out the feature for other commands.

Author
Sharon Fariss
