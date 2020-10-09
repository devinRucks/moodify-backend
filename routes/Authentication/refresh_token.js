const express = require('express')
const router = express.Router()

router.route('/')
     .get((req, res) => {
          // requesting access token from refresh token

          let refresh_token = req.query.refresh_token;

          process.env.REFRESH_TOKEN = refresh_token;

          let authOptions = {
               url: 'https://accounts.spotify.com/api/token',
               headers: { 'Authorization': 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')) },
               form: {
                    grant_type: 'refresh_token',
                    refresh_token: refresh_token
               },
               json: true
          };

          request.post(authOptions, ((error, response, body) => {
               if (!error && response.statusCode === 200) {
                    let access_token = body.access_token;

                    process.env.ACCESS_TOKEN = access_token

                    res.send({
                         'access_token': access_token
                    });
               }
          }));
     })

module.exports = router;