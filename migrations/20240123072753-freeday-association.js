'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Freedays', {
      fields: ['id_event'],
      type: 'foreign key',
      name: 'freeday_event_fk',
      references: {
        table: 'Events',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Freedays','freeday_event_fk')
  }
};
