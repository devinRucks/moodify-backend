/**
 * Gets the ids of the artist's top tracks
 * @param {Object} spotifyApi SpotifyWebApi object that was includes the clientId, clientSecret, and redirectUri
 * @param {Array} ids The ids of the user's top artists
 * @param {String} country An ISO 3166-1 alpha-2 country code 
 * @return {Array} The array of track ids
 */
const getTrackIds = async (spotifyApi, ids, country) => {
     let allTrackIds = [];

     await asyncForEach(ids, async (id) => {
          const artistsTopTracksResponse = await spotifyApi.getArtistTopTracks(id, country)
          artistsTopTracksResponse.body.tracks.forEach((track) => {
               allTrackIds.push(track.id)
          })
     })

     return allTrackIds;

};

const asyncForEach = async (array, callback) => {
     for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
     }
}

module.exports = getTrackIds;