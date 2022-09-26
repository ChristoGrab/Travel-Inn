'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('SpotImages', [
    {
      spotId: 1,
      url: 'image1.url',
      preview: true
    },
    {
      spotId: 1,
      url: 'image2.url',
      preview: false
    },
    {
      spotId: 2,
      url: 'image3.url',
      preview: true
    },
    {
      spotId: 2,
      url: 'image4.url',
      preview: false
    },
    {
      spotId: 3,
      url: 'image5.url',
      preview: false
    }    
   ])
   
   await queryInterface.bulkInsert('ReviewImages', [
    {
      reviewId: 1,
      url: 'image6.url'
    },
    {
      reviewId: 1,
      url: 'image6.url'
    },
    {
      reviewId: 2,
      url: 'image6.url'
    },
    {
      reviewId: 2,
      url: 'image6.url'
    },
    {
      reviewId: 3,
      url: 'image6.url'
    },
    {
      reviewId: 4,
      url: 'image7.url'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SpotImages', null, {});
    await queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
