'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Freedays', 'status', { type: Sequelize.BOOLEAN })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Freedays', 'status')
  }
};
