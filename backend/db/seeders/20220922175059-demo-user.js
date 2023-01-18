'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    options.tableName = "Users";
    
   return queryInterface.bulkInsert(options, [
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
    },
    {
    email: "user6@mail.io",
    username: "SaHertz",
    firstName: "Sandra",
    lastName: "Hertz",
    hashedPassword: bcrypt.hashSync("password6")
    },
    {
      email: "user7@mail.io",
      username: "Marnie",
      firstName: "Marnie",
      lastName: "Mills",
      hashedPassword: bcrypt.hashSync("password7")
    },
    {
      email: "user8@mail.io",
      username: "BobBill",
      firstName: "Bobby",
      lastName: "Bills",
      hashedPassword: bcrypt.hashSync("password8")
    },
    {
      email: "user9@mail.io",
      username: "FrancisBacon",
      firstName: "Francis",
      lastName: "Bacon",
      hashedPassword: bcrypt.hashSync("password9")
    },    
    {
      email: "user10@mail.io",
      username: "LJ",
      firstName: "Leeroy",
      lastName: "Jenkins",
      hashedPassword: bcrypt.hashSync("password10")
    },
  ], {});
},

  down: async (queryInterface, Sequelize) => {

    options.tableName = "Users"
    
    queryInterface.bulkDelete(options);
  }
};
