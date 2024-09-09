'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const users = [];

    for (let i = 0; i < 1_000_000; i++) {
      users.push({
        firstname: `FirstName${i}`,
        lastname: `LastName${i}`,
        age: Math.floor(Math.random() * 100),
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        has_problem: Math.random() > 0.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Users', users);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.bulkDelete('Users', {});
  },
};
