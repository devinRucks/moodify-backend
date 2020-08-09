/**
 * Gets the ids of the user's top artists
 * @param {Object} spotifyApi SpotifyWebApi object that was includes the clientId, clientSecret, and redirectUri
 * @param {String} time_range Over what time frame the affinities are computed
 * @param {Number} limit The number of entities to return. 
 *        Default: 20. Minimum: 1. Maximum: 50
 * @param {Number} offset The index of the first entity to return
 * @return {Array} The array of artist ids
 */
const getArtistIds = async (spotifyApi, time_range, limit, offset) => {
     const topArtists = await spotifyApi.getMyTopArtists({
          time_range: time_range, limit: limit, offset: offset
     })

     const allArtistIds = topArtists.body.items.map((artistsInfo) => {
          return artistsInfo.id
     })

     return allArtistIds;
};

module.exports = getArtistIds;