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
      url: 'https://i.picsum.photos/id/1040/4496/3000.jpg?hmac=kvZONlBpTcZ16PuE_g2RWxlicQ5JKVq2lqqZndfafBY',
      preview: true
    },
    {
      spotId: 1,
      url: 'image2.url',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://i.picsum.photos/id/164/1200/800.jpg?hmac=wkqGUkaeW3kiAsHq_VwxSWWossIMAwFV4eUfFzuDkew',
      preview: true
    },
    {
      spotId: 2,
      url: 'image4.url',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://i.picsum.photos/id/215/3264/2448.jpg?hmac=u-g_DAEnfO1tx6Y9o80X1qzqC7rpmPHJ94JhqVa8SCI',
      preview: true
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
