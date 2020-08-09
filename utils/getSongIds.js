/**
 * Gets the ids of the artist's top songs
 * @param {Object} spotifyApi SpotifyWebApi object that was includes the clientId, clientSecret, and redirectUri
 * @param {Array} ids The ids of the user's top artists
 * @param {String} country An ISO 3166-1 alpha-2 country code 
 * @return {Array} The array of song ids
 */
const getSongIds = async (spotifyApi, ids, country) => {
     let allSongIds = [];

     // ids.forEach(async (id) => {
     //      const artistsTopSongsResponse = await spotifyApi.getArtistTopTracks(id, country)
     //      artistsTopSongsResponse.body.tracks.forEach((track) => {
     //           allSongIds.push(track.name)
     //      })
     // })

     await asyncForEach(ids, async (id) => {
          const artistsTopSongsResponse = await spotifyApi.getArtistTopTracks(id, country)
          artistsTopSongsResponse.body.tracks.forEach((track) => {
               allSongIds.push(track.name)
          })
     })

     return allSongIds;

};

const asyncForEach = async (array, callback) => {
     for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
     }
}

module.exports = getSongIds;