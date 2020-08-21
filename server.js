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
const getTrackIds = require('./utils/getTrackIds')
const getAudioFeatures = require('./utils/getAudioFeatures')
const getTrackDetails = require('./utils/getTrackDetails')

const weatherData = require('./routes/Weather/weather');



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

app.use('/weather', weatherData);



const port = process.env.PORT || 8888;

app.listen(port, () => {
     console.log(`Server started on port ${port}`)
})