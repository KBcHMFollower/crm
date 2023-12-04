const bcrypt = require('bcrypt');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   

    await queryInterface.createTable('RateTypes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, unique: true },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('Roles', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, unique: true },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('Workers', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      fname: { type: Sequelize.STRING },
      lname: { type: Sequelize.STRING },
      login: { type: Sequelize.STRING, unique: true },
      pass: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING, unique: true },
      email: { type: Sequelize.STRING, unique: true },
      birthday: { type: Sequelize.DATE },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      RoleId: { type: Sequelize.INTEGER, references: { model: {tableName: 'Roles', schema:'public'}, key: 'id', allowNull: false } },
    });

    await queryInterface.createTable('Rights', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, unique: true },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('Statuses', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, unique: true },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('Directions', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, unique: true },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('RolesAndRights', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      RoleId: { type: Sequelize.INTEGER, references: { model: {tableName: 'Roles', schema:'public'}, key: 'id', allowNull: false } },
      RightId: { type: Sequelize.INTEGER,references: { model: {tableName: 'Rights', schema:'public'}, key: 'id', allowNull: false } },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('WorkersRates', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      rate: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      WorkerId: { type: Sequelize.INTEGER, references: { model: {tableName: 'Workers', schema:'public'}, key: 'id', allowNull: false } },
      RateTypeId: { type: Sequelize.INTEGER, references: { model: {tableName: 'RateTypes', schema:'public'}, key: 'id', allowNull: false } },
    });

    await queryInterface.createTable('Clients', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      lessons_count: { type: Sequelize.INTEGER },
      fname: { type: Sequelize.STRING },
      lname: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      birthday: { type: Sequelize.DATE },
      StatusId: { type: Sequelize.INTEGER, references: { model: {tableName: 'Statuses', schema:'public'}, key: 'id', allowNull: false } },
      DirectionId: { type: Sequelize.INTEGER, references: { model: {tableName: 'Directions', schema:'public'}, key: 'id', allowNull: false } },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.createTable('Deals', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      deal_summ: { type: Sequelize.INTEGER },
      deal_lessonsbuy: { type: Sequelize.INTEGER },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      ClientId: { type: Sequelize.INTEGER, references: { model: {tableName: 'Clients', schema:'public'}, key: 'id', allowNull: false } },
    });

    await queryInterface.createTable('Notes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      content: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      WorkerId: { type: Sequelize.INTEGER, references: { model: {tableName: 'Workers', schema:'public'}, key: 'id', allowNull: false } },
      ClientId: { type: Sequelize.INTEGER, references: { model: {tableName: 'Clients', schema:'public'}, key: 'id', allowNull: false } },
    });




    const pass = await bcrypt.hash('admin', 5);

    await queryInterface.bulkInsert('Directions', [
      {
        name: "GameDev",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "VebDev",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    await queryInterface.bulkInsert('Statuses', [
      {
        name: "In Start Lesson",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Payment Is Expected",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Submitted",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Teaching",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    await queryInterface.bulkInsert('RateTypes', [
      {
        name: "inHour",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "inMonth",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "inCount",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    await queryInterface.bulkInsert('Rights', [
      {
        name: "client-section",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "workers-section",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "leads-section",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "all",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "create-worker",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "create-client",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "update-worker",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "update-client",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "create-note",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "delete-worker",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    await queryInterface.bulkInsert('Roles', [
      {
        name: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "teacher",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "manager",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    await queryInterface.bulkInsert('RolesAndRights', [
      {
        RoleId:1,
        RightId:4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    await queryInterface.bulkInsert('Workers', [
      {
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
    await queryInterface.bulkInsert('WorkersRates', [
      {
        WorkerId: 1,
        RateTypeId: 1,
        rate: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('WorkersRate');
    await queryInterface.dropTable('Notes');
    await queryInterface.dropTable('Workers');
    await queryInterface.dropTable('Deals');
    await queryInterface.dropTable('Clients');



    await queryInterface.dropTable('RolesAndRights');
    await queryInterface.dropTable('Directions');
    await queryInterface.dropTable('Statuses');
    await queryInterface.dropTable('Rights');
    await queryInterface.dropTable('Roles');
    await queryInterface.dropTable('RateTypes');


    // await queryInterface.bulkDelete('Directions', null, {});
    // await queryInterface.bulkDelete('Statuses', null, {});
    // await queryInterface.bulkDelete('RateTypes', null, {});
    // await queryInterface.bulkDelete('Rights', null, {});
    // await queryInterface.bulkDelete('Roles', null, {});
    // await queryInterface.bulkDelete('RolesAndRights', null, {});
    // await queryInterface.bulkDelete('Workers', null, {});
    // await queryInterface.bulkDelete('WorkersRates', null, {});
  }
};
