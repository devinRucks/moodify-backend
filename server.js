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
const getArtistIds = require('./utils/getArtistIds')
const axios = require('axios')


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


app.get('/getAlbums', (req, res) => {
     spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', { limit: 10, offset: 0 })
          .then((data) => {
               res.send(data.body)
               console.log('Artist albums', data.body);
          }, (err) => {
               res.send(err)
               console.error(err);
          })
})


app.get('/getSongs', async (req, res) => {
     let allTopSongs = [];

     const allArtistIds = getArtistIds(spotifyApi, "long-range", 5, 0)

     // const topArtistsResponse = await spotifyApi.getMyTopArtists({ time_range: "long_term", limit: 5, offset: 0 })
     // const allArtistsIds = topArtistsResponse.body.items.map((artistsInfo) => {
     //      return artistsInfo.id
     // })

     allArtistIds.forEach(async (id) => {
          const artistsTopSongsResponse = await spotifyApi.getArtistTopTracks(id, 'US')
          artistsTopSongsResponse.body.tracks.forEach((track) => {
               allTopSongs.push(track.name)
               console.log(track.name)
          })
     })
     res.sendStatus(200)
})


const port = process.env.PORT || 8888;

app.listen(port, () => {
     console.log(`Server started on port ${port}`)
})