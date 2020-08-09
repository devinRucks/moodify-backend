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
const getSongIds = require('./utils/getSongIds')



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


     const allArtistIds = await getArtistIds(spotifyApi, "long_term", 5, 0);
     const allSongIds = await getSongIds(spotifyApi, allArtistIds, 'US')
     res.send(allSongIds)

     // res.sendStatus(200)

})


const port = process.env.PORT || 8888;

app.listen(port, () => {
     console.log(`Server started on port ${port}`)
})