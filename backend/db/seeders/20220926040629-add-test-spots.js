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
   await queryInterface.bulkInsert('Spots', 
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

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots', {
    address: { [Op.in]: ['109 Cynthia Dr', '5300 S Hyde Park Blvd', '27, Calle Nte 3'] }
  }, {});
  }
};
