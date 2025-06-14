'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    await queryInterface.bulkInsert('Usuarios', [{
      nombre: "José Ignacio Duarte",
      correo: "jignacio@uc.cl",
      contrasena: await bcrypt.hash("admin_palta123",salt),
      estadisticas: "",
      nombre_usuario: "admin_palta",
    }, {
      nombre: "Francisco Opazo",
      correo: "opazo@uc.cl",
      contrasena: await bcrypt.hash("admin_opazo123",salt),
      estadisticas: "",
      nombre_usuario: "admin_opazo"
    },{
      nombre: "Alberto Maturana",
      correo: "alberto.maturana@uc.cl",
      contrasena: await bcrypt.hash("admin_tito123",salt),
      estadisticas: "",
      nombre_usuario: "admin_tito"
    },{
      nombre: "Tomás Ketterer",
      correo: "tketterer@uc.cl",
      contrasena: await bcrypt.hash("admin_tomas123",salt),
      estadisticas: "",
      nombre_usuario: "admin_tomas"
    }], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
