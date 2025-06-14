'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * carritoproducto tiene:
    carritoId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER
    */
    await queryInterface.bulkInsert('CarritoProductos', [{
      carritoId: 1,
      productoId: 1,
      cantidad: 2
    }, {
      carritoId: 1,
      productoId: 2,
      cantidad: 1
    }, {
      carritoId: 2,
      productoId: 3,
      cantidad: 1
    }, {
      carritoId: 3,
      productoId: 1,
      cantidad: 1
    }, {
      carritoId: 3,
      productoId: 3,
      cantidad: 2
  }], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
