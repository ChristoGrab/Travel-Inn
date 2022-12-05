'use strict';
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = "Users";
    
   await queryInterface.bulkInsert(options, [
    {
      email: 'user1@mail.io',
      username: 'Merquise',
      firstName: "Christo",
      lastName: "Grabowski",
      hashedPassword: bcrypt.hashSync('password1')
    },
    {
    email: 'user2@mail.io',
    username: 'Chucklitos',
    firstName: "Charles",
    lastName: "Giardina",
    hashedPassword: bcrypt.hashSync('password2')
    },
    {
    email: 'user3@mail.io',
    username: 'diddlyskwat',
    firstName: "Noah",
    lastName: "Berman",
    hashedPassword: bcrypt.hashSync('password3')
    },
    {
    email: 'user4@mail.io',
    username: 'brgrs4lyf',
    firstName: "Bob",
    lastName: "Belcher",
    hashedPassword: bcrypt.hashSync('password4')
    },
    {
    email: 'user5@mail.io',
    username: 'PanzerMeister',
    firstName: "Eric",
    lastName: "von Manstein",
    hashedPassword: bcrypt.hashSync('password5')
    }
  ], {});
},

  async down (queryInterface, Sequelize) {

    options.tableName = "Users"
    await queryInterface.bulkDelete(options);
  }
};
