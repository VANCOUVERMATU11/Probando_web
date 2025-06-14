'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PedidoProductos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pedidoId: {
        type: Sequelize.INTEGER,
            references: {
                          model: 'Pedidos',
                          key: 'id'
                        },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
      },
      productoId: {
        type: Sequelize.INTEGER,
            references: {
                          model: 'Productos',
                          key: 'id'
                        },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
      },
      cantidad: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PedidoProductos');
  }
};