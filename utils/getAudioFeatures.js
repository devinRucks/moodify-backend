/**
 * Gets the audio features for all of the track ids
 * @param {Object} spotifyApi SpotifyWebApi object that was includes the clientId, clientSecret, and redirectUri
 * @param {Array} ids Track ids
 * @return {Array} An array of objects consisting of the audio features and the song id for each track. 
 */
const getAudioFeatures = async (spotifyApi, trackIds) => {
     console.log(trackIds)
     const audioFeatures = await spotifyApi.getAudioFeaturesForTracks(trackIds)

     console.log(audioFeatures)

     const allAudioFeatures = audioFeatures.body.audio_features.map((track) => {
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

     return allAudioFeatures;
};

module.exports = getAudioFeatures;