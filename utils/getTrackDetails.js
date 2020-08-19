/**
 * Adds track details to the allAudioFeatures array
 * @param {Object} spotifyApi SpotifyWebApi object that was includes the clientId, clientSecret, and redirectUri
 * @param {Array} allAudioFeatures An array of objects consisting of the audio features and the song id for each track.
 * @param {Array} allTrackIds Track ids
 * @return {Array} An array of objects consisting of the audio features, song name, album name, album-cover, and artist name.
 */
const getTrackDetails = async (spotifyApi, allAudioFeatures, allTrackIds) => {

     let allInfo = [];
     let filteredTrackInfo = [];

     try {
          // Maximum of 50 ids
          // for (let i = 0; i < allTrackIds.length; i++) {
          //      allInfo.push(await spotifyApi.getTracks(allTrackIds[i]))
          // }

          await Promise.all(allTrackIds.map(async trackIdArray => {
               const response = await spotifyApi.getTracks(trackIdArray)
               allInfo.push(response)
          }));

          allInfo.forEach((response) => {
               response.body.tracks.forEach((track) => {
                    filteredTrackInfo.push({
                         track: track.name,
                         artist: track.album.artists[0].name,
                         album_cover: track.album.images[2].url,
                         id: track.id
                    })
               })
          })

          console.log(allAudioFeatures)
          console.log(filteredTrackInfo)

          mergeArrayObjects(allAudioFeatures, filteredTrackInfo)

          return allAudioFeatures;
     } catch (err) {
          console.log(`Error from getTrackDetails: ${err}`)
     }
};


/**
 * If the id's match, add the track name from arr2 to arr1.
 * This is a slow way to do it. Might want to implement an algorithm
 */
const mergeArrayObjects = (arr1, arr2) => {

     arr1.forEach((track) => {
          arr2.forEach((arr2Track, i) => {
               if (track.id === arr2Track.id) {
                    track.artist = arr2Track.artist;
                    track.album_cover = arr2Track.album_cover;
                    track.track = arr2Track.track
               }
          })
     })
}

module.exports = getTrackDetails;