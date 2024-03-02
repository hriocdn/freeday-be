'use strict';
const {Op} = require('sequelize');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('FDC_Users', [{
      username: 'admin',
      password: await bcrypt.hash('123', 8),
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('FDC_Users', {username: {[Op.in]: ['admin']}}, {});
  }
};
