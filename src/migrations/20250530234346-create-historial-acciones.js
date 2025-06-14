'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HistorialAcciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuarioId: {
        type: Sequelize.INTEGER,
            references: {
                          model: 'Usuarios',
                          key: 'id'
                        },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
      },
      AccionBeneficaId: {
        type: Sequelize.INTEGER,
        references: {
                      model: 'AccionBeneficas',
                      key: 'id'
                    },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
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
    await queryInterface.dropTable('HistorialAcciones');
  }
};