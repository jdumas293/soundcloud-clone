'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Playlists';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        name: 'Playlist 1',
        description: 'Test playlist 1'
      },
      {
        userId: 2,
        name: 'Playlist 2',
        description: 'Test playlist 2'
      },
      {
        userId: 3,
        name: 'Playlist 3',
        description: 'Test playlist 3'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Playlists';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Playlist 1', 'Playlist 2', 'Playlist 3'] }
    }, {});
  }
};
