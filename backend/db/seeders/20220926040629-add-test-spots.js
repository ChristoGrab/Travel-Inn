'use strict';
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots"
    await queryInterface.bulkInsert(options,
      [
        {
          ownerId: 1,
          address: "109 Cynthia Dr",
          city: "Chapel Hill",
          state: "NC",
          country: "USA",
          lat: 109.2842353,
          lng: 92.2846592,
          name: "Cute 4 Bedroom House",
          description: "Come stay in our lovely 3 story house in a quiet neighborhood",
          price: 109
        },
        {
          ownerId: 1,
          address: "5300 S Hyde Park Blvd",
          city: "Chicago",
          state: "IL",
          country: "USA",
          lat: 292.2354852,
          lng: -28.3846119,
          name: "Waterfront Studio",
          description: "Great value, spacious, right by the lake",
          price: 249
        },
        {
          ownerId: 2,
          address: "27, Calle Nte 3",
          city: "Mahahual",
          state: "Yucatan",
          country: "Mexico",
          lat: -23.1112695,
          lng: 75.1537832,
          name: "Beachside Bungalow",
          description: "Relax by the idyllic waters of the Carribean",
          price: 46
        },
      ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots"
    await queryInterface.bulkDelete(options);
  }
};
