/**
 * Gets the audio features for all of the track ids
 * @param {Object} spotifyApi SpotifyWebApi object that was includes the clientId, clientSecret, and redirectUri
 * @param {Array} allTrackIds Track ids
 * @return {Array} An array of objects consisting of the audio features and the song id for each track. 
 */
const getAudioFeatures = async (spotifyApi, allTrackIds) => {

     try {
          // Maximum of 100 ids
          const allAudioFeatures = await spotifyApi.getAudioFeaturesForTracks(allTrackIds)

          const filteredAudioFeatures = allAudioFeatures.body.audio_features.map((track) => {
               const trackAudioFeatures = {
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
               }
               return trackAudioFeatures
          })

          return filteredAudioFeatures;
     } catch (err) {
          console.log(`Error from getAudioFeatures: ${err}`)
     }
};

// /**
//  * If the id's match, add the track name from arr2 to arr1.
//  */
// const mergeArrayObjects = (arr1, arr2) => {
//      arr1.forEach((track, i) => {
//           if (track.id === arr2[i].id) {
//                track.track = arr2[i].track
//           }
//      })
// }

module.exports = getAudioFeatures;