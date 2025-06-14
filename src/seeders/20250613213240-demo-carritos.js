'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
    carrito tiene:
    usuarioId: DataTypes.INTEGER,
    estado: DataTypes.STRING
    */
    await queryInterface.bulkInsert('Carritos', [{
      usuarioId: 1,
      estado: 'activo',
    }, {
      usuarioId: 2,
      estado: 'activo',
    }, {
      usuarioId: 3,
      estado: 'inactivo',
    }], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
