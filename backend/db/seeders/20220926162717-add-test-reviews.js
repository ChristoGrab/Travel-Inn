'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Reviews"
   await queryInterface.bulkInsert(options, [
    {
      userId: 3,
      spotId: 2,
      review: "Had a great time here, lovely view!",
      stars: 5
    },
    {
      userId: 2,
      spotId: 3,
      review: "Was ok, but the water wasn't working half the time...",
      stars: 3
    },
    {
      userId: 1,
      spotId: 3,
      review: "Loved how cozy this spot was",
      stars: 4
    },
    {
      userId: 3,
      spotId: 1,
      review: "Pretty good time",
      stars: 3
    },
    {
      userId: 5,
      spotId: 1,
      review: "It was out of this world, loved the stay!",
      stars: 5
    },
    {
      userId: 4,
      spotId: 1,
      review: "Great host, not much to do in the area but peaceful stay",
      stars: 4
    },
    {
      userId: 4,
      spotId: 2,
      review: "LOVED IT!!! Everything was perfect",
      stars: 5
    },
    {
      userId: 7,
      spotId: 7,
      review: "Great stay, would recommend to anyone",
      stars: 4
    },
    {
      userId: 6,
      spotId: 7,
      review: "It was ok, but the water wasn't working half the time...",
      stars: 3
    },
    {
      userId: 5,
      spotId: 8,
      review: "It's a life of luxury for me, and the chateau did not disappoint",
      stars: 5
    },
    {
      userId: 4,
      spotId: 9,
      review: "It was so sleepy I went into a coma",
      stars: 2
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Reviews"
     await queryInterface.bulkDelete(options);
  }
};
