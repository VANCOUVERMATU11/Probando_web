'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * historialacciones tiene:
        usuarioId: DataTypes.INTEGER,
        AccionBeneficaId: DataTypes.INTEGER
    */
    await queryInterface.bulkInsert('HistorialAcciones', [{
      usuarioId: 1,
      AccionBeneficaId: 1,
    }, {
      usuarioId: 2,
      AccionBeneficaId: 2,
    }, {
      usuarioId: 3,
      AccionBeneficaId: 3,
    }], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
