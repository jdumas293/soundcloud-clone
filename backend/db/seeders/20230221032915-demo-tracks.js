'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Tracks';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        title: 'Around Me',
        file: '79326fc0-b197-11ed-a3dd-6ff71a7ec8d4.wav',
        genre: 'Rap',
        description: 'Around Me - Metro Boomin ft. Don Toliver'
      },
      {
        userId: 2,
        title: 'Drugs You Should Try It',
        file: '9373d260-b198-11ed-b97d-7bb0de193c37.wav',
        genre: 'Rap',
        description: 'Drugs You Should Try It - Travis Scott'
      },
      {
        userId: 3,
        title: 'Codeine Crazy',
        file: 'd25dc760-b198-11ed-803a-33e6c07c8035.wav',
        genre: 'Rap',
        description: 'Codeine Crazy - Future'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Tracks';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: ['Around Me', 'Drugs You Should Try It', 'Codeine Crazy']}
    }, {});
  }
};
