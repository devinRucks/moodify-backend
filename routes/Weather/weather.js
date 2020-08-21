const express = require('express')
const router = express.Router()
const axios = require('axios')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json();

router.route('/')
     .post(jsonParser, async (req, res) => {
          console.log("IN SERVER");
          const url = `http://api.weatherstack.com/current?access_key=${process.env.ACCESS_KEY}&query=${req.body.lat}, ${req.body.long}`;

          try {
               const response = await axios.get(url);
               const data = await response.data;
               res.json({
                    'city': data.location.name,
                    'state': data.location.region,
                    'temp': data.current.temperature,
                    'feelslike': data.current.feelslike,
                    'description': data.current.weather_descriptions[0],
                    'is_day': data.current.is_day
               })
          } catch (err) {
               console.log(err)
          }
     })


module.exports = router;