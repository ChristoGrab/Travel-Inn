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
   await queryInterface.bulkInsert('Bookings', [
    {
      spotId: 1,
      userId: 3,
      startDate: '2022-11-05',
      endDate: '2022-11-08'
    },
    {
      spotId: 2,
      userId: 2,
      startDate: '2022-08-12',
      endDate: '2022-08-21'
    },
    {
      spotId: 3,
      userId: 1,
      startDate: '2021-01-01',
      endDate: '2021-02-01'
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
