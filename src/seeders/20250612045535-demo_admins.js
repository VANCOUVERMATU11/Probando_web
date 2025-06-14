'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Administradors', [{
      nombre_usuario: "admin_palta",
      contrasena: "admin_palta123"
    }, {
      nombre_usuario: "admin_opazo",
      contrasena: "admin_opazo123"
    },{
      nombre_usuario: "admin_tito",
      contrasena: "admin_tito123"
    },{
      nombre_usuario: "admin_tomas",
      contrasena: "admin_tomas123"
    }], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
