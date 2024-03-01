'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Freedays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_event: {
        type: Sequelize.INTEGER
      },
      id_consume: {
        type: Sequelize.INTEGER
      },
      rate1: {
        type: Sequelize.INTEGER
      },
      rate2: {
        type: Sequelize.INTEGER
      },
      rate3: {
        type: Sequelize.INTEGER
      },
      rate4: {
        type: Sequelize.INTEGER
      },
      rate5: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Freedays');
  }
};