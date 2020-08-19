/**
 * Gets the audio features for all of the track ids
 * @param {Object} spotifyApi SpotifyWebApi object that was includes the clientId, clientSecret, and redirectUri
 * @param {Array} allTrackIds Track ids
 * @return {Array} An array of objects consisting of the audio features and the song id for each track. 
 */
const getAudioFeatures = async (spotifyApi, allTrackIds) => {

     let allAudioFeatures = [];
     let filteredAudioFeatures = [];

     try {
          // Maximum of 100 ids
          // Remember that allTrackIds is a 2D array
          await Promise.all(allTrackIds.map(async trackIdArray => {
               const response = await spotifyApi.getAudioFeaturesForTracks(trackIdArray)
               allAudioFeatures.push(response)
          }));

          allAudioFeatures.forEach((response) => {
               response.body.audio_features.forEach((track) => {
                    filteredAudioFeatures.push({
                         danceability: track.danceability,
                         energy: track.energy,
                         key: track.key,
                         loudness: track.loudness,
                         mode: track.mode,
                         speechiness: track.speechiness,
                         acousticness: track.acousticness,
                         liveness: track.liveness,
                         valence: track.valence,
                         tempo: track.tempo,
                         id: track.id
                    })
               })
          })

          return filteredAudioFeatures

     } catch (err) {
          console.log(`Error from getAudioFeatures: ${err}`)
     }
};


module.exports = getAudioFeatures;