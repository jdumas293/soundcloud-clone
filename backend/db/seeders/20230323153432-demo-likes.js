'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Likes";
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        trackId: 2
      },
      {
        userId: 2,
        trackId: 1
      },
      {
        userId: 3,
        trackId: 1
      },
      {
        userId: 3,
        trackId: 2
      },
      {
        userId: 2,
        trackId: 3
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Likes";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
