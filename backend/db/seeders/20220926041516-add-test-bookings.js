'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Bookings"
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        startDate: '2022-11-02',
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
      {
        spotId: 8,
        userId: 1,
        startDate: '2020-01-01',
        endDate: '2020-01-04'
      },
      {
        spotId: 6,
        userId: 1,
        startDate: '2020-03-10',
        endDate: '2020-03-14'
      },
      // {
      //   spotID: 7,
      //   userId: 2,
      //   startDate: "2023-05-16",
      //   endDate: "2023-05-20"
      // }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings"
    await queryInterface.bulkDelete(options);
  }
};
