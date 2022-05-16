'use strict';
const bcrypt = require('bcryptjs');

const makePasswordSuper = (pws) => {
  return new Promise(async rs => {
    let salt, hash;
    salt = await bcrypt.genSalt(10);
    hash = await bcrypt.hash(pws, salt);
    return rs(hash);
  })
}
const makePasswordAdmin = (pw) => {
  return new Promise(async rs => {
    let salt, hash;
    salt = await bcrypt.genSalt(10);
    hash = await bcrypt.hash(pw, salt);
    return rs(hash);
  })
}

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
     let passwordsuper = await makePasswordSuper("superbinarcar");
     let passwordadmin = await makePasswordAdmin("binarcar");
     
     return queryInterface.bulkInsert('Users', [{
      username: 'asep',
      email: 'asep@sepmail.com',
      password : passwordsuper,
      level: 'super_admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'farhan',
      email: 'farhan@sepmail.com',
      password: passwordadmin,
      level: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Users', null, {});
  }
};
