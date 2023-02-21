'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Comments';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        trackId: 2,
        commentBody: 'Heater'
      },
      {
        userId: 2,
        trackId: 1,
        commentBody: 'TEST COMMENT'
      },
      {
        userId: 3,
        trackId: 2,
        commentBody: 'TEST COMMENT'
      },
      {
        userId: 1,
        trackId: 3,
        commentBody: 'TEST COMMENT'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Comments';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      commentBody: { [Op.in]: ['Heater', 'TEST COMMENT'] }
    }, {});
  }
};
