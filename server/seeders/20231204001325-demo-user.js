const bcrypt = require('bcrypt');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const pass = await bcrypt.hash('admin', 5);

    await queryInterface.bulkInsert('Directions', [
      {
        name: "GameDev",
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "VebDev",
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    await queryInterface.bulkInsert('Statuses', [
      {
        name: "In Start Lesson",
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Payment Is Expected",
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Submitted",
        id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Teaching",
        id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    await queryInterface.bulkInsert('RateTypes', [
      {
        name: "inHour",
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "inMonth",
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "inCount",
        id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    await queryInterface.bulkInsert('Rights', [
      {
        name: "client-section",
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "workers-section",
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "leads-section",
        id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "all",
        id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "create-worker",
        id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "create-client",
        id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "update-worker",
        id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "update-client",
        id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "create-note",
        id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "delete-worker",
        id: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    await queryInterface.bulkInsert('Roles', [
      {
        name: "ADMIN",
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "teacher",
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "manager",
        id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    await queryInterface.bulkInsert('RolesAndRights', [
      {
        id: 1,
        RoleId:1,
        RightId:4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    await queryInterface.bulkInsert('Workers', [
      {
        id: 1,
        fname: 'admin',
        lname: 'admin',
        login :  'admin',
        pass: pass,
        phone: "1111",
        email : "admin@email.ru",
        birthday : new  Date(),
        RoleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    await queryInterface.bulkInsert('WorkersRate', [
      {
        id: 1,
        WorkerId: 1,
        RateTypeId: 1,
        rate: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Directions', null, {});
    await queryInterface.bulkDelete('Statuses', null, {});
    await queryInterface.bulkDelete('RateTypes', null, {});
    await queryInterface.bulkDelete('Rights', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
    await queryInterface.bulkDelete('RolesAndRights', null, {});
    await queryInterface.bulkDelete('Workers', null, {});
    await queryInterface.bulkDelete('WorkersRates', null, {});
  }
};
