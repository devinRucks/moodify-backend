/**
 * Adds track details to the allAudioFeatures array
 * @param {Object} spotifyApi SpotifyWebApi object that was includes the clientId, clientSecret, and redirectUri
 * @param {Array} allAudioFeatures An array of objects consisting of the audio features and the song id for each track.
 * @param {Array} allTrackIds Track ids
 * @return {Array} An array of objects consisting of the audio features, song name, album name, album-cover, and artist name.
 */
const getTrackDetails = async (spotifyApi, allAudioFeatures, allTrackIds) => {

     try {
          console.log(allTrackIds.length)
          // Maximum of 50 ids
          const allInfo = await spotifyApi.getTracks(allTrackIds)

          const filteredTrackInfo = allInfo.body.tracks.map((track, i) => {
               const trackInfo = {
                    track: track.name,
                    artist: track.album.artists[0].name,
                    album_cover: track.album.images[2].url,
                    id: track.id
               }
               return trackInfo
          })

          mergeArrayObjects(allAudioFeatures, filteredTrackInfo)

          return allAudioFeatures;
     } catch (err) {
          console.log(`Error from getTrackDetails: ${err}`)
     }
};


/**
 * If the id's match, add the track name from arr2 to arr1.
 */
const mergeArrayObjects = (arr1, arr2) => {
     arr1.forEach((track, i) => {
          if (track.id === arr2[i].id) {
               track.artist = arr2[i].artist;
               track.album_cover = arr2[i].album_cover;
               track.track = arr2[i].track
          }
     })
}

module.exports = getTrackDetails;