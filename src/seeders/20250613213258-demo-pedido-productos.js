'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * pedidoproducto tiene:
    pedidoId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER

    osea pedido 1 tiene producto 1 y 2, pedido 2 tiene producto 3, pedido 3 tiene producto 1 y 3
    */
    await queryInterface.bulkInsert('PedidoProductos', [{
      pedidoId: 1,
      productoId: 1,
      cantidad: 1
    }, {
      pedidoId: 1,
      productoId: 2,
      cantidad: 1
    }, {
      pedidoId: 2,
      productoId: 3,
      cantidad: 1
    }, {
      pedidoId: 3,
      productoId: 1,
      cantidad: 1
    }, {
      pedidoId: 3,
      productoId: 3,
      cantidad: 1
    }], {});

  },

  async down (queryInterface, Sequelize) {

  }
};
