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
          ownerId: 7,
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
          ownerId: 8,
          address: "5100 S Hyde Park Blvd",
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
        {
          ownerId: 2,
          address: "42 West St",
          city: "Knoxville",
          state: "Tennessee",
          country: "USA",
          lat: -22.1112695,
          lng: 73.1537832,
          name: "Hillside bunker",
          description: "This is somewhat like the house in Ex Machina.  Great film",
          price: 385
        },
        {
          ownerId: 3,
          address: "24 East Ln",
          city: "Rhinebeck",
          state: "New York",
          country: "USA",
          lat: 23.1112695,
          lng: -75.1537832,
          name: "Artsy Wooded House",
          description: "It's the sort of house that horror movies like to put their protagonists in.",
          price: 475
        },
        {
          ownerId: 3,
          address: "1 Tree Road",
          city: "Abiansemal",
          state: "Bali",
          country: "Indonesia",
          lat: -21.1112695,
          lng: 75.1537832,
          name: "Ewok Hut",
          description: "For real though, this looks like it belongs on Endor. We look forward to welcoming you, as do the Ewoks.",
          price: 360
        },
        {
          ownerId: 4,
          address: "4 Snow Ln",
          city: "Huntsville",
          state: "Ontario",
          country: "Canada",
          lat: -23.2112695,
          lng: 75.1534832,
          name: "Hidden Valley Ski Resort",
          description: "Only way in and out is by skiing.  Bring plenty of vodka.",
          price: 276
        },
        {
          ownerId: 4,
          address: "9 Castle Blvd",
          city: "Seixas",
          state: "Caminha",
          country: "Portugal",
          lat: -12.1112695,
          lng: 35.1537832,
          name: "Chateau de Chasselas",
          description: "From the tower, you can use our handmade ballista to besiege your neighbors and rain hellfire down upon the heathens.",
          price: 1058
        },
        {
          ownerId: 5,
          address: "52 Evanston St",
          city: "Evanston",
          state: "Illinois",
          country: "USA",
          lat: -3.1112695,
          lng: 5.1537832,
          name: "Comfortable Home",
          description: "It's Evanston.  Not sure why anyone would come here, but we'll take all the business we can get!",
          price: 47
        },
        {
          ownerId: 5,
          address: "2, Calle Nte 1",
          city: "Cabrera",
          state: "Dominica",
          country: "Dominican Republic",
          lat: 23.2112695,
          lng: 75.1537832,
          name: "Resort Complex",
          description: "Let's be real, no one can afford this.",
          price: 2600
        },
        {
          ownerId: 6,
          address: "52 Dixie Ln",
          city: "Smithfield",
          state: "Virginia",
          country: "USA",
          lat: -23.1112695,
          lng: 75.1537832,
          name: "Sleepy Dockside House",
          description: "Come spend some time in our quiet little corner of Virginia.  You won't regret dipping your feet in the water, even if it's the frigid Atlantic.",
          price: 390
        },
        {
          ownerId: 6,
          address: "99 Michigan St",
          city: "Trufant",
          state: "Michigan",
          country: "USA",
          lat: -23.1112695,
          lng: 75.1537832,
          name: "Entire Lakefront Cabin",
          description: "Sitting on 63 acres with lake access and groomed snowmobiling trails, this Trufant vacation rental is an all-season paradise! The main cabin and guest house offer a total of 5 bedrooms, 4 baths, a sleeping loft, and 2 fully equipped kitchens.",
          price: 692
        },
      ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots"
    await queryInterface.bulkDelete(options);
  }
};
