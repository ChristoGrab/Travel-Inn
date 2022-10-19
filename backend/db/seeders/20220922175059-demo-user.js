'use strict';
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

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
   await queryInterface.bulkInsert('Users', [
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
