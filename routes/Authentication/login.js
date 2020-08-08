const express = require('express')
const router = express.Router()
const querystring = require('querystring');
const generateRandomString = require('../../utils/generateRandomString')

router.route('/')
     .get((req, res) => {
          const stateKey = 'spotify_auth_state'
          let state = generateRandomString(16);
          res.cookie(stateKey, state);

          // application requests authorization
          res.redirect('https://accounts.spotify.com/authorize?' +
               querystring.stringify({
                    response_type: 'code',
                    client_id: process.env.CLIENT_ID,
                    scope: process.env.SCOPE,
                    redirect_uri: process.env.REDIRECT_URI,
                    state: state
               }));
     })

module.exports = router;