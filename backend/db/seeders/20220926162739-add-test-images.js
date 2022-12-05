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
    }    
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
