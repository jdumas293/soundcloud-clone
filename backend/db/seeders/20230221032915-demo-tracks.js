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
        artist: 'Metro Boomin',
        file: 'https://soundcloud-clone-bucket.s3.us-east-2.amazonaws.com/Around+Me.mp3',
        genre: 'Rap',
        description: 'Around Me - Metro Boomin ft. Don Toliver',
        imageUrl: 'https://i1.sndcdn.com/artworks-9mmyAe29zCMZ-0-t500x500.jpg'
      },
      {
        userId: 2,
        title: 'Drugs You Should Try It',
        artist: 'Travis Scott',
        file: 'https://soundcloud-clone-bucket.s3.us-east-2.amazonaws.com/04+Drugs+You+Should+Try+It.mp3',
        genre: 'Rap',
        description: 'Drugs You Should Try It - Travis Scott',
        imageUrl: 'https://i1.sndcdn.com/artworks-000088468281-q999dc-t500x500.jpg'
      },
      {
        userId: 3,
        title: 'Codeine Crazy',
        artist: 'Future',
        file: 'https://soundcloud-clone-bucket.s3.us-east-2.amazonaws.com/Future+-+Codeine+Crazy+(Audio).mp3',
        genre: 'Rap',
        description: 'Codeine Crazy - Future',
        imageUrl: 'https://i1.sndcdn.com/artworks-000250149364-jppbe9-t500x500.jpg'
      },
      {
        userId: 1,
        title: 'Sanguine Paradise',
        artist: 'Lil Uzi',
        file: 'https://soundcloud-clone-bucket.s3.us-east-2.amazonaws.com/bf319920-b2ef-11ed-ac58-a1d2e790c701.wav',
        genre: 'Rap',
        description: 'Sanguine Paradise - LUV',
        imageUrl: 'https://i1.sndcdn.com/artworks-jKhZxZp2WEMwtM6k-ciuTdQ-t500x500.jpg'
      },
      {
        userId: 1,
        title: 'Highest in the Room',
        artist: 'Travis Scott',
        file: 'https://soundtracks-bucket.s3.us-east-2.amazonaws.com/1677105864040.mp3',
        genre: 'Rap',
        description: 'Highest in the Room - Travis Scott',
        imageUrl: 'https://i1.sndcdn.com/artworks-000611052880-8l787a-t500x500.jpg'
      },
      {
        userId: 1,
        title: 'Guilty Conscience',
        artist: 'Wiz Khalifa',
        file: 'https://soundtracks-bucket.s3.us-east-2.amazonaws.com/1680617661440.mp3',
        genre: 'Rap',
        description: 'Guilty Conscience - Wiz Khalifa',
        imageUrl: 'https://i1.sndcdn.com/artworks-4j6wtA7PPN8d-0-t500x500.jpg'
      },
      {
        userId: 1,
        title: 'Poochie Gown',
        artist: 'Gunna',
        file: 'https://soundtracks-bucket.s3.us-east-2.amazonaws.com/1677105561173.mp3',
        genre: 'Rap',
        description: 'Poochie Gown - Gunna',
        imageUrl: 'https://i1.sndcdn.com/artworks-61YNaGbBWUU64lTr-ZRgQkg-t500x500.jpg'
      },
      {
        userId: 1,
        title: 'In Vein',
        artist: 'Rick Ross',
        file: 'https://soundtracks-bucket.s3.us-east-2.amazonaws.com/Rick+Ross+-+In+Vein+(feat.+The+Weeknd)+(1).mp3',
        genre: 'Rap/R&B',
        description: 'In Vein - Rick Ross ft. The Weeknd',
        imageUrl: 'https://i1.sndcdn.com/artworks-000081140615-il9mnl-t500x500.jpg'
      },
      {
        userId: 1,
        title: 'Pink & White',
        artist: 'Frank Ocean',
        file: 'https://soundtracks-bucket.s3.us-east-2.amazonaws.com/1680968918315.mp3',
        genre: 'R&B',
        description: 'Pink & White - Frank Ocean',
        imageUrl: 'https://i1.sndcdn.com/artworks-000287362979-dosv90-t500x500.jpg'
      },
      {
        userId: 1,
        title: 'Selfless',
        artist: 'xxxtentacion',
        file: 'https://soundtracks-bucket.s3.us-east-2.amazonaws.com/xxxtentacion+-++Selfless+(2016)+AI.mp3',
        genre: 'R&B',
        description: 'Selfless - xxxtentacion',
        imageUrl: 'https://i1.sndcdn.com/artworks-kRwdn05zXxAX2cUz-v6wcTg-t500x500.jpg'
      },
      {
        userId: 1,
        title: 'Star Shopping',
        artist: 'Lil Peep',
        file: 'https://soundtracks-bucket.s3.us-east-2.amazonaws.com/lil+peep+-+star+shopping+(prod.+kryptik).mp3',
        genre: 'Rap',
        description: 'Star Shopping - Lil Peep',
        imageUrl: 'https://i1.sndcdn.com/artworks-000306655380-kthex1-t500x500.jpg'
      },
      {
        userId: 1,
        title: 'Dreamin',
        artist: 'PartyNextDoor',
        file: 'https://soundtracks-bucket.s3.us-east-2.amazonaws.com/PARTYNEXTDOOR+-+Dreamin+%5BHQ++Lyrics%5D.mp3',
        genre: 'R&B',
        description: 'Dreamin - PND',
        imageUrl: 'https://i1.sndcdn.com/artworks-000166944382-11ii78-t500x500.jpg'
      },
      {
        userId: 1,
        title: 'This Cant Be Happening',
        artist: 'PartyNextDoor',
        file: 'https://soundtracks-bucket.s3.us-east-2.amazonaws.com/Juice+Wrld+-+This+Cant+Be+Happening+(unofficial+audio).mp3',
        genre: 'R&B',
        description: 'Dreamin - PND',
        imageUrl: 'https://i1.sndcdn.com/artworks-000232697141-3zgfv7-t500x500.jpg'
      },
      {
        userId: 1,
        title: 'Autograph',
        artist: 'Juice WRLD',
        file: 'https://soundtracks-bucket.s3.us-east-2.amazonaws.com/Juice+WRLD+_Autograph+(On+My+Line)_+(Official+Audio).mp3',
        genre: 'Rap',
        description: 'Autograph - Juice WRLD',
        imageUrl: 'https://i1.sndcdn.com/artworks-000355912506-47kka2-t500x500.jpg'
      },
      {
        userId: 1,
        title: 'Candles',
        artist: 'Juice WRLD',
        file: 'https://soundtracks-bucket.s3.us-east-2.amazonaws.com/Juice+WRLD+-+Candles+(Official+Audio).mp3',
        genre: 'Rap',
        description: 'Candles - Juice WRLD',
        imageUrl: 'https://i1.sndcdn.com/artworks-FTWOncYR7bfm-0-t500x500.jpg'
      },
      {
        userId: 1,
        title: 'Fo Real',
        artist: 'Future',
        file: 'https://soundtracks-bucket.s3.us-east-2.amazonaws.com/Fo+Real+(Ft.+Drake).mp3',
        genre: 'Rap',
        description: 'Fo Real - Future ft. Drake',
        imageUrl: 'https://i1.sndcdn.com/artworks-000038098910-9jm0hs-t500x500.jpg'
      },
      {
        userId: 1,
        title: 'Wanna Know',
        artist: 'Dave',
        file: 'https://soundtracks-bucket.s3.us-east-2.amazonaws.com/Dave+-+Wanna+Know+ft.+Drake+(Audio).mp3',
        genre: 'Rap',
        description: 'Wanna Know - Dave ft. Drake',
        imageUrl: 'https://i1.sndcdn.com/artworks-QwfjnNHpIiLm-0-t500x500.jpg'
      },
      {
        userId: 1,
        title: 'Let Me Explain',
        artist: 'Bryson Tiller',
        file: 'https://soundtracks-bucket.s3.us-east-2.amazonaws.com/Bryson+Tiller+-+Let+Me+Explain+(Audio).mp3',
        genre: 'Rap',
        description: 'Let Me Explain - Bryson Tiller',
        imageUrl: 'https://i1.sndcdn.com/artworks-nIprVDv6FmU5-0-t500x500.jpg'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Tracks';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: ['Around Me', 'Drugs You Should Try It', 'Codeine Crazy', 'Highest in the Room', 'Guilty Conscience', 'Poochie Gown', 'In Vein', 'Pink & White']}
    }, {});
  }
};
