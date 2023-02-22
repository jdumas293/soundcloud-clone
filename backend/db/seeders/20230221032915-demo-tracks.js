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
        file: 'https://soundcloud-clone-bucket.s3.us-east-2.amazonaws.com/Around+Me.mp3',
        genre: 'Rap',
        description: 'Around Me - Metro Boomin ft. Don Toliver',
        imageUrl: 'https://i1.sndcdn.com/artworks-9mmyAe29zCMZ-0-t500x500.jpg'
      },
      {
        userId: 2,
        title: 'Drugs You Should Try It',
        file: 'https://soundcloud-clone-bucket.s3.us-east-2.amazonaws.com/04+Drugs+You+Should+Try+It.mp3',
        genre: 'Rap',
        description: 'Drugs You Should Try It - Travis Scott',
        imageUrl: 'https://i1.sndcdn.com/artworks-000088468281-q999dc-t500x500.jpg'
      },
      {
        userId: 3,
        title: 'Codeine Crazy',
        file: 'https://soundcloud-clone-bucket.s3.us-east-2.amazonaws.com/Future+-+Codeine+Crazy+(Audio).mp3',
        genre: 'Rap',
        description: 'Codeine Crazy - Future',
        imageUrl: 'https://i1.sndcdn.com/artworks-000250149364-jppbe9-t500x500.jpg'
      },
      {
        userId: 1,
        title: 'Sanguine Paradise',
        file: 'https://soundcloud-clone-bucket.s3.us-east-2.amazonaws.com/bf319920-b2ef-11ed-ac58-a1d2e790c701.wav',
        genre: 'Rap',
        description: 'Sanguine Paradise - LUV',
        imageUrl: 'https://i1.sndcdn.com/artworks-jKhZxZp2WEMwtM6k-ciuTdQ-t500x500.jpg'
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
