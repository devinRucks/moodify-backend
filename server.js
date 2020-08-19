if (process.env.NODE_ENV !== 'production') {
     require('dotenv').config()
}

const express = require('express'); // Express web server framework
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const login = require('./routes/Authentication/login');
const callback = require('./routes/Authentication/callback')
const refreshToken = require('./routes/Authentication/refresh_token')
const axios = require('axios')


const getArtistIds = require('./utils/getArtistIds')
const getTrackIds = require('./utils/getTrackIds')
const getAudioFeatures = require('./utils/getAudioFeatures')
const getTrackDetails = require('./utils/getTrackDetails')



let spotifyApi = new SpotifyWebApi({
     clientId: process.env.CLIENT_ID,
     clientSecret: process.env.CLIENT_SECRET,
     redirectUri: process.env.REDIRECT_URI
})

const app = express();

app.use(cors())
app.use(cookieParser())

app.use('/login', login);
app.use('/callback', callback(spotifyApi));
app.use('/refresh_token', refreshToken);


// app.get('/getAlbums', (req, res) => {
//      spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', { limit: 10, offset: 0 })
//           .then((data) => {
//                res.send(data.body)
//                console.log('Artist albums', data.body);
//           }, (err) => {
//                res.send(err)
//                console.error(err);
//           })
// })

/** TODO:
 * (1) Change this to post request. 
 * (2) Client will send the mood settings, this route will recieve them and use it to filter
 * out the current list of all the songs.
 * (3) It will send the client back the filtered list, aka, the custom playlist for their mood
 * 
 * Example:
 * It will be an array of objects, each object being a track in the custom playlist
 * Store this in local storage that way you can save api calls. Maybe put the date is was stored in localstorage,
 * that way you can implement something that says, "If 5 days has passed since it was uploaded into localstorage, 
 * then go get new data."
 * [
     * {
     *   "danceability": 0.808,
          "energy": 0.626,
          "key": 7,
          "loudness": -12.733,
          "mode": 1,
          "speechiness": 0.168,
          "acousticness": 0.00187,
          "instrumentalness": 0.159,
          "liveness": 0.376,
          "valence": 0.369,
          "tempo": 123.99,
          "artist-name": "Elvis Presley",
          "album-cover": url,
          "genre": "Rock",
          "song-name": "Song Name"

     * },
     * {
          .......
          ......
          ...
          ..
          .
     * },
 * ]
 * 
 * (4) Don't forget to include things like song image, artist info, etc. to make UI nice.
 * 
 * This route will also be used for the weather side of the application.
 */


app.get('/getSongs', async (req, res) => {
     // ESlint says that await has no effect but it does. 
     // I think it's because I have the functions return an array instead of a promise, 
     // but any async function implicitly returns a promise. Might want to come back to this.

     try {
          const allArtistIds = await getArtistIds(spotifyApi, "long_term", 50, 0);
          const allTrackIds = await getTrackIds(spotifyApi, allArtistIds, 'US')
          const allAudioFeatures = await getAudioFeatures(spotifyApi, allTrackIds)
          const allTrackDetails = await getTrackDetails(spotifyApi, allAudioFeatures, allTrackIds)
          res.send(allTrackDetails)
     } catch (err) {
          console.log(err)
     }
})


const port = process.env.PORT || 8888;

app.listen(port, () => {
     console.log(`Server started on port ${port}`)
})