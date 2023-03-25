'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'PlaylistTracks';
    return queryInterface.bulkInsert(options, [
      {
        playlistId: 1,
        trackId: 3
      },
      {
        playlistId: 1,
        trackId: 2
      },
      {
        playlistId: 1,
        trackId: 1
      },
      {
        playlistId: 2,
        trackId: 3
      },
      {
        playlistId: 2,
        trackId: 4
      },
      {
        playlistId: 3,
        trackId: 4
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'PlaylistTracks';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      playlistId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
