const express = require('express')
const router = express.Router()
const querystring = require('querystring');
const request = require('request');

const wrapper = (spotifyApi) => {

     router.get('/', (req, res) => {
          // your application requests refresh and access tokens
          // after checking the state parameter

          const stateKey = 'spotify_auth_state'
          let code = req.query.code || null;
          let state = req.query.state || null;
          let storedState = req.cookies ? req.cookies[stateKey] : null;

          if (state === null || state !== storedState) {
               res.redirect('/#' +
                    querystring.stringify({
                         error: 'state_mismatch'
                    }));
          } else {
               res.clearCookie(stateKey);
               let authOptions = {
                    url: 'https://accounts.spotify.com/api/token',
                    form: {
                         code: code,
                         redirect_uri: process.env.REDIRECT_URI,
                         grant_type: 'authorization_code'
                    },
                    headers: {
                         'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
                    },
                    json: true
               };

               request.post(authOptions, ((error, response, body) => {
                    if (!error && response.statusCode === 200) {

                         process.env.ACCESS_TOKEN = body.access_token;
                         process.env.REFRESH_TOKEN = body.refresh_token;

                         spotifyApi.setAccessToken(process.env.ACCESS_TOKEN);

                         res.redirect('http://localhost:3000/loading')
                    } else {
                         res.redirect('/#' +
                              querystring.stringify({
                                   error: 'invalid_token'
                              }));
                    }
               }));
          }
     })
     return router;
}


module.exports = wrapper;