/**
 * Gets the ids of the artist's top tracks
 * @param {Object} spotifyApi SpotifyWebApi object that was includes the clientId, clientSecret, and redirectUri
 * @param {Array} artistIds The ids of the user's top artists
 * @param {String} country An ISO 3166-1 alpha-2 country code 
 * @return {Array} The array of track ids
 */
const getTrackIds = async (spotifyApi, artistIds, country) => {
     let allTopTracks = [];

     await asyncForEach(artistIds, async (id) => {
          try {

               const artistTopTracks = await spotifyApi.getArtistTopTracks(id, country)
               artistTopTracks.body.tracks.forEach((track) => {
                    allTopTracks.push(track.id)
               })
          } catch (err) {
               console.log(`Error from getTrackIds: ${err}`)
          }
     })

     return allTopTracks;

};

const asyncForEach = async (array, callback) => {
     for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
     }
}

module.exports = getTrackIds;