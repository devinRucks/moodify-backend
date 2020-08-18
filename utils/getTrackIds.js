/**
 * Gets the ids of the artist's top tracks
 * @param {Object} spotifyApi SpotifyWebApi object that was includes the clientId, clientSecret, and redirectUri
 * @param {Array} artistIds The ids of the user's top artists
 * @param {String} country An ISO 3166-1 alpha-2 country code 
 * @return {Array} The array of track ids
 */
const getTrackIds = async (spotifyApi, artistIds, country) => {

     // This contains just an array of track ids
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

     // Since some of the future api calls will have a max of 50, the 1D array will need to be converted into
     // a 2D array with the width of 50.
     allTopTracks.convertTo2D(50)

     console.log(allTopTracks)
     return allTopTracks;

};

Array.prototype.convertTo2D = function (cols) {
     var copy = this.slice(0); // Copy all elements.
     this.length = 0; // Clear out existing array.

     let rows = (copy.length / 50);
     if (rows < 1) rows = 1;

     for (let r = 0; r < rows; r++) {
          let row = [];
          for (let c = 0; c < cols; c++) {
               let i = r * cols + c;
               if (i < copy.length) {
                    row.push(copy[i]);
               }
          }
          this.push(row);
     }
};



const asyncForEach = async (array, callback) => {
     for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
     }
}

module.exports = getTrackIds;