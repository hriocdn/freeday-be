'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Freedays', {
      fields: ['id_consume'],
      type: 'foreign key',
      name: 'freeday_consume_fk',
      references: {
        table: 'Consumes',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Freedays','freeday_consume_fk')
  }
};
