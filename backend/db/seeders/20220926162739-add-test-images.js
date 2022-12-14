'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "SpotImages"
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-39084966/original/e2e38afa-e0eb-43bd-8621-592bea7595b0.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-39084966/original/87fc9417-1158-43cb-bb02-2b6f04d3c487.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52854046/original/30c02e83-4e1f-4e91-8cfa-f988eb9ec1d0.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52854046/original/6dd8550f-907a-4c68-9876-a7051116d27c.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/8829b15a-2169-4c81-b35c-8f4125d0d18f.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/da9516c7-04a3-4787-a82e-b58c3ac5e865.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-21409981/original/a8fa243d-dac8-4238-93e5-f7aa33072ff8.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/e25a9b25-fa98-4160-bfd1-039287bf38b6.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-44274750/original/55ea1f7b-911e-46d9-b35c-aa288d8127dc.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/74252939/6e004cce_original.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-668384323024686209/original/018ba0c5-bb57-47da-a512-f3bec3ccb282.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/789ae04e-cd43-4719-8795-25a123fc31ec.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52786234/original/2edb01e2-c2c6-469e-a13d-6d7291e10b26.png?im_w=720',
      preview: true
    },
    {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-43752674/original/1291c1eb-4bc2-4771-8682-c8e4a8c40e00.jpeg?im_w=720',
      preview: true
    },
   ])
   
  //  await queryInterface.bulkInsert('ReviewImages', [
  //   {
  //     reviewId: 1,
  //     url: 'image6.url'
  //   },
  //   {
  //     reviewId: 1,
  //     url: 'image6.url'
  //   },
  //   {
  //     reviewId: 2,
  //     url: 'image6.url'
  //   },
  //   {
  //     reviewId: 2,
  //     url: 'image6.url'
  //   },
  //   {
  //     reviewId: 3,
  //     url: 'image6.url'
  //   },
  //   {
  //     reviewId: 4,
  //     url: 'image7.url'
  //   }
  //  ])
  },

  async down (queryInterface, Sequelize) {
    
    options.tableName = "SpotImages"
    
    await queryInterface.bulkDelete(options);
    // await queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
